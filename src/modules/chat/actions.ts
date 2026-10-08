"use server";

import { generateWithTools } from "@/lib/ai";
import { AS_OF } from "@/modules/signals/score";
import { portfolioTools } from "./tools";

export type ChatTurn = { role: "user" | "assistant"; content: string };
export type AccountRef = { customerId: string; name: string; score: number; arr: number };
export type Proposal = { customerId: string; name: string; action: "approved" | "dismissed"; rationale: string; draft?: string };
export type ToolCall = { name: string; input: unknown; output: unknown };
export type ChatReply = { text: string; accounts: AccountRef[]; tools: ToolCall[]; proposals: Proposal[] } | { error: string };

const SYSTEM = `You help a customer success manager query their portfolio of accounts. As-of date: ${AS_OF}. Currency is as stored; do not convert.
Work like an analyst agent: plan, call tools in several steps (overview -> search -> drill into accounts/cases -> brief), cross-check before concluding, and for recurring issues use caseThemes. When you recommend acting on a specific account, call proposeDecision (it only shows an approval card; the human decides, never claim it was executed).
Use the tools for every factual claim; never answer from memory. Use ONLY tool results. Cite caseIds and account names. If tools return nothing, say so. Be concise (short bullets). Do not invent fields. Offer actions only as suggestions for the human to decide.`;

export async function askPortfolio(history: ChatTurn[]): Promise<ChatReply> {
  try {
    const res = await generateWithTools({ system: SYSTEM, messages: history, tools: portfolioTools });
    const seen = new Map<string, AccountRef>();
    const tools: ToolCall[] = [];
    const proposals: Proposal[] = [];
    for (const step of res.steps) {
      for (const tr of step.toolResults) {
        tools.push({ name: tr.toolName, input: tr.input, output: tr.output });
        const out = tr.output as { accounts?: Record<string, unknown>[] };
        if (tr.toolName === "proposeDecision" && !("error" in out)) proposals.push(tr.output as Proposal);
        for (const a of out.accounts ?? [])
          seen.set(String(a.customerId), {
            customerId: String(a.customerId),
            name: String(a.name),
            score: Number(a.score),
            arr: Number(a.arr),
          });
      }
    }
    // Link only accounts the tools returned AND the answer mentions.
    const accounts = [...seen.values()].filter((a) => res.text.includes(a.name)).slice(0, 8);
    return { text: res.text || "No answer produced.", accounts, tools, proposals };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "AI call failed";
    return {
      error: /too many requests|throttl|429/i.test(msg)
        ? "The AI provider is rate-limiting requests (shared key). Wait a few seconds and ask again."
        : msg,
    };
  }
}
