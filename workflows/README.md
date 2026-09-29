# Workflows de n8n

Los JSON de [`exports/`](exports/) son una versión pública e importable de los workflows activos del recepcionista. Describen nodos, conexiones y expresiones, pero se eliminaron credenciales, tokens, IDs internos, calendarios, teléfonos, datos de ejecución y estado conversacional.

Todos se exportan con `active: false`: importarlos no activa webhooks, tareas ni envíos externos.

## Workflows exportados

| Archivo | Responsabilidad |
| --- | --- |
| `ai-receptionist-receive-whatsapp-messages.json` | Verifica y recibe eventos de WhatsApp; deriva el mensaje al coordinador actual. |
| `ai-receptionist-coordinate-conversation-with-changes.json` | Clasifica intención, conserva el contexto conversacional y delega consultas, agenda, confirmaciones y cambios. |
| `ai-receptionist-query-knowledge.json` | Busca conocimiento de la consultora en Qdrant. |
| `ai-receptionist-generate-schedule-offer.json` | Consulta disponibilidad y crea propuestas temporales de agenda. |
| `ai-receptionist-confirm-booking-or-reschedule.json` | Confirma reservas, reprogramaciones o cancelaciones luego de una aprobación explícita. |
| `ai-receptionist-manage-meeting-changes.json` | Encuentra la reunión a modificar o cancelar y prepara la propuesta correspondiente. |
| `ai-receptionist-log-commercial-interaction.json` | Registra la interacción comercial en HubSpot. |
| `ai-receptionist-coordinate-conversation.json` | Versión anterior del coordinador que continúa activa en la instancia actual. |
| `ai-receptionist-confirm-and-book-meeting.json` | Camino anterior de confirmación y reserva que continúa activo en la instancia actual. |

## Importación segura

1. Crear una carpeta o proyecto propio en n8n.
2. Crear las Data Tables vacías que vaya a usar la instancia. El estado de pruebas no se exporta.
3. Importar los JSON; quedarán inactivos.
4. Volver a seleccionar cada Data Table, calendario y subworkflow marcado con un placeholder como `<SELECT_DATA_TABLE_ID>`, `<SELECT_CALENDAR>` o `<SELECT_IMPORTED_WORKFLOW>`.
5. Crear y asignar manualmente las credenciales de Google Calendar, WhatsApp Cloud API, HubSpot y Google Drive.
6. Configurar Ollama, Qdrant y las variables `META_WEBHOOK_VERIFY_TOKEN` y `META_APP_SECRET` en el entorno local de n8n.
7. Revisar el path del webhook y las URLs antes de activarlo; no reutilizar los de otra instancia.
8. Probar cada camino con datos seguros y publicar solo después de verificar la ejecución completa.

## Límites del export

- No incluye credenciales, autorizaciones OAuth ni secretos.
- No incluye contactos, reuniones, ejecuciones, logs ni filas de Data Tables.
- No incluye la configuración de Docker ni la base de datos de n8n.
- Los valores de `workflows/private/` quedan fuera del repositorio.
