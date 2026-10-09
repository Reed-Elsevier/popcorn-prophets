import "server-only";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import {
  embed,
  embedMany,
  generateText,
  Output,
  stepCountIs,
  type EmbeddingModel,
  type LanguageModel,
  type ModelMessage,
  type ToolSet,
} from "ai";
import type { z } from "zod";
import { env } from "@/env";

function bedrock() {
  return createAmazonBedrock({
    apiKey: env.AWS_BEARER_TOKEN_BEDROCK || undefined,
    region: env.AWS_REGION,
    credentialProvider: fromNodeProviderChain(),
  });
}

/** Provider is switched by AI_PROVIDER / AI_MODEL. All AI calls go through this module. */
export function getModel(id: string = env.AI_MODEL): LanguageModel {
  switch (env.AI_PROVIDER) {
    case "openai-compatible":
      return createOpenAICompatible({
        name: "custom",
        baseURL: env.AI_BASE_URL ?? "",
        apiKey: env.AI_API_KEY,
      }).chatModel(id);
    default:
      return bedrock()(id);
  }
}

/**
 * Zod-validated structured output. Each attempt is capped at AI_TIMEOUT_MS; on failure it
 * retries once with AI_FALLBACK_MODEL (if set) so one slow or bad call doesn't kill a demo.
 */
export async function generateStructured<T extends z.ZodType>(
  schema: T,
  prompt: string,
  system?: string,
): Promise<z.infer<T>> {
  const ids = [env.AI_MODEL, env.AI_FALLBACK_MODEL].filter((id): id is string => !!id);
  let lastError: unknown;
  for (const id of ids) {
    try {
      const { output } = await generateText({
        model: getModel(id),
        system,
        prompt,
        output: Output.object({ schema }),
        abortSignal: AbortSignal.timeout(env.AI_TIMEOUT_MS),
      });
      return output as z.infer<T>;
    } catch (err) {
      lastError = err;
      console.warn(`[ai] ${id} failed:`, err instanceof Error ? err.message : err);
    }
  }
  throw lastError;
}

/** Tool-calling text generation (multi-step). Same model/timeout/fallback policy as generateStructured. */
export async function generateWithTools(opts: {
  system: string;
  messages: ModelMessage[];
  tools: ToolSet;
  maxSteps?: number;
}) {
  const ids = [env.AI_MODEL, env.AI_FALLBACK_MODEL].filter((id): id is string => !!id);
  let lastError: unknown;
  for (const id of ids) {
    try {
      return await generateText({
        model: getModel(id),
        system: opts.system,
        messages: opts.messages,
        tools: opts.tools,
        stopWhen: stepCountIs(opts.maxSteps ?? 6),
        maxRetries: 6, // Bedrock throttles shared keys; backoff is exponential
        abortSignal: AbortSignal.timeout(env.AI_TIMEOUT_MS * 8),
      });
    } catch (err) {
      lastError = err;
      console.warn(`[ai] ${id} failed:`, err instanceof Error ? err.message : err);
    }
  }
  throw lastError;
}

function getEmbeddingModel(): EmbeddingModel {
  const id = env.AI_EMBEDDING_MODEL;
  if (!id) throw new Error("Set AI_EMBEDDING_MODEL to use embeddings");
  if (env.AI_PROVIDER === "openai-compatible")
    return createOpenAICompatible({
      name: "custom",
      baseURL: env.AI_BASE_URL ?? "",
      apiKey: env.AI_API_KEY,
    }).embeddingModel(id);
  return bedrock().embedding(id);
}

/** Embed one string (for pgvector queries). */
export async function embedText(value: string): Promise<number[]> {
  const { embedding } = await embed({ model: getEmbeddingModel(), value });
  return embedding;
}

/** Embed many strings (for indexing). */
export async function embedTexts(values: string[]): Promise<number[][]> {
  const { embeddings } = await embedMany({ model: getEmbeddingModel(), values });
  return embeddings;
}
