"use server";

import { z } from "zod";
import { scoreSignals, type Reason } from "@/modules/signals/score";

// SKELETON: takes JSON in the Signals shape. Real flow (F13): LLM extraction from CSV/text -> confirm -> score.
const input = z.object({
  usageChange: z.number(),
  escalated90: z.number().int(),
  avgCsat90: z.number().nullable(),
  cases90: z.number().int(),
});

export async function scoreUploaded(
  raw: string,
): Promise<{ score: number; reasons: Reason[] } | { error: string }> {
  try {
    return scoreSignals(input.parse(JSON.parse(raw)));
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Invalid input" };
  }
}
