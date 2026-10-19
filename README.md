# AI Receptionist Platform

Recepcionista IA de demostración para una consultora ficticia: responde consultas de WhatsApp con evidencia de Google Drive, ofrece disponibilidad real de Calendar y registra la conversación en HubSpot.

La interpretación de lenguaje se hace con Ollama, pero las operaciones de Calendar se validan de forma determinista y requieren una propuesta vigente antes de generar un efecto externo.

## Desarrollo local

Requisitos: Node 22, Docker Desktop, Ollama con `qwen3.5:9b` y `nomic-embed-text:v1.5`.

```powershell
npm install
docker compose up -d
npm run check
```

Qdrant queda disponible solo en `http://127.0.0.1:6333`. Desde el contenedor existente de n8n se usa como `http://host.docker.internal:6333`.

## Workflows de n8n

Los exports públicos y saneados están en [`workflows/exports/`](workflows/exports/). Reflejan los siete workflows activos del recepcionista y se importan inactivos deliberadamente. No contienen credenciales, tokens, IDs de Data Tables o subworkflows, calendarios, teléfonos, datos de ejecución ni estado de conversaciones.

La guía de importación y el rol de cada export están en [`workflows/README.md`](workflows/README.md). Los originales de trabajo pertenecen a `workflows/private/`, que Git ignora.
