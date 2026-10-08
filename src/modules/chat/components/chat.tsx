"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MessageSquareIcon } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "@/components/ai-elements/tool";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { recordDecision } from "@/modules/decisions/actions";
import { askPortfolio, type AccountRef, type ChatTurn, type Proposal, type ToolCall } from "../actions";

type Msg = ChatTurn & { accounts?: AccountRef[]; tools?: ToolCall[]; proposals?: Proposal[] };

/** Human-in-the-loop: the agent only proposes; nothing is recorded until a person clicks. */
function ProposalCard({ p }: { p: Proposal }) {
  const [note, setNote] = useState(p.action === "dismissed" ? p.rationale : "");
  const [done, setDone] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const act = async (action: "approved" | "dismissed") => {
    setBusy(true);
    const r = await recordDecision({ customerId: p.customerId, action, note: note || p.rationale, draft: p.draft });
    setBusy(false);
    if ("error" in r) return setErr(r.error);
    setDone(action);
  };
  return (
    <div className="bg-card not-prose w-full space-y-2 rounded-md border p-3 text-sm">
      <p>
        <span className="text-muted-foreground text-xs tracking-wide uppercase">AI suggests {p.action === "approved" ? "approve" : "dismiss"}</span>
        <br />
        <Link href={`/accounts/${p.customerId}`} className="font-medium underline">
          {p.name}
        </Link>
      </p>
      <p className="text-muted-foreground">{p.rationale}</p>
      {p.draft && <pre className="bg-muted/50 rounded p-2 text-xs whitespace-pre-wrap">{p.draft}</pre>}
      {done ? (
        <p className="text-xs font-medium">Recorded: {done}</p>
      ) : (
        <>
          <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Your note (required to dismiss)" />
          <div className="flex gap-2">
            <Button size="sm" disabled={busy} onClick={() => act("approved")}>Approve</Button>
            <Button size="sm" variant="outline" disabled={busy} onClick={() => act("dismissed")}>Dismiss</Button>
          </div>
          {err && <p className="text-destructive text-xs">{err}</p>}
        </>
      )}
    </div>
  );
}

const SUGGESTIONS = [
  "Which accounts renewing in the next 90 days have escalations and falling usage?",
  "Top 5 flagged accounts by ARR and why",
  "What recurring issues hit the most accounts in the last 6 months? Which flagged account is hit hardest?",
  "Review my riskiest renewal and propose a decision",
];

export function Chat({ className }: { className?: string }) {
  const pathname = usePathname();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const send = async (text: string) => {
    if (!text.trim() || pending) return;
    const next: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs(next);
    setErr(null);
    setPending(true);
    const viewing = pathname.match(/^\/accounts\/([^/]+)/)?.[1];
    const r = await askPortfolio(
      next.map(({ role, content }) => ({ role, content })),
      viewing ? decodeURIComponent(viewing) : undefined,
    );
    setPending(false);
    if ("error" in r) return setErr(r.error);
    setMsgs([...next, { role: "assistant", content: r.text, accounts: r.accounts, tools: r.tools, proposals: r.proposals }]);
  };

  return (
    <div className={cn("flex h-[70vh] flex-col gap-3", className)}>
      <Conversation className="rounded-lg border">
        <ConversationContent>
          {msgs.length === 0 && (
            <ConversationEmptyState
              icon={<MessageSquareIcon className="size-6" />}
              title="Ask about your accounts"
              description="Try a suggestion below or type your own question."
            />
          )}
          {msgs.map((m, i) => (
            <Message key={i} from={m.role}>
              <MessageContent>
                {m.tools?.map((t, j) => (
                  <Tool key={j} className="mb-2">
                    <ToolHeader type="dynamic-tool" toolName={t.name} state="output-available" />
                    <ToolContent>
                      <ToolInput input={t.input} />
                      <ToolOutput output={t.output} errorText={undefined} />
                    </ToolContent>
                  </Tool>
                ))}
                {m.role === "assistant" ? <MessageResponse>{m.content}</MessageResponse> : m.content}
                {m.proposals?.map((p, j) => (
                  <ProposalCard key={j} p={p} />
                ))}
                {m.accounts && m.accounts.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {m.accounts.map((a) => (
                      <Link
                        key={a.customerId}
                        href={`/accounts/${a.customerId}`}
                        className="bg-card hover:border-primary rounded-md border px-3 py-1.5 text-xs"
                      >
                        <span className="font-medium">{a.name}</span> · score {a.score} · ARR{" "}
                        {Math.round(a.arr).toLocaleString()}
                      </Link>
                    ))}
                  </div>
                )}
              </MessageContent>
            </Message>
          ))}
          {pending && (
            <Message from="assistant">
              <MessageContent>
                <Shimmer>Querying portfolio…</Shimmer>
              </MessageContent>
            </Message>
          )}
          {err && <p className="text-destructive text-sm">{err}</p>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      {msgs.length === 0 && (
        <Suggestions>
          {SUGGESTIONS.map((s) => (
            <Suggestion key={s} suggestion={s} onClick={send} />
          ))}
        </Suggestions>
      )}
      <PromptInput onSubmit={({ text }) => send(text)}>
        <PromptInputBody>
          <PromptInputTextarea placeholder="Ask about your portfolio…" />
        </PromptInputBody>
        <PromptInputFooter>
          <span className="text-muted-foreground text-xs">AI answers from read-only queries. Verify before acting.</span>
          <PromptInputSubmit status={pending ? "submitted" : undefined} />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}
