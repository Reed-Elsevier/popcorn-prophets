const rows = [
  ["Usage drop >25% alone", "30% of customers flagged; precision 3%, lift 1.9x"],
  ["Escalated case in last 90 days", "precision 16%, recall 56%, lift 10x"],
  ["Usage drop >25% AND escalated case", "precision 30%, recall 37%, lift 19x, flags 2%"],
  ["Top 100 accounts per month by score", "precision 23% vs base rate 1.6% (15x)"],
  ["Lead time (score ≥ 5)", "median 38 days; 59% ≥ 30 days; 31% ≥ 60 days"],
];

// Static numbers from the offline pandas backtest in PRD section 2 (precomputed, disclosed).
export default function ReliabilityPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-4 px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Reliability</h1>
      <p className="text-muted-foreground text-sm">
        Precomputed offline backtest (monthly as-of dates 2024-04 to 2026-06, label: churn within 90 days, base
        rate 1.6%). Static, not recomputed live.
      </p>
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k} className="border-t">
              <td className="p-2 font-medium">{k}</td>
              <td className="p-2">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="pt-2 font-semibold">Caveats</h2>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        <li>Thresholds were chosen after seeing the data (in-sample); the data is synthetic.</li>
        <li>Possible leakage if the escalated flag is set after case creation (unverified).</li>
        <li>Overlapping panel rows; no Strategic-tier customer has churned.</li>
        <li>This is a prioritization aid, not a churn predictor.</li>
      </ul>
    </main>
  );
}
