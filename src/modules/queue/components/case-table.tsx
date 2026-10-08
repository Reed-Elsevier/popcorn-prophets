"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table";

type Case = {
  caseId: string;
  createdAt: string;
  category: string | null;
  subject: string | null;
  priority: string | null;
  status: string | null;
  csat: number | null;
  escalated: boolean;
};

export function CaseTable({ rows }: { rows: Case[] }) {
  return (
    <DataTable
      rows={rows}
      cols={[
        {
          key: "id",
          title: "Case",
          value: (r) => r.caseId,
          render: (r) => (
            <span id={`case-${r.caseId}`} className="target:bg-accent font-mono text-xs">
              {r.caseId}
            </span>
          ),
        },
        { key: "date", title: "Date", value: (r) => r.createdAt.slice(0, 10) },
        { key: "category", title: "Category", value: (r) => r.category },
        { key: "subject", title: "Subject", value: (r) => r.subject },
        { key: "priority", title: "Priority", value: (r) => r.priority },
        { key: "status", title: "Status", value: (r) => r.status },
        { key: "csat", title: "CSAT", value: (r) => r.csat },
        {
          key: "esc",
          title: "Esc.",
          value: (r) => (r.escalated ? 1 : 0),
          render: (r) => (r.escalated ? <Badge variant="destructive">Yes</Badge> : ""),
        },
      ]}
    />
  );
}
