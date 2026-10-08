import "server-only";
import { tool } from "ai";
import { z } from "zod";
import { and, desc, eq, gte, like, sql } from "drizzle-orm";
import { db } from "@/db";
import { generateBrief } from "@/modules/ai-brief/actions";
import { getAccount, listQueue, portfolioStats } from "@/modules/queue/queries";
import { cases, customers } from "@/modules/signals/schema";

/** Read-only tools over the portfolio. The model never writes SQL; it only picks parameters. */
export const portfolioTools = {
  searchAccounts: tool({
    description:
      "Search accounts with health score, ARR, renewal date, usage change (fraction, -0.4 = down 40%), escalations and CSAT in the last 90 days. Sorted by score desc, then ARR.",
    inputSchema: z.object({
      segment: z.string().optional(),
      region: z.string().optional(),
      tier: z.string().optional(),
      state: z.enum(["pending", "approved", "dismissed"]).optional(),
      minScore: z.number().optional(),
      minArr: z.number().optional(),
      renewingBefore: z.string().optional().describe("YYYY-MM-DD"),
      maxUsageChange: z.number().optional().describe("e.g. -0.3 = usage fell at least 30%"),
      minEscalated90: z.number().optional(),
      limit: z.number().max(25).default(10),
    }),
    execute: async (i) => {
      const rows = await listQueue({ segment: i.segment, region: i.region, tier: i.tier, state: i.state });
      const hits = rows
        .filter(
          (r) =>
            (i.minScore == null || r.score >= i.minScore) &&
            (i.minArr == null || r.arr >= i.minArr) &&
            (!i.renewingBefore || (r.nextRenewal != null && r.nextRenewal <= i.renewingBefore)) &&
            (i.maxUsageChange == null || r.usageChange <= i.maxUsageChange) &&
            (i.minEscalated90 == null || r.escalated90 >= i.minEscalated90),
        )
        .slice(0, i.limit);
      return {
        total: hits.length,
        accounts: hits.map((r) => ({
          customerId: r.customerId,
          name: r.name,
          segment: r.segment,
          region: r.region,
          tier: r.tier,
          arr: r.arr,
          nextRenewal: r.nextRenewal,
          usageChange: r.usageChange,
          escalated90: r.escalated90,
          avgCsat90: r.avgCsat90,
          score: r.score,
          state: r.state,
          reasons: r.reasons.map((x) => x.text),
        })),
      };
    },
  }),
  getAccountDetail: tool({
    description: "Full detail for one account: recent cases (with caseId), monthly usage, past decisions.",
    inputSchema: z.object({ customerId: z.string() }),
    execute: async ({ customerId }) => {
      const a = await getAccount(customerId);
      if (!a) return { error: "Account not found" };
      return {
        customerId,
        name: a.customer.name,
        score: a.health.score,
        reasons: a.health.reasons.map((r) => r.text),
        usage: a.usage.slice(-12),
        cases: a.cases.slice(0, 15).map((c) => ({
          caseId: c.caseId,
          createdAt: c.createdAt,
          category: c.category,
          subject: c.subject,
          priority: c.priority,
          status: c.status,
          escalated: c.escalated,
          csat: c.csat,
        })),
        decisions: a.decisions.map((d) => ({ action: d.action, note: d.note, at: d.createdAt })),
      };
    },
  }),
  portfolioOverview: tool({
    description: "Portfolio totals: flagged accounts (score>=5), ARR at risk, pending reviews, renewals in next 90 days.",
    inputSchema: z.object({}),
    execute: async () => portfolioStats(),
  }),
  caseThemes: tool({
    description:
      "Aggregate cases across the whole portfolio grouped by category/subcategory/product since a date. Use to find recurring issues and how many distinct accounts they hit.",
    inputSchema: z.object({
      since: z.string().describe("YYYY-MM-DD"),
      escalatedOnly: z.boolean().default(false),
      groupBy: z.enum(["category", "subcategory", "productId"]).default("category"),
      limit: z.number().max(20).default(10),
    }),
    execute: async (i) => {
      const col = cases[i.groupBy];
      return db
        .select({
          theme: col,
          cases: sql<number>`count(*)`,
          accounts: sql<number>`count(distinct ${cases.customerId})`,
          escalated: sql<number>`sum(${cases.escalated})`,
          avgCsat: sql<number>`round(avg(${cases.csat}), 2)`,
        })
        .from(cases)
        .where(and(gte(cases.createdAt, i.since), i.escalatedOnly ? eq(cases.escalated, true) : undefined))
        .groupBy(col)
        .orderBy(desc(sql`count(*)`))
        .limit(i.limit);
    },
  }),
  searchCases: tool({
    description: "Find individual cases across the portfolio by text in subject, category, priority, escalation, date.",
    inputSchema: z.object({
      text: z.string().optional(),
      category: z.string().optional(),
      priority: z.string().optional(),
      escalatedOnly: z.boolean().optional(),
      since: z.string().optional().describe("YYYY-MM-DD"),
      limit: z.number().max(25).default(10),
    }),
    execute: async (i) =>
      db
        .select({
          caseId: cases.caseId,
          customerId: cases.customerId,
          account: customers.name,
          createdAt: cases.createdAt,
          category: cases.category,
          subject: cases.subject,
          priority: cases.priority,
          escalated: cases.escalated,
          csat: cases.csat,
        })
        .from(cases)
        .innerJoin(customers, eq(customers.customerId, cases.customerId))
        .where(
          and(
            i.text ? like(cases.subject, `%${i.text}%`) : undefined,
            i.category ? eq(cases.category, i.category) : undefined,
            i.priority ? eq(cases.priority, i.priority) : undefined,
            i.escalatedOnly ? eq(cases.escalated, true) : undefined,
            i.since ? gte(cases.createdAt, i.since) : undefined,
          ),
        )
        .orderBy(desc(cases.createdAt))
        .limit(i.limit),
  }),
  getAccountBrief: tool({
    description:
      "Generate (or fetch cached) the AI risk brief for one account: summary, likely driver, cited evidence, suggested actions, draft email. Use before recommending a decision.",
    inputSchema: z.object({ customerId: z.string() }),
    execute: async ({ customerId }) => {
      const r = await generateBrief(customerId);
      return "error" in r ? r : { source: r.source, ...r.brief };
    },
  }),
  proposeDecision: tool({
    description:
      "Propose approving (outreach/intervention) or dismissing an account. This does NOT execute anything: it shows the human an approval card. Always include a short rationale grounded in data you fetched.",
    inputSchema: z.object({
      customerId: z.string(),
      action: z.enum(["approved", "dismissed"]),
      rationale: z.string().describe("1-2 sentences, cite caseIds / numbers"),
      draft: z.string().optional().describe("Outreach email draft if approving"),
    }),
    execute: async (i) => {
      const a = await getAccount(i.customerId);
      return a ? { ...i, name: a.customer.name, score: a.health.score } : { error: "Account not found" };
    },
  }),
};
