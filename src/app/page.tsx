import { Card, CardContent } from "@/components/ui/card";
import { FilterBar } from "@/modules/queue/components/filter-bar";
import { QueueTable } from "@/modules/queue/components/queue-table";
import { filterOptions, listQueue, portfolioStats } from "@/modules/queue/queries";

export const dynamic = "force-dynamic";

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

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

      <FilterBar options={{ ...opts, state: ["pending", "approved", "dismissed"] }} />

      <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
        <QueueTable rows={rows} />
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
