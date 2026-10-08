"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table";
import { ScoreBadge } from "@/modules/signals/score-badge";

type Row = {
  customerId: string;
  name: string;
  segment: string;
  region: string;
  tier: string;
  arr: number;
  nextRenewal: string | null;
  score: number;
  state: string;
  reasons: { text: string }[];
};

export function QueueTable({ rows }: { rows: Row[] }) {
  return (
    <DataTable
      rows={rows}
      cols={[
        {
          key: "name",
          title: "Customer",
          value: (r) => r.name,
          render: (r) => (
            <>
              <Link href={`/accounts/${r.customerId}`} className="font-medium hover:underline">
                {r.name}
              </Link>
              <div className="text-muted-foreground text-xs">
                {r.segment} · {r.region} · {r.tier}
              </div>
            </>
          ),
        },
        { key: "arr", title: "ARR", value: (r) => r.arr, render: (r) => `$${Math.round(r.arr).toLocaleString("en-US")}` },
        { key: "renewal", title: "Renewal", value: (r) => r.nextRenewal },
        { key: "score", title: "Score", value: (r) => r.score, render: (r) => <ScoreBadge score={r.score} /> },
        { key: "reason", title: "Top reason", value: (r) => r.reasons[0]?.text ?? null },
        {
          key: "state",
          title: "State",
          value: (r) => r.state,
          render: (r) => <Badge variant={r.state === "pending" ? "secondary" : "outline"}>{r.state}</Badge>,
        },
      ]}
    />
  );
}
