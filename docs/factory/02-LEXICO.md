# Léxico canónico y financiero

**v0.1 conceptual — verificar contratos padre por SHA antes de integración.**

## Identidad y causalidad
`tenantId` = ámbito de empresa, no `owner`, `sub` o `actorId`; `HumanActor` y `AgentActor` pertenecen al padre, con `runtimeId`, `roleId`, `personaId` de semántica distinta. `TwinBinding`, `DelegationMandate`, `AuthorityMap` = propuestas del servicio. `Task` ≠ `SOP` ≠ `Action` ≠ `Approval` ≠ `Event`. `correlationId` = cadena de negocio; `causationId` = evento padre; `eventId` = evento único; `traceId`/`spanId` = telemetría; `requestId` = entrada; `idempotencyKey` = efecto lógico, no workflow; `schemaVersion` específico de contrato. No modificar `SystemEvent` nativo por conjetura.

## Finanzas
`FinancialSource` = banco/ERP/archivo original; `TransactionFact` = hecho monetario con procedencia; `AccountMapping` = clasificación versionada, no asiento oficial; `LedgerProjection` = vista derivada, no libro legal; `ReconciliationProposal` = conciliación propuesta, no contabilizada; `CashPosition` = saldo/posición observada con freshness; `BudgetVersion` = presupuesto; `ForecastRun` = proyección con supuestos; `Scenario` = alternativa hipotética; `Receivable`/`Payable` = derechos/obligaciones según fuente; `PaymentProposal` = propuesta, NO orden ejecutada; `PaymentIntent` = intención aprobada sujeta a proveedor regulado; `PaymentReceipt` = evidencia externa, no inferencia LLM; `PayrollCostProjection` = proyección financiera de nómina, no nómina oficial; `FinancialEducationBrief` = contenido educativo, no asesoría de inversión personalizada. Estos últimos son **PROPOSED**.

`bookedBalance` ≠ `availableBalance` ≠ `forecastBalance`; `paymentApproved` ≠ `paymentSubmitted` ≠ `paymentSettled`; `invoiceIssued` ≠ `receivablePaid`; `salaryCalculated` ≠ `salaryTransferred`. Importes Decimal string, ISO currency, timezone, sign convention, precisión y rounding; FX observado con timestamp y fuente; versiones de cálculo y escenarios. No inventar valores desconocidos ni confundir una estimación con dinero real.

## Autoridad
Banco/ERP conserva hechos originales; Finanzas custodia análisis y planificación; Gestoría+RRHH nóminas, gestión laboral, contabilidad/fiscalidad según autoridad por operación; Ventas puede iniciar cobros Stripe; no hay doble ejecución. Adaptadores Qonto/BBVA no implican PSD2/licencia ni permiso de pago. Datos bancarios y nóminas son altamente sensibles: minimización, finalidad, ACL por campo y auditoría.
