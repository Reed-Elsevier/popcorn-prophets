"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { recordDecision } from "@/modules/decisions/actions";

export function OutreachPanel({
  customerId,
  state,
  initialDraft,
}: {
  customerId: string;
  state: string;
  initialDraft: string;
}) {
  const [draft, setDraft] = useState(initialDraft);
  const [reason, setReason] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const decide = (action: "approved" | "dismissed") =>
    start(async () => {
      const r = await recordDecision({ customerId, action, note: reason, draft });
      setMsg("error" in r ? r.error : `Recorded: ${action}`);
    });

  return (
    <div className="space-y-3 text-sm">
      <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={9} />
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
        <span className="text-muted-foreground text-xs">Current state: {state}</span>
        {msg && <span className="text-xs">{msg}</span>}
      </div>
    </div>
  );
}
