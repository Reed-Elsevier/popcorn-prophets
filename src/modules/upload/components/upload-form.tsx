"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Reason } from "@/modules/signals/score";
import { scoreUploaded } from "../actions";

const SAMPLE = JSON.stringify(
  { usageChange: -0.6, escalated90: 1, avgCsat90: 3.0, cases90: 3 },
  null,
  2,
);

export function UploadForm() {
  const [text, setText] = useState(SAMPLE);
  const [out, setOut] = useState<{ score: number; reasons: Reason[] } | { error: string } | null>(null);
  const [pending, start] = useTransition();

  return (
    <div className="space-y-3">
      <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} className="font-mono text-xs" />
      <Button disabled={pending} onClick={() => start(async () => setOut(await scoreUploaded(text)))}>
        {pending ? "Scoring…" : "Score account"}
      </Button>
      {out && "error" in out && <p className="text-destructive text-sm">{out.error}</p>}
      {out && "score" in out && (
        <div className="space-y-1 text-sm">
          <div className="text-lg font-bold">Score {out.score}</div>
          {out.reasons.map((r) => (
            <div key={r.rule}>
              +{r.points} {r.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
