# Contratos de diseño v1

Propuesta, no API/SDK existente. TypeScript+validación runtime/JSON Schema, extra fields rechazados, límites de tamaño, IDs opacos y enums cerrados. Dinero Decimal string/currency/exponente, fechas ISO con offset y timezone separada. No forzar UUID a IDs del padre o usar float para compromisos monetarios. schemaVersion del servicio es distinto del SystemEvent nativo string1.0.

## Envelope propuesto

```json
{"schemaVersion":1,"operationId":"opaque","tenantId":"server-resolved","actorId":"server-verified","capability":"finanzas.proposal.preview","requestId":"host-if-present","correlationId":"trace","causationId":null,"idempotencyKey":"domain-key","expectedVersion":3,"approvalRef":null,"dryRun":true,"payload":{"resourceId":"opaque"}}
```

Identity/capability del JSON no son prueba; principal/policy las derivan/verifican. Envelope.tenantId es scope de datos, no sustitución del Actor de origen al delegar. Worker con identidad de servicio y DelegationMandate: originatingActor/tenant, targetTenant, WorkOrder/TwinBinding, recursos/campos/capabilities/purpose, budget, issued/expires/revocationVersion/proof. Sin membership implícita o redelegación ampliada.

## Entidades y datos específicos

| Módulo | Campos/refs propuestos | Capacidad nominada interna/propuesta |
|---|---|---|
| Modelo económico y períodos | companyRef, fiscalCalendar, accrualBasis, currency, period | finance.company.preview |
| Ingesta CSV y extractos | sourceFileHash, bankAccountBinding, rowRef, statementDate | finance.import.preview |
| Mapping de cuentas | sourceAccount, localCategory, mappingVersion, reviewer | finance.mapping.propose |
| Hechos monetarios | amountDecimal, currency, signConvention, bookedAt, valueAt | finance.fact.normalize |
| Adaptador ERPNext | siteBinding, companyBinding, docTypeAllowlist, remoteVersion | finance.erp.preview |
| Ledgers Beancount/hledger | journalHash, accountScope, commodity, parserVersion | finance.ledger.preview |
| Fuentes bancarias read-only | providerRef, consentScope, accountId, freshness | finance.bank.read |
| Idempotencia y revisiones | externalIdentity, contentHash, sourceWriteDate, localVersion | finance.sync.stage |
| Conciliación propuesta | candidateMatches, tolerances, currency, evidenceRefs | finance.reconcile.preview |
| Caja y posición | balanceAt, availableBalance, pendingItems, sourceRef | finance.cash.snapshot |
| Cuentas por cobrar | invoiceRef, dueRule, paidEvidence, disputeRef | finance.receivables.read |
| Cuentas por pagar | billRef, approvedLiability, dueAt, paymentState | finance.payables.read |
| Presupuesto versionado | budgetLines, drivers, period, owner, version | finance.budget.propose |
| Motor de fórmulas | expressionAST, units, dependencies, DecimalContext | finance.model.validate |
| Escenarios y supuestos | assumptionRef, effectiveAt, scenarioVersion, source | finance.scenario.propose |
| Forecast de caja | horizon, inflowRules, outflowRules, modelVersion | finance.forecast.run |
| FX y conversiones | fxSource, asOf, baseQuote, triangulationPolicy | finance.fx.preview |
| Variaciones y drivers | actualRef, budgetRef, varianceDefinition, reasonEvidence | finance.variance.explain |
| Unit economics | costAllocation, revenueDefinition, cohort, denominator | finance.unit-economics.run |
| Runway y stress test | burnWindow, cashDefinition, scenarios, liquidityConstraints | finance.stress.run |
| Cierre analítico | checklist, cutoff, unresolvedItems, reviewer, freezeHash | finance.close.propose |
| Workbook y export | formulaGraphHash, cachedValues, editableArtifact, locale | finance.workbook.preview |
| Propuestas de pago | beneficiaryProof, amount, purpose, approvalScope, expiresAt | finance.payment.propose |
| Reporting Metabase o local | queryTemplate, tenantFilters, dashboardBinding, snapshot | finance.dashboard.read |

Estas entidades no son aliases automáticos de modelos del proveedor/padre. Tipos públicos contienen refs mínimos/estado/frescura; secretos y documentos restringidos se custodian por backend con permiso. Estado desconocido, dato no verificado, bloqueado y no soportado son valores explícitos, nunca null ambiguo rellenado por LLM.

## DTOs transversales

EvidenceRef: id, tenantId/resourceScope, originalCustodian, sourceObjectRef/hash, mapperVersion, observed/effectiveAt, kind fact/inference/user_assertion/observation y reviewRef. Cuando proyecte provenance nativa, preservar source/actor/updatedAt/confidence? sin convertir confianza en permiso. ExternalLink: tenant/connection/provider/model/externalId string/localKind/localId, remoteVersion, sourceHash y lastSeenAt.

ProposalRevision: resource/version, structuredInputs, artifacts, sources, pendingFacts, scopeHash, modelConfigRef, policyVersion y warnings. ApprovalBinding: principal/reviewer competente según caso, proofRef, payloadHash/resourceVersion/rightsHash/policyHash, tenant/recipient/channel/costCeiling/expiry/revocation. OperationResult discriminado: status/localRefs/remoteRefs/evidenceRefs/payloadHash/warnings/retryable/reconciliationRequired/actualScope. Nunca payload remoto sensible completo.

CapabilityReport: deployment/edition/version, operaciones/campos/ACL confirmados, timestamp/expiry/errors y evidence. SyncJob/Cursor/Conflict/ReportSnapshot: ámbito tenant/recurso, estado/versión/correlación/sourceWatermark/coverage/hash y resolución revisable. Índices únicos por tenant/capability/key, tenant/connection/model/externalId/localKind y tenant/connection/externalEventId; FK compuestas por tenant para cardinalidades explícitas.

## API nominada prevista

Prefijo `/v1/finanzas`. GET /me, /resources, /resources/{id}, /integrations/{id}/capabilities, /jobs/{id}, /conflicts y /reports/{id}. POST /imports/preview y /imports; /proposals y /proposals/{id}/preview; /intents; /intents/{id}/reconcile; /reports; /advisor-sessions y /advisor-sessions/{id}/close; /privacy-requests. Acciones específicas anteriores se materializan solo si son capacidades de producto autorizadas, no baseline/admin endpoints por defecto.

Lecturas con fields/filters allowlist, paginación y ACL antes de acceso. Commits con key/expectedVersion/approval según riesgo y revalidación. Trabajo largo202+jobId scoped. Dry-run no muta; test endpoint remoto puede tener efecto y requiere su propia autorización. No /provider/{method}, SQL libre, HTTP/ORM/model/domain de búsqueda arbitrario o /execute-anything.

Errores400/422 input/negocio;401auth;403capacidad;404recurso ajeno/inexistente;409versión/key/conflicto;424dependencia si se adopta;429límite;502respuesta inválida;503proveedor;504timeout. Envelope code/message/correlationId/retryable/reconciliationRequired sin traceback/PII/secretos. Resultado incierto no es failed seguro para retry.

## Tools, eventos y compatibilidad

Tools propuestas: `finance_cash_read finance_transaction_preview finance_reconcile_propose finance_budget_propose finance_forecast_explain finance_report_read finance_payment_propose`. Tenant/actor/scopes no son input libre del modelo. Approve/send/export_all/admin y efectos sensibles fuera del catálogo inicial. SDK servidor privado y proxy Hono con allowlist exacta de ruta/método/tamaño; MCP/Anam usan mismo PEP. No anunciar paquete npm/pip publicado por este documento.

Eventos nuevos `finanzas.proposal.created`, `.review.required`, `.resource.changed`, `.operation.confirmed`, `.operation.outcome_unknown`, `.connection.degraded` con id/schemaVersion/tenant/actorRef/occurredAt/correlation/causation y refs mínimas. No enum host inventado; bridge mapea hechos confirmados al SystemEvent nativo con owner/emittedAt/source permitido. Outbox/inbox/receipt dan entrega at-least-once y ACK posterior al commit, no garantía de exactly-once HTTP.
