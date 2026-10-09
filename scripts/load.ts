// Load F_customer CSVs into SQLite and precompute account_health. Usage: pnpm db:load
// Run after schema setup. Only load supplied files approved for this environment.
import { createClient } from "@libsql/client";
import { readFileSync } from "node:fs";
import Papa from "papaparse";
import { AS_OF, scoreSignals } from "../src/modules/signals/score.ts";

try {
  process.loadEnvFile();
} catch {}

const db = createClient({ url: process.env.DATABASE_URL ?? "file:./app.db" });
const dataDir = process.env.DATA_DIR ?? "data/F_customer";
type R = Record<string, string>;
const read = (f: string) =>
  Papa.parse<R>(readFileSync(`${dataDir}/${f}.csv`, "utf8"), {
    header: true,
    skipEmptyLines: true,
  }).data;

const day = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const asOfMs = Date.parse(AS_OF);
const d90 = day(asOfMs - 90 * 864e5);
const d365 = day(asOfMs - 365 * 864e5);
const monthOf = (i: number) => {
  const d = new Date(asOfMs);
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() - i);
  return d.toISOString().slice(0, 7);
};
const last3 = new Set([0, 1, 2].map(monthOf));
const prior3 = new Set([3, 4, 5].map(monthOf));
const keepFrom = monthOf(23);
const validCsat = (n: number) => Number.isFinite(n) && n > 0;

async function insert(table: string, cols: string[], rows: unknown[][]) {
  const sql = `INSERT INTO ${table} (${cols.join(",")}) VALUES (${cols.map(() => "?").join(",")})`;
  for (let i = 0; i < rows.length; i += 500)
    await db.batch(
      rows.slice(i, i + 500).map((args) => ({ sql, args: args as never[] })),
      "write",
    );
}

console.log("reading csv...");
const customers = read("customers").filter((c) => c.status === "Active");
const subs = read("subscriptions").filter((s) => s.status === "Active");
const usage = read("product_usage_monthly");
const cases = read("support_cases");
const renewals = read("renewal_opportunities");

const arr = new Map<string, number>();
const subEnd = new Map<string, string>();
for (const s of subs) {
  // NOTE: currencies are not converted (skeleton); disclose or fix.
  arr.set(s.customer_id, (arr.get(s.customer_id) ?? 0) + Number(s.annual_value_usd));
  const e = s.end_date.slice(0, 10);
  if (!subEnd.has(s.customer_id) || e < subEnd.get(s.customer_id)!) subEnd.set(s.customer_id, e);
}

const use = new Map<string, Map<string, number>>();
for (const u of usage) {
  const m = u.usage_month.slice(0, 7);
  if (m < keepFrom || !arr.has(u.customer_id)) continue;
  const byM = use.get(u.customer_id) ?? new Map<string, number>();
  byM.set(m, (byM.get(m) ?? 0) + Number(u.sessions));
  use.set(u.customer_id, byM);
}

const renewal = new Map<string, string>();
for (const r of renewals) {
  const d = r.renewal_due_date.slice(0, 10);
  if (r.stage === "Closed" || d < AS_OF) continue;
  if (!renewal.has(r.customer_id) || d < renewal.get(r.customer_id)!) renewal.set(r.customer_id, d);
}

const eligible = customers.filter((c) => {
  const m = use.get(c.customer_id);
  return !!m && [...prior3].some((k) => (m.get(k) ?? 0) > 0);
});
const eligibleIds = new Set(eligible.map((c) => c.customer_id));

const caseRows = cases.filter((c) => {
  const d = c.created_at.slice(0, 10);
  return eligibleIds.has(c.customer_id) && d >= d365 && d <= AS_OF;
});
const cs90 = new Map<string, R[]>();
for (const c of caseRows)
  if (c.created_at.slice(0, 10) >= d90)
    cs90.set(c.customer_id, [...(cs90.get(c.customer_id) ?? []), c]);

const health = eligible.map((c) => {
  const m = use.get(c.customer_id)!;
  const sum = (set: Set<string>) => [...set].reduce((a, k) => a + (m.get(k) ?? 0), 0);
  const prior = sum(prior3);
  const usageChange = prior > 0 ? (sum(last3) - prior) / prior : 0;
  const cs = cs90.get(c.customer_id) ?? [];
  const csats = cs.map((x) => Number(x.csat)).filter(validCsat);
  const sig = {
    usageChange,
    escalated90: cs.filter((x) => x.escalated === "True").length,
    avgCsat90: csats.length ? csats.reduce((a, b) => a + b, 0) / csats.length : null,
    cases90: cs.length,
  };
  const { score, reasons } = scoreSignals(sig);
  return [
    c.customer_id,
    arr.get(c.customer_id),
    renewal.get(c.customer_id) ?? subEnd.get(c.customer_id) ?? null,
    usageChange,
    sig.escalated90,
    sig.avgCsat90,
    sig.cases90,
    score,
    JSON.stringify(reasons),
    "pending",
  ];
});

console.log(`eligible accounts: ${eligible.length}; writing...`);
for (const t of ["account_health", "customers", "usage_monthly", "cases"])
  await db.execute(`DELETE FROM ${t}`);
await insert(
  "customers",
  ["customer_id", "name", "segment", "region", "tier", "owner_id"],
  eligible.map((c) => [c.customer_id, c.customer_name, c.segment, c.region, c.tier, c.account_owner_employee_id || null]),
);
await insert(
  "usage_monthly",
  ["customer_id", "month", "sessions"],
  [...use].filter(([id]) => eligibleIds.has(id)).flatMap(([id, m]) => [...m].map(([k, v]) => [id, k, v])),
);
await insert(
  "cases",
  ["case_id", "customer_id", "product_id", "category", "subcategory", "subject", "priority", "status", "created_at", "csat", "escalated"],
  caseRows.map((c) => [
    c.case_id, c.customer_id, c.product_id, c.category, c.subcategory, c.subject, c.priority,
    c.status, c.created_at, validCsat(Number(c.csat)) ? Number(c.csat) : null, c.escalated === "True" ? 1 : 0,
  ]),
);
await insert(
  "account_health",
  ["customer_id", "arr", "next_renewal", "usage_change", "escalated_90", "avg_csat_90", "cases_90", "score", "reasons", "state"],
  health,
);
console.log("done.");
db.close();
