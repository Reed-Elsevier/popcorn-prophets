// Pure scoring rules (PRD 6.2). Thresholds are team choices, not validated.
export const AS_OF = "2026-09-30";

export type Signals = {
  usageChange: number; // fraction vs prior 3 months; -0.4 = down 40%
  escalated90: number;
  avgCsat90: number | null;
  cases90: number;
};

export type Reason = { rule: string; points: number; text: string };

const pct = (n: number) => `${Math.round(n * 100)}%`;

export function scoreSignals(s: Signals): { score: number; reasons: Reason[] } {
  const reasons: Reason[] = [];
  const drop = -s.usageChange;
  if (drop > 0.5)
    reasons.push({ rule: "usage_drop_50", points: 5, text: `Usage down ${pct(drop)} (last 3 mo vs prior 3)` });
  else if (drop > 0.25)
    reasons.push({ rule: "usage_drop_25", points: 3, text: `Usage down ${pct(drop)} (last 3 mo vs prior 3)` });
  if (s.escalated90 >= 1)
    reasons.push({ rule: "escalated", points: 2, text: `${s.escalated90} escalated case(s) in last 90 days` });
  if (s.avgCsat90 !== null && s.avgCsat90 < 3.5)
    reasons.push({ rule: "low_csat", points: 1, text: `Average CSAT ${s.avgCsat90.toFixed(1)} in last 90 days` });
  if (s.cases90 >= 2)
    reasons.push({ rule: "many_cases", points: 1, text: `${s.cases90} cases in last 90 days` });
  return { score: reasons.reduce((a, r) => a + r.points, 0), reasons };
}
