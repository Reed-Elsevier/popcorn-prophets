// Soft tinted score pill: deeper tone for higher risk.
export function ScoreBadge({ score }: { score: number }) {
  const tone =
    score >= 8
      ? "bg-red-900/10 text-red-900"
      : score >= 5
        ? "bg-primary/15 text-primary"
        : score >= 3
          ? "bg-amber-700/10 text-amber-800"
          : "bg-muted text-muted-foreground";
  return (
    <span className={`inline-block min-w-8 rounded-full px-2.5 py-0.5 text-center text-sm font-semibold tabular-nums ${tone}`}>
      {score}
    </span>
  );
}
