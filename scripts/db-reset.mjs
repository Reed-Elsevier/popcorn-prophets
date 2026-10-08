// Delete the local SQLite file and re-push the Drizzle schema.
// Usage: pnpm db:reset
import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";

try {
  process.loadEnvFile();
} catch {}

const url = process.env.DATABASE_URL ?? "file:./app.db";
if (!url.startsWith("file:")) {
  console.error(`Refusing to reset non-file database "${url}".`);
  process.exit(1);
}

const path = url.slice("file:".length);
for (const suffix of ["", "-wal", "-shm", "-journal"]) rmSync(path + suffix, { force: true });
console.log(`Reset ${path}. Pushing schema...`);
process.exit(
  spawnSync("pnpm", ["exec", "drizzle-kit", "push", "--force"], { stdio: "inherit", shell: true })
    .status ?? 1,
);
