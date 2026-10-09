"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { accountHealth, decisions } from "@/modules/signals/schema";

export async function recordDecision(input: {
  customerId: string;
  action: "approved" | "dismissed";
  note?: string;
  draft?: string;
}): Promise<{ ok: true } | { error: string }> {
  if (input.action === "dismissed" && !input.note?.trim())
    return { error: "A reason is required to dismiss" };
  await db.insert(decisions).values({
    customerId: input.customerId,
    action: input.action,
    note: input.note ?? null,
    draft: input.draft ?? null,
    createdAt: new Date().toISOString(),
  });
  await db
    .update(accountHealth)
    .set({ state: input.action })
    .where(eq(accountHealth.customerId, input.customerId));
  revalidatePath("/");
  revalidatePath(`/accounts/${input.customerId}`);
  return { ok: true };
}
