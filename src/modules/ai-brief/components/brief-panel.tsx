"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { recordDecision } from "@/modules/decisions/actions";
import { generateBrief } from "../actions";
import type { BriefResult } from "../schema";

export function BriefPanel({ customerId, state }: { customerId: string; state: string }) {
  const [res, setRes] = useState<BriefResult | null>(null);
  const [draft, setDraft] = useState("");
  const [reason, setReason] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const run = (force: boolean) =>
    start(async () => {
      const r = await generateBrief(customerId, force);
      if ("error" in r) return setMsg(r.error);
      setRes(r);
      setDraft(r.brief.draft_email);
      setMsg(null);
    });

  const decide = (action: "approved" | "dismissed") =>
    start(async () => {
      const r = await recordDecision({ customerId, action, note: reason, draft });
      setMsg("error" in r ? r.error : `Recorded: ${action}`);
    });

  if (!res)
    return (
      <div className="space-y-3">
        <p className="text-muted-foreground text-sm">No brief yet. Generate a cited brief and outreach draft.</p>
        <Button onClick={() => run(false)} disabled={pending}>
          {pending ? "Generating…" : "Generate brief"}
        </Button>
        {msg && <p className="text-destructive text-sm">{msg}</p>}
      </div>
    );

  const b = res.brief;
  return (
    <div className="space-y-4 text-sm">
      <div className="text-muted-foreground text-xs">
        {res.source === "ai" ? "AI-generated" : "Template fallback (AI unavailable)"}
        {res.dropped > 0 && ` · ${res.dropped} uncited claim(s) dropped`}
        {res.note && ` · ${res.note.slice(0, 80)}`}
      </div>
      <p>{b.summary}</p>
      <p>
        <span className="font-medium">Likely driver:</span> {b.likely_driver}
      </p>
      <div>
        <div className="mb-1 font-medium">Evidence</div>
        <ul className="space-y-1">
          {b.evidence.map((e) => (
            <li key={`${e.type}-${e.id}`}>
              <a href={`#${e.type}-${e.id}`} className="text-primary font-mono text-xs hover:underline">
                {e.id}
              </a>{" "}
              {e.claim}
            </li>
          ))}
          {b.evidence.length === 0 && <li className="text-muted-foreground">No verified evidence.</li>}
        </ul>
      </div>
      <div>
        <div className="mb-1 font-medium">Proposed actions</div>
        <ul className="list-disc space-y-1 pl-5">
          {b.actions.map((a) => (
            <li key={a.label}>
              <span className="font-medium">{a.label}</span>: {a.rationale}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="mb-1 font-medium">
          Draft <span className="text-muted-foreground text-xs font-normal">AI-generated, not sent</span>
        </div>
        <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={8} />
      </div>
      <Textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        rows={1}
        placeholder="Reason (required to dismiss)"
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => decide("approved")} disabled={pending}>
          Approve
        </Button>
        <Button variant="outline" onClick={() => decide("dismissed")} disabled={pending}>
          Dismiss
        </Button>
        <Button variant="ghost" onClick={() => run(true)} disabled={pending}>
          Regenerate
        </Button>
        <span className="text-muted-foreground text-xs">Current state: {state}</span>
        {msg && <span className="text-xs">{msg}</span>}
      </div>
    </div>
  );
}
