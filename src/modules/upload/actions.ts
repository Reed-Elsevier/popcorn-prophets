"use server";

import { z } from "zod";
import { generateStructured } from "@/lib/ai";
import { parseTable } from "@/lib/ingest";
import { AS_OF, scoreSignals, type Reason } from "@/modules/signals/score";

// F13 MVP: LLM extracts usage + cases from a file or pasted text; user confirms; same rules score it.
const extracted = z.object({
  name: z.string(),
  usage: z.array(z.object({ month: z.string().describe("YYYY-MM"), sessions: z.number() })),
  cases: z.array(
    z.object({
      caseId: z.string(),
      createdAt: z.string().describe("YYYY-MM-DD"),
      csat: z.number().nullable(),
      escalated: z.boolean(),
    }),
  ),
});
export type Extracted = z.infer<typeof extracted>;

const SYSTEM = `Extract one customer's monthly usage sessions and support cases from the input (CSV rows, JSON or text). Use only values present; invent nothing. As-of date is ${AS_OF}.`;

export async function extractAccount(fd: FormData): Promise<{ data: Extracted } | { error: string }> {
  try {
    const file = fd.get("file");
    let input = String(fd.get("text") ?? "").trim();
    if (file instanceof File && file.size > 0) input = JSON.stringify((await parseTable(file)).slice(0, 500));
    if (!input) return { error: "Provide a file or paste text" };
    return { data: await generateStructured(extracted, input.slice(0, 60000), SYSTEM) };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Extraction failed" };
  }
}

const monthOf = (i: number) => {
  const d = new Date(Date.parse(AS_OF));
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() - i);
  return d.toISOString().slice(0, 7);
};

/** Same signal definitions as scripts/load.ts. */
export async function scoreConfirmed(raw: unknown): Promise<{ score: number; reasons: Reason[] } | { error: string }> {
  const p = extracted.safeParse(raw);
  if (!p.success) return { error: p.error.issues[0]?.message ?? "Invalid values" };
  const x = p.data;
  const sum = (idx: number[]) => {
    const set = new Set(idx.map(monthOf));
    return x.usage.filter((u) => set.has(u.month)).reduce((a, u) => a + u.sessions, 0);
  };
  const prior = sum([3, 4, 5]);
  const cutoff = new Date(Date.parse(AS_OF) - 90 * 864e5).toISOString().slice(0, 10);
  const cs = x.cases.filter((c) => c.createdAt >= cutoff && c.createdAt <= AS_OF);
  const csats = cs.map((c) => c.csat).filter((n): n is number => !!n && n > 0);
  return scoreSignals({
    usageChange: prior > 0 ? (sum([0, 1, 2]) - prior) / prior : 0,
    escalated90: cs.filter((c) => c.escalated).length,
    avgCsat90: csats.length ? csats.reduce((a, b) => a + b, 0) / csats.length : null,
    cases90: cs.length,
  });
}
