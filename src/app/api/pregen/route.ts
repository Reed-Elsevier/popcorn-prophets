import { generateBrief } from "@/modules/ai-brief/actions";
import { listQueue } from "@/modules/queue/queries";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/** Pre-generate (and cache) briefs + drafts for the top of the queue: GET /api/pregen?limit=20 */
export async function GET(req: Request) {
  const limit = Number(new URL(req.url).searchParams.get("limit") ?? 20);
  const rows = (await listQueue()).slice(0, limit);
  const out: { id: string; source?: string; error?: string }[] = [];
  for (const r of rows) {
    const res = await generateBrief(r.customerId);
    out.push("error" in res ? { id: r.customerId, error: res.error } : { id: r.customerId, source: res.source });
  }
  return Response.json({ done: out.length, ai: out.filter((o) => o.source === "ai").length, results: out });
}
