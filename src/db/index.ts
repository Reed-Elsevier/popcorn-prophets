import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const globalForDb = globalThis as unknown as { client?: ReturnType<typeof createClient> };

const client =
  globalForDb.client ?? createClient({ url: process.env.DATABASE_URL ?? "file:./app.db" });
if (process.env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client);
