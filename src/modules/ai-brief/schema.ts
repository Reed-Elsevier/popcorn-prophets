import { z } from "zod";

export const briefSchema = z.object({
  summary: z.string().describe("2-3 sentence summary of why this account is at risk"),
  likely_driver: z.string().describe("Single most likely churn driver"),
  evidence: z
    .array(
      z.object({
        type: z.enum(["case", "usage"]),
        id: z.string().describe("case_id, or usage month as YYYY-MM"),
        claim: z.string().describe("What this record shows"),
      }),
    )
    .describe("Every claim must cite a case_id or usage month from the input"),
  actions: z
    .array(z.object({ label: z.string(), rationale: z.string() }))
    .describe("2-3 next-action options for the CSM"),
  draft_email: z.string().describe("Outreach draft to the customer, using specifics from the input"),
});

export type Brief = z.infer<typeof briefSchema>;
export type BriefResult = {
  brief: Brief;
  source: "ai" | "fallback";
  dropped: number;
  note?: string;
};
