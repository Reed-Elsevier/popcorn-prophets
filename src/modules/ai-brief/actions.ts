"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { generateStructured } from "@/lib/ai";
import { getAccount, type Account } from "@/modules/queue/queries";
import { briefs } from "@/modules/signals/schema";
import { briefSchema, type Brief, type BriefResult } from "./schema";

const SYSTEM =
  "You help a customer success manager. Use ONLY the data provided. Every evidence item must cite a case_id or usage month present in the input. If data is missing, say so; never invent facts. Prefer structured fields (category, subcategory, product, priority, escalated) over free text.";

/** Drop evidence whose ID is not in the input (PRD F11). */
function checkCitations(brief: Brief, caseIds: Set<string>, months: Set<string>) {
  const evidence = brief.evidence.filter((e) => (e.type === "case" ? caseIds : months).has(e.id));
  return { brief: { ...brief, evidence }, dropped: brief.evidence.length - evidence.length };
}

// SKELETON FALLBACK (disclosed in DISCLOSURE.md): deterministic template used when the AI call fails.
function fallbackBrief(a: Account): Brief {
  const esc = a.cases.filter((c) => c.escalated).slice(0, 3);
  const last = a.usage.at(-1);
  return {
    summary: `${a.customer.name} scores ${a.health.score}: ${a.health.reasons.map((r) => r.text).join("; ") || "no rules triggered"}.`,
    likely_driver: esc[0]?.category ?? "Unknown (no escalated case)",
    evidence: [
      ...esc.map((c) => ({
        type: "case" as const,
        id: c.caseId,
        claim: `Escalated: ${c.subject ?? c.subcategory}`,
      })),
      ...(last
        ? [{ type: "usage" as const, id: last.month, claim: `${last.sessions} sessions in latest month` }]
        : []),
    ],
    actions: [
      { label: "Offer a call", rationale: "Account shows risk signals; a direct conversation is the lowest-cost step." },
      { label: "Escalate to engineering", rationale: "Applies if an escalated case remains open." },
    ],
    draft_email: `Hi ${a.customer.name} team,\n\nWe noticed some recent issues${esc[0] ? ` around "${esc[0].subject}"` : ""} and wanted to check in personally. Could we schedule 20 minutes this week?\n\nBest regards,\nYour Customer Success Manager`,
  };
}

export async function generateBrief(
  customerId: string,
  force = false,
): Promise<BriefResult | { error: string }> {
  const a = await getAccount(customerId);
  if (!a) return { error: "Account not found" };
  const recent = a.cases.slice(0, 10);
  const caseIds = new Set(recent.map((c) => c.caseId));
  const months = new Set(a.usage.map((u) => u.month));

  if (!force) {
    const [cached] = await db.select().from(briefs).where(eq(briefs.customerId, customerId));
    if (cached)
      return { brief: JSON.parse(cached.json), source: cached.source as "ai" | "fallback", dropped: 0 };
  }

  const prompt = JSON.stringify({
    as_of: "2026-09-30",
    customer: a.customer,
    signals: { ...a.health, reasons: a.health.reasons.map((r) => r.text) },
    usage_sessions_by_month: a.usage.slice(-12),
    recent_cases: recent,
  });

  let result: BriefResult;
  try {
    const out = await generateStructured(briefSchema, prompt, SYSTEM);
    result = { ...checkCitations(out, caseIds, months), source: "ai" };
  } catch (e) {
    result = {
      brief: fallbackBrief(a),
      source: "fallback",
      dropped: 0,
      note: e instanceof Error ? e.message : "AI call failed",
    };
  }
  const row = { json: JSON.stringify(result.brief), source: result.source, createdAt: new Date().toISOString() };
  await db
    .insert(briefs)
    .values({ customerId, ...row })
    .onConflictDoUpdate({ target: briefs.customerId, set: row });
  return result;
}
