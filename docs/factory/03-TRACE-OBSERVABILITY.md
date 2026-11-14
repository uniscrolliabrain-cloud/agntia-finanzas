# ADTC — Causalidad, IDs y observabilidad multitenant

**Contrato conceptual v0.1; NO API implementada.** El bus empresarial canónico pertenece al padre. Ciberseguridad será consumidor/proyector de observabilidad transversal de todos los repos y tenants, nunca dependencia síncrona que bloquee pagos o tareas.

## Envelope lógico propuesto
```json
{"schemaVersion":"adtc/0.1","eventId":"unique-event","eventType":"finanzas.payment.proposed","tenantId":"verified-tenant","actorId":"verified-actor","taskId":"task-ref","correlationId":"stable-business-chain","causationId":"parent-event-ref","requestId":"ingress-ref","traceId":"w3c-trace-id","spanId":"current-span-id","idempotencyKey":"effect-specific-key","source":"agntia-finanzas","resourceRefs":["payment-proposal-ref"],"evidenceRefs":["approval-ref"],"payloadRef":"restricted-encrypted-ref"}
```
No confundir con `SystemEvent` nativo: mapping versionado contra código padre.

## Reglas de identidad
Conservar tenant, correlación, actor/delegación y refs en cada salto; nuevo eventId para evento nuevo, causationId apunta a causa, spanId por tramo, attemptId por intento. IdempotencyKey no se regenera por timeout del mismo efecto. Reconciliar `outcome_unknown` antes de cualquier retry. El banco puede devolver identificadores externos que se guardan como `providerTransactionRef` y no sustituyen los IDs canónicos. Dos tenants con la misma cuenta/proveedor no se fusionan sin mandato.

## Seguridad y evidencia
Outbox transaccional, inbox dedupe, DLQ, retry budget, audit append-only, snapshot/version/provenance, RLS y segregación de métricas, logs, spans, archivos, exports y consultas. No emitir IBAN completo, extractos, salarios, credenciales, tokens o PII en el bus o OTel; referencias con ACL/hashes y cifrado. La traza técnica puede muestrearse; los receipts financieros críticos no. Retención, acceso forense y derechos por finalidad y marco aplicable.

## Ejemplo reconstruible
Cliente pide previsión de tesorería → agente padre crea task → Finanzas consulta extractos autorizados → Gestoría aporta obligaciones/nominas autorizadas → cálculo determinista genera forecast → founder/cliente revisa → Finanzas entrega informe → bus padre registra resultado → Ciberseguridad visualiza correlación, costes y fallos sin acceder a datos bancarios sin permiso.

## Diseño negativo
Tenant B no puede inferir balances de A por logs/errores; proveedor timeout no duplica transferencia; approval revocado bloquea worker; cambio de cuenta invalida aprobación; falla de observabilidad no pierde evidencia durable ni detiene negocio; replay forense no ejecuta pagos.
