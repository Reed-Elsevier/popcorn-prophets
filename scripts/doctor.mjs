// Preflight for a fresh machine. Usage: pnpm doctor [--ai]  (--ai makes one tiny model call)
import { createClient } from "@libsql/client";

try {
  process.loadEnvFile();
} catch {}

let failed = false;
const ok = (m) => console.log(`  ok   ${m}`);
const bad = (m) => {
  failed = true;
  console.log(`  FAIL ${m}`);
};
const warn = (m) => console.log(`  warn ${m}`);

const major = Number(process.versions.node.split(".")[0]);
major >= 24
  ? ok(`node ${process.versions.node}`)
  : bad(`node ${process.versions.node} (need 24, see .nvmrc)`);

const url = process.env.DATABASE_URL ?? "file:./app.db";
const client = createClient({ url });
try {
  await client.execute("select 1");
  ok(`database reachable (${url})`);
} catch (e) {
  bad(`database unreachable: ${e.code ?? e.message}`);
} finally {
  client.close();
}

const provider = process.env.AI_PROVIDER ?? "openrouter";
const model = process.env.AI_MODEL ?? "openrouter/free";
const key = provider === "openrouter" ? process.env.OPENROUTER_API_KEY : process.env.AI_API_KEY;
const base =
  provider === "openrouter" ? "https://openrouter.ai/api/v1" : (process.env.AI_BASE_URL ?? "");
key ? ok(`AI key set (${provider}, ${model})`) : bad(`AI key missing for ${provider}`);
if (provider !== "openrouter" && !base) bad("AI_BASE_URL missing");

if (process.argv.includes("--ai") && key && base) {
  try {
    const t = Date.now();
    const res = await fetch(`${base.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        max_tokens: 5,
        messages: [{ role: "user", content: "Say ok" }],
      }),
      signal: AbortSignal.timeout(30000),
    });
    res.ok
      ? ok(`AI call succeeded in ${Date.now() - t}ms`)
      : bad(`AI call failed: HTTP ${res.status}`);
  } catch (e) {
    bad(`AI call failed: ${e.message}`);
  }
}

process.exit(failed ? 1 : 0);
