import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const customers = sqliteTable("customers", {
  customerId: text("customer_id").primaryKey(),
  name: text("name").notNull(),
  segment: text("segment").notNull(),
  region: text("region").notNull(),
  tier: text("tier").notNull(),
  ownerId: text("owner_id"),
});

export const usageMonthly = sqliteTable("usage_monthly", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerId: text("customer_id").notNull(),
  month: text("month").notNull(), // YYYY-MM
  sessions: integer("sessions").notNull(),
});

export const cases = sqliteTable("cases", {
  caseId: text("case_id").primaryKey(),
  customerId: text("customer_id").notNull(),
  productId: text("product_id"),
  category: text("category"),
  subcategory: text("subcategory"),
  subject: text("subject"),
  priority: text("priority"),
  status: text("status"),
  createdAt: text("created_at").notNull(),
  csat: real("csat"),
  escalated: integer("escalated", { mode: "boolean" }).notNull(),
});

// Precomputed by `pnpm db:load` (scripts/load.ts) using src/modules/signals/score.ts.
export const accountHealth = sqliteTable("account_health", {
  customerId: text("customer_id").primaryKey(),
  arr: real("arr").notNull(),
  nextRenewal: text("next_renewal"),
  usageChange: real("usage_change").notNull(), // fraction, -0.4 = down 40%
  escalated90: integer("escalated_90").notNull(),
  avgCsat90: real("avg_csat_90"),
  cases90: integer("cases_90").notNull(),
  score: integer("score").notNull(),
  reasons: text("reasons").notNull(), // JSON Reason[]
  state: text("state").notNull().default("pending"), // pending | approved | dismissed
});

export const briefs = sqliteTable("briefs", {
  customerId: text("customer_id").primaryKey(),
  json: text("json").notNull(),
  source: text("source").notNull(), // ai | fallback
  createdAt: text("created_at").notNull(),
});

export const decisions = sqliteTable("decisions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerId: text("customer_id").notNull(),
  action: text("action").notNull(), // approved | dismissed
  note: text("note"),
  draft: text("draft"),
  createdAt: text("created_at").notNull(),
});
