import "server-only";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import type { SQLiteColumn } from "drizzle-orm/sqlite-core";
import { db } from "@/db";
import { accountHealth, cases, customers, decisions, usageMonthly } from "@/modules/signals/schema";
import type { Reason } from "@/modules/signals/score";

export type QueueFilters = { segment?: string; region?: string; tier?: string; state?: string };

export async function listQueue(f: QueueFilters = {}) {
  const where = and(
    f.segment ? eq(customers.segment, f.segment) : undefined,
    f.region ? eq(customers.region, f.region) : undefined,
    f.tier ? eq(customers.tier, f.tier) : undefined,
    f.state ? eq(accountHealth.state, f.state) : undefined,
  );
  const rows = await db
    .select()
    .from(accountHealth)
    .innerJoin(customers, eq(customers.customerId, accountHealth.customerId))
    .where(where)
    .orderBy(desc(accountHealth.score), desc(accountHealth.arr), asc(accountHealth.nextRenewal))
    .limit(100);
  return rows.map((r) => ({
    ...r.customers,
    ...r.account_health,
    reasons: JSON.parse(r.account_health.reasons) as Reason[],
  }));
}

/** Portfolio header totals over accounts with score >= 5 ("flagged"). */
export async function portfolioStats() {
  const [s] = await db
    .select({
      flagged: sql<number>`count(*)`,
      arrFlagged: sql<number>`coalesce(sum(${accountHealth.arr}), 0)`,
      pending: sql<number>`coalesce(sum(case when ${accountHealth.state} = 'pending' then 1 else 0 end), 0)`,
      renewing90: sql<number>`coalesce(sum(case when ${accountHealth.nextRenewal} <= date('2026-09-30', '+90 day') then 1 else 0 end), 0)`,
    })
    .from(accountHealth)
    .where(sql`${accountHealth.score} >= 5`);
  return s;
}

export async function getAccount(id: string) {
  const [row] = await db
    .select()
    .from(accountHealth)
    .innerJoin(customers, eq(customers.customerId, accountHealth.customerId))
    .where(eq(accountHealth.customerId, id));
  if (!row) return null;
  const usage = await db
    .select({ month: usageMonthly.month, sessions: usageMonthly.sessions })
    .from(usageMonthly)
    .where(eq(usageMonthly.customerId, id))
    .orderBy(asc(usageMonthly.month));
  const caseRows = await db
    .select()
    .from(cases)
    .where(eq(cases.customerId, id))
    .orderBy(desc(cases.createdAt))
    .limit(30);
  const log = await db
    .select()
    .from(decisions)
    .where(eq(decisions.customerId, id))
    .orderBy(desc(decisions.createdAt));
  return {
    customer: row.customers,
    health: { ...row.account_health, reasons: JSON.parse(row.account_health.reasons) as Reason[] },
    usage,
    cases: caseRows,
    decisions: log,
  };
}

export type Account = NonNullable<Awaited<ReturnType<typeof getAccount>>>;

export async function filterOptions() {
  const col = async (c: SQLiteColumn) =>
    (await db.selectDistinct({ v: c }).from(customers).orderBy(c)).map((r) => String(r.v));
  return {
    segment: await col(customers.segment),
    region: await col(customers.region),
    tier: await col(customers.tier),
  };
}
