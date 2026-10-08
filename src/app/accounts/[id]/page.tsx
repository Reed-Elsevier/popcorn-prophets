import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefPanel } from "@/modules/ai-brief/components/brief-panel";
import { UsageChart } from "@/modules/queue/components/usage-chart";
import { getAccount } from "@/modules/queue/queries";

export const dynamic = "force-dynamic";

export default async function AccountPage({ params }: PageProps<"/accounts/[id]">) {
  const { id } = await params;
  const a = await getAccount(id);
  if (!a) notFound();
  const { customer: c, health: h } = a;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-6 py-8">
      <div>
        <Link href="/" className="text-muted-foreground text-sm hover:underline">
          ← Queue
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold">{c.name}</h1>
          <Badge>Score {h.score}</Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          {c.segment} · {c.region} · {c.tier} · owner {c.ownerId ?? "—"} · ARR ${Math.round(h.arr).toLocaleString()} ·
          renews {h.nextRenewal ?? "—"}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Triggered rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {h.reasons.map((r) => (
                <div key={r.rule} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <span>{r.text}</span>
                  <Badge variant="secondary">+{r.points}</Badge>
                </div>
              ))}
              {h.reasons.length === 0 && (
                <p className="text-muted-foreground">No rules triggered; this account is not flagged.</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Sessions per month</CardTitle>
            </CardHeader>
            <CardContent>
              <UsageChart data={a.usage} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Decision log</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {a.decisions.map((d) => (
                <div key={d.id}>
                  <span className="font-medium">{d.action}</span>{" "}
                  <span className="text-muted-foreground text-xs">{d.createdAt.slice(0, 19)}</span>
                  {d.note && <div className="text-muted-foreground">{d.note}</div>}
                </div>
              ))}
              {a.decisions.length === 0 && <p className="text-muted-foreground">No decisions yet.</p>}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Brief and outreach</CardTitle>
          </CardHeader>
          <CardContent>
            <BriefPanel customerId={c.customerId} state={h.state} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Case timeline</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-muted-foreground text-left text-xs uppercase">
              <tr>
                <th className="p-2">Case</th>
                <th className="p-2">Date</th>
                <th className="p-2">Category</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Status</th>
                <th className="p-2">CSAT</th>
                <th className="p-2">Esc.</th>
              </tr>
            </thead>
            <tbody>
              {a.cases.map((k) => (
                <tr key={k.caseId} id={`case-${k.caseId}`} className="target:bg-accent border-t">
                  <td className="p-2 font-mono text-xs">{k.caseId}</td>
                  <td className="p-2 tabular-nums">{k.createdAt.slice(0, 10)}</td>
                  <td className="p-2">{k.category}</td>
                  <td className="p-2">{k.subject}</td>
                  <td className="p-2">{k.priority}</td>
                  <td className="p-2">{k.status}</td>
                  <td className="p-2">{k.csat ?? "—"}</td>
                  <td className="p-2">{k.escalated ? "Yes" : ""}</td>
                </tr>
              ))}
              {a.cases.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-muted-foreground p-4 text-center">
                    No cases in the last 12 months.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </main>
  );
}
