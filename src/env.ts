import { z } from "zod";

// Lenient on purpose: missing vars never crash boot; features check what they need.
const schema = z.object({
  DATABASE_URL: z.string().default("file:./app.db"),
  AI_PROVIDER: z.enum(["bedrock", "openai-compatible"]).default("bedrock"),
  AI_MODEL: z.string().default("us.anthropic.claude-sonnet-4-20250514-v1:0"),
  AI_FALLBACK_MODEL: z.string().optional(),
  AI_TIMEOUT_MS: z.coerce.number().default(30000),
  AI_EMBEDDING_MODEL: z.string().optional(),
  AI_BASE_URL: z.string().optional(),
  AWS_BEARER_TOKEN_BEDROCK: z.string().optional(),
  AWS_REGION: z.string().default("us-east-1"),
  AI_API_KEY: z.string().optional(),
  BETTER_AUTH_SECRET: z.string().optional(),
  BETTER_AUTH_URL: z.string().optional(),
});

export const env = schema.parse(process.env);
