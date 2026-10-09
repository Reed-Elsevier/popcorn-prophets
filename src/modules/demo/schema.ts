import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Example table for the demo module. Delete with the module.
export const notes = sqliteTable("notes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  body: text("body").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});
