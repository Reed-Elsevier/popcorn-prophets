"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Reason } from "@/modules/signals/score";
import { extractAccount, scoreConfirmed } from "../actions";

export function UploadForm() {
  const [json, setJson] = useState<string | null>(null);
  const [out, setOut] = useState<{ score: number; reasons: Reason[] } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const extract = (fd: FormData) =>
    start(async () => {
      setErr(null);
      setOut(null);
      const r = await extractAccount(fd);
      if ("error" in r) return setErr(r.error);
      setJson(JSON.stringify(r.data, null, 2));
    });

  const score = () =>
    start(async () => {
      setErr(null);
      let parsed: unknown;
      try {
        parsed = JSON.parse(json ?? "");
      } catch {
        return setErr("Values are not valid JSON");
      }
      const r = await scoreConfirmed(parsed);
      if ("error" in r) return setErr(r.error);
      setOut(r);
    });

  return (
    <div className="space-y-6">
      <form action={extract} className="space-y-3">
        <div className="text-sm font-medium">1. Provide the account</div>
        <Input type="file" name="file" accept=".csv,.xlsx" />
        <Textarea name="text" rows={6} placeholder="…or paste CSV, JSON or free text with usage and cases" />
        <Button disabled={pending}>{pending && !json ? "Extracting…" : "Extract with AI"}</Button>
      </form>

      {json !== null && (
        <div className="space-y-3">
          <div className="text-sm font-medium">2. Confirm extracted values (edit if wrong)</div>
          <Textarea value={json} onChange={(e) => setJson(e.target.value)} rows={14} className="font-mono text-xs" />
          <Button disabled={pending} onClick={score}>
            {pending ? "Scoring…" : "Confirm and score"}
          </Button>
        </div>
      )}

      {err && <p className="text-destructive text-sm">{err}</p>}

      {out && (
        <div className="space-y-1 text-sm">
          <div className="text-lg font-bold">Score {out.score}</div>
          {out.reasons.map((r) => (
            <div key={r.rule}>
              +{r.points} {r.text}
            </div>
          ))}
          {out.reasons.length === 0 && <p className="text-muted-foreground">No rules triggered.</p>}
        </div>
      )}
    </div>
  );
}
