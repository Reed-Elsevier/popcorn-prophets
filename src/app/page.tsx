import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ScoreBadge } from "@/modules/signals/score-badge";
import { filterOptions, listQueue, portfolioStats } from "@/modules/queue/queries";

export const dynamic = "force-dynamic";

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const stateStyle: Record<string, string> = {
  pending: "bg-secondary text-foreground",
  approved: "bg-emerald-700/10 text-emerald-800",
  dismissed: "bg-muted text-muted-foreground",
};

export default async function QueuePage({ searchParams }: PageProps<"/">) {
  const sp = await searchParams;
  const f = {
    segment: one(sp.segment),
    region: one(sp.region),
    tier: one(sp.tier),
    state: one(sp.state),
  };
  const [rows, stats, opts] = await Promise.all([listQueue(f), portfolioStats(), filterOptions()]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Accounts at risk</h1>
        <p className="text-muted-foreground">Ranked by risk score, then ARR, then renewal date.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Accounts flagged (score ≥ 5)" value={stats.flagged.toLocaleString()} />
        <Stat label="ARR flagged" value={usd(stats.arrFlagged)} />
        <Stat label="Flagged, renewing ≤ 90 days" value={stats.renewing90.toLocaleString()} />
        <Stat label="Pending review" value={stats.pending.toLocaleString()} />
      </div>

      <form className="flex flex-wrap items-end gap-3 text-sm">
        <Select name="segment" label="Segment" options={opts.segment} value={f.segment} />
        <Select name="region" label="Region" options={opts.region} value={f.region} />
        <Select name="tier" label="Tier" options={opts.tier} value={f.tier} />
        <Select name="state" label="State" options={["pending", "approved", "dismissed"]} value={f.state} />
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-1.5 font-medium transition-colors">
          Filter
        </button>
        <Link href="/" className="text-muted-foreground py-1.5 hover:underline">
          Reset
        </Link>
      </form>

      <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
        <table className="w-full text-base">
          <thead className="bg-muted/60 text-muted-foreground text-left text-xs tracking-wider uppercase">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3 text-right">ARR</th>
              <th className="p-3">Renewal</th>
              <th className="p-3 text-right">Score</th>
              <th className="p-3">Top reason</th>
              <th className="p-3">State</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.customerId} className="hover:bg-accent border-t">
                <td className="p-3">
                  <Link href={`/accounts/${r.customerId}`} className="font-medium hover:underline">
                    {r.name}
                  </Link>
                  <div className="text-muted-foreground text-xs">
                    {r.segment} · {r.region} · {r.tier}
                  </div>
                </td>
                <td className="p-3 text-right tabular-nums">{usd(r.arr)}</td>
                <td className="p-3 tabular-nums">{r.nextRenewal ?? "—"}</td>
                <td className="p-3 text-right">
                  <ScoreBadge score={r.score} />
                </td>
                <td className="text-muted-foreground p-3">{r.reasons[0]?.text ?? "—"}</td>
                <td className="p-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${stateStyle[r.state]}`}>{r.state}</span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="text-muted-foreground p-6 text-center">
                  No accounts match. Run the data loader if the queue is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-muted-foreground text-xs">
        Showing top {rows.length} by score, then ARR, then renewal date. A prioritization aid, not a churn
        predictor.
      </p>
    </main>
  );
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="space-y-1 py-4">
        <div className="text-3xl font-semibold tabular-nums">{value}</div>
        <div className="text-muted-foreground text-xs">{label}</div>
      </CardContent>
    </Card>
  );
}

function Select(p: { name: string; label: string; options: string[]; value?: string }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-muted-foreground text-xs">{p.label}</span>
      <select name={p.name} defaultValue={p.value ?? ""} className="bg-background rounded-md border px-2 py-1.5">
        <option value="">All</option>
        {p.options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
