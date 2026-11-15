# Bridge propuesto con `agente` (padre)

Estado: **diseño**. No se ha modificado el padre, no se ha instalado nada en él y
no existe SDK publicado. Cualquier cambio en `uniscrolliabrain-cloud/agente`
requiere un encargo separado.

## Principio

El agente canónico y su rota viven en el padre. Este repositorio expone
capacidades nominadas y un twin con mandato acotado. El parent conserva
identidad, approvals, budget y organización; aquí se resuelve trabajo, estado y
eventos del dominio financiero.

## Puertos que este servicio necesitaría del padre

| Puerto | Uso | Estado |
|---|---|---|
| Identidad/delegación | resolver `runtimeId`/`personaId` y emitir `TwinBinding` firmado | NOT_VERIFIED |
| Approvals | verificar `ApprovalBinding` de un humano competente | NOT_VERIFIED |
| Budget | reservar/consumir presupuesto por operación | NOT_VERIFIED |
| Tasks/eventos | ofrecer trabajo y recibir ACK | NOT_VERIFIED |
| Organización | membership del operador y del tenant cliente | NOT_VERIFIED |

Si falta un puerto se registra `HOST_BRIDGE_NOT_VERIFIED` y la capacidad queda
deshabilitada; no se crea una aprobación o un runtime paralelo.

## Contrato de entrada (propuesto)

`POST /v1/finanzas/intents` con `OperationEnvelope`:

- `tenantId`/`actorId`/`capability` del cuerpo **no** son prueba: el servidor los deriva del JWT/mandato y compara.
- `idempotencyKey` obligatoria para efectos; mismo key + payload distinto → `409 idempotency_conflict`.
- `dryRun: true` por defecto y sin efecto remoto.

## Contrato de salida

`OperationResult` discriminado: `accepted | confirmed | outcome_unknown | failed_definitive | reconciliation_required`.
Nunca incluye payload remoto sensible; sólo refs opacas, hashes y evidencia.

## Eventos

Tipos propuestos del servicio: `finanzas.proposal.created`, `.review.required`,
`.resource.changed`, `.operation.confirmed`, `.operation.outcome_unknown`,
`.connection.degraded`.

El bridge los proyecta a `SystemEvent` nativo sólo si el padre los admite:
`id`, `schemaVersion: "1.0"`, `tenantId`, `owner`, `emittedAt`,
`source.kind/id/personaId?` y tipo permitido. No se inventan enums ni se emite
"actividad realizada" sin receipt. Dedup durable por `domainEventId`; ACK
después del commit receptor, nunca exactly-once HTTP.

## Tools expuestas al modelo

`finance_cash_read`, `finance_transaction_preview`, `finance_reconcile_propose`,
`finance_budget_propose`, `finance_forecast_explain`, `finance_report_read`,
`finance_payment_propose`.

Tenant/actor/scopes no son parámetros libres del modelo. Aprobaciones, envíos,
`export_all`, admin y cualquier efecto sensible quedan fuera del catálogo
inicial (`FORBIDDEN_TOOL_PREFIXES`).

## Integración pendiente

- Prueba de firma/rotación del `TwinBinding` real.
- Verificación de `ApprovalBinding` con aprobador humano del padre.
- Revalidación de mandato en cola con revocación en vuelo.
- Handoff `offered → acknowledged → working → completed/returned` con ACK real.
- Nada de esto se declara ejecutado: los tests actuales cubren contratos y PEP local.
