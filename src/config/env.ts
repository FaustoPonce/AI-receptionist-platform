import { z } from "zod";

export const localConfigSchema = z.object({
  TIMEZONE: z.literal("America/Argentina/Buenos_Aires"),
  OLLAMA_BASE_URL: z.string().url(),
  OLLAMA_CHAT_MODEL: z.literal("qwen3.5:9b"),
  OLLAMA_EMBEDDING_MODEL: z.literal("nomic-embed-text:v1.5"),
  QDRANT_URL: z.string().url(),
  QDRANT_COLLECTION: z.string().min(1).max(255),
  QDRANT_VECTOR_SIZE: z.coerce.number().int().positive().refine((size) => size === 768, {
    message: "QDRANT_VECTOR_SIZE debe coincidir con nomic-embed-text:v1.5 (768).",
  }),
});

export type LocalConfig = z.infer<typeof localConfigSchema>;

export function parseLocalConfig(input: Record<string, string | undefined>): LocalConfig {
  return localConfigSchema.parse(input);
}
