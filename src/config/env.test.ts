import assert from "node:assert/strict";
import test from "node:test";

import { parseLocalConfig } from "./env.js";

const validConfig = {
  TIMEZONE: "America/Argentina/Buenos_Aires",
  OLLAMA_BASE_URL: "http://host.docker.internal:11434",
  OLLAMA_CHAT_MODEL: "qwen3.5:9b",
  OLLAMA_EMBEDDING_MODEL: "nomic-embed-text:v1.5",
  QDRANT_URL: "http://host.docker.internal:6333",
  QDRANT_COLLECTION: "consultora_knowledge_v1",
  QDRANT_VECTOR_SIZE: "768",
};

test("acepta la configuración local acordada", () => {
  const config = parseLocalConfig(validConfig);

  assert.equal(config.QDRANT_VECTOR_SIZE, 768);
});

test("rechaza una dimensión incompatible con el modelo de embeddings", () => {
  assert.throws(() => parseLocalConfig({ ...validConfig, QDRANT_VECTOR_SIZE: "1024" }));
});
