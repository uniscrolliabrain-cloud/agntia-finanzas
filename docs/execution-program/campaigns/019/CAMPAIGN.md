# FIN-C19 — Cuentas por cobrar

**DESIGN_ONLY · NOT_STARTED · 19/42.** [Campaña original](../../../campaigns/19-cuentas-por-cobrar.md). Este programa no demuestra implementación.

## Objetivo y límites
Construir/verificar cuentas por cobrar para Finanzas empresariales, tesorería y FP&A, preservando: Factura emitida no equivale ingreso cobrado.

**Operación propuesta:** `finance.receivables.read`. **Campos:** invoiceRef, dueRule, paidEvidence, disputeRef. **Invariante:** Factura emitida no equivale ingreso cobrado. **Depende de:** FIN-C18.

## Archivos y ownership propuestos
- Superficie primaria: `packages/domain/src/receivables.ts` (verificar checkout; no asumir archivo existente).
- DTO Zod: `packages/contracts/src/19.ts` si procede.
- API Hono: `apps/api/src/routes/19.ts` solo para capability explícita.
- Tests: `tests/campaigns/019.test.ts`, fixtures `tests/fixtures/019/`.
- Artefactos originales: `docs/implementation/c19/README.md`, `docs/implementation/c19/EVIDENCE.md`, `docs/implementation/c19/TESTS.md`, `docs/implementation/c19/RISKS.md`.
- Reporte Freebuff dentro de este CAMPAIGN.md; evidencias extendidas en docs/implementation/c19/.

## Patchsets secuenciales
### 019.01 — FIN-C19-T01: Congelar fuentes, ámbito y autoridad
**Acción:** Cotejar invoiceRef, dueRule, paidEvidence, disputeRef con originales, contrato del tenant y versiones de fuente/proveedor. Registrar qué es hecho, declaración, inferencia o desconocido; revisar alcance territorial/temporal y reglas del módulo.

**Implementación primaria:** `packages/domain/src/receivables.ts`. Separar dominio, esquema, adaptador y tests cuando corresponda; justificar cada ruta creada. No introducir endpoints para investigación documental.

**Aceptación:** AuthorityMap y fixture explícitos; Factura emitida no equivale ingreso cobrado. La ausencia de fuente genera pendiente, no un valor plausible.

**Dependencias:** inicio. **Pruebas:** fixture positivo, tenant ajeno, principal sin mandato, input/moneda/fecha inválidos, replay, concurrencia y timeout/rollback cuando haya efectos. Guardar SHA, diff, comandos y resultados.

### 019.02 — FIN-C19-T02: Definir DTO y frontera de datos
**Acción:** Diseñar esquema runtime para invoiceRef, dueRule, paidEvidence, disputeRef: tipos, límites, IDs opacos, enums, fechas y versión. Conservar los campos nativos aplicables y declarar nuevos los del servicio. Aislar tenant/proyecto/recurso y minimizar PII.

**Implementación primaria:** `packages/domain/src/receivables.ts`. Separar dominio, esquema, adaptador y tests cuando corresponda; justificar cada ruta creada. No introducir endpoints para investigación documental.

**Aceptación:** Round-trip y rechazo de extra/valor inválido; referencias cruzadas no son posibles; source/actor/updatedAt y EvidenceRef preservados donde correspondan.

**Dependencias:** FIN-C19-T01. **Pruebas:** fixture positivo, tenant ajeno, principal sin mandato, input/moneda/fecha inválidos, replay, concurrencia y timeout/rollback cuando haya efectos. Guardar SHA, diff, comandos y resultados.

### 019.03 — FIN-C19-T03: Aplicar lógica determinista y revisión
**Acción:** Implementar o documentar el paso `finance.receivables.read` mediante guards, estados y expectedVersion/CAS. Separar propuesta del modelo de cálculo/decisión verificables. Money con Decimal y currency/exponente; signos de ingreso/gasto/debe/haber explícitos por fuente. CashPosition suma saldos verificados de la misma fecha/moneda o muestra FX fuente/fecha separado. Variance = actual − budget con convención declarada; runway solo con burn definido/ventana y escenarios. Prohibir eval de fórmulas del agente; DSL de cálculo con DAG/unidades/versiones y pruebas de propiedades.

**Implementación primaria:** `packages/domain/src/receivables.ts`. Separar dominio, esquema, adaptador y tests cuando corresponda; justificar cada ruta creada. No introducir endpoints para investigación documental.

**Aceptación:** El estado final, el protegido y los motivos de bloqueo son comprobables; Pago parcial y devolución actualizan snapshot sin borrar original. No eval/SQL/shell/HTTP genérico del LLM.

**Dependencias:** FIN-C19-T02. **Pruebas:** fixture positivo, tenant ajeno, principal sin mandato, input/moneda/fecha inválidos, replay, concurrencia y timeout/rollback cuando haya efectos. Guardar SHA, diff, comandos y resultados.

### 019.04 — FIN-C19-T04: Adaptar con permisos mínimos
**Acción:** Comprobar versión/edición/ACL de backend si esta fase lo usa; fields/métodos allowlist y binding de servidor. Si es fase local/documental no añadir HTTP. Normalizar errores y limitar IO/tamaño/tiempo/coste de `finance.receivables.read`.

**Implementación primaria:** `packages/domain/src/receivables.ts`. Separar dominio, esquema, adaptador y tests cuando corresponda; justificar cada ruta creada. No introducir endpoints para investigación documental.

**Aceptación:** Unknown/unsupported/forbidden no se simulan como éxito; cero HTTP con principal o conexión no autorizados; prueba fake no habilita capability real.

**Dependencias:** FIN-C19-T03. **Pruebas:** fixture positivo, tenant ajeno, principal sin mandato, input/moneda/fecha inválidos, replay, concurrencia y timeout/rollback cuando haya efectos. Guardar SHA, diff, comandos y resultados.

### 019.05 — FIN-C19-T05: Vincular autorización y efectos
**Acción:** Crear preview sin efecto remoto, diff/hash de datos y revisión; identificar quién acepta el resultado y quién puede ejecutar. Si hay efecto, exigir policy/approval/mandato vigentes y un único intent durable con idempotency key.

**Implementación primaria:** `packages/domain/src/receivables.ts`. Separar dominio, esquema, adaptador y tests cuando corresponda; justificar cada ruta creada. No introducir endpoints para investigación documental.

**Aceptación:** Cambiar invoiceRef o materialidad del payload invalida la autorización aplicable. Replay igual no duplica; distinto contenido con misma key da conflicto.

**Dependencias:** FIN-C19-T04. **Pruebas:** fixture positivo, tenant ajeno, principal sin mandato, input/moneda/fecha inválidos, replay, concurrencia y timeout/rollback cuando haya efectos. Guardar SHA, diff, comandos y resultados.

### 019.06 — FIN-C19-T06: Ejecutar pruebas de negocio y fallo
**Acción:** Preparar y ejecutar caso específico: Pago parcial y devolución actualizan snapshot sin borrar original. Añadir A/B/P, humano/agente/colaborador, revocación, dato sin fuente, cambio concurrente y crash pertinente a `finance.receivables.read`. Verificar ausencia de efectos prohibidos: Forecast o saldo mezclan monedas/fechas, o una propuesta termina en pago sin mandato explícito.

**Implementación primaria:** `packages/domain/src/receivables.ts`. Separar dominio, esquema, adaptador y tests cuando corresponda; justificar cada ruta creada. No introducir endpoints para investigación documental.

**Aceptación:** El contrato estricto exige resultado correcto y trayectoria segura. Test fallido crítico bloquea; sin entorno se registra NOT_VERIFIED, nunca PASS por un mock.

**Dependencias:** FIN-C19-T05. **Pruebas:** fixture positivo, tenant ajeno, principal sin mandato, input/moneda/fecha inválidos, replay, concurrencia y timeout/rollback cuando haya efectos. Guardar SHA, diff, comandos y resultados.

### 019.07 — FIN-C19-T07: Registrar evidencia y cerrar gate
**Acción:** Guardar SHA/diff, versiones, fixture antes/después, actor/mandato/correlación, fuentes y receipts mínimos. Registrar tests reales y coste/latencia cuando existan. Actualizar riesgos, rollback y siguiente dependencia sin escribir en agente.

**Implementación primaria:** `packages/domain/src/receivables.ts`. Separar dominio, esquema, adaptador y tests cuando corresponda; justificar cada ruta creada. No introducir endpoints para investigación documental.

**Aceptación:** EVIDENCE/TESTS/RISKS y decisión de gate revisables; ninguna cifra, firma, actividad o integración inventadas. Mantener fuera del repo público PII, credenciales y originales restringidos.

**Dependencias:** FIN-C19-T06. **Pruebas:** fixture positivo, tenant ajeno, principal sin mandato, input/moneda/fecha inválidos, replay, concurrencia y timeout/rollback cuando haya efectos. Guardar SHA, diff, comandos y resultados.


## Wiring transversal
JWT Supabase+membresía → originTenant/targetTenant y mandato del twin → ACL cuentas/periodos → Zod DTO → policy/AuthorityMap → Decimal Money/currency+fecha+fuente → FSM+expectedVersion+approval → Postgres RLS+audit/outbox → worker scoped → adaptador tipado read-only salvo permiso explícito → receipt/reconciliación → bridge padre. No pagos ni transferencias reales; una propuesta de pago no es una orden ejecutable. DSL de fórmulas sin eval; no sumar monedas ni fechas incompatibles, no inventar FX, saldos o forecasts.

## Gates de aceptación
- **FIN-C19-G01 / NOT_EXECUTED:** Pago parcial y devolución actualizan snapshot sin borrar original. **Esperado:** Resultado y estado protegido coherentes con invariante, revisión/receipt donde correspondan.
- **FIN-C19-G02 / NOT_EXECUTED:** Principal/mandato inválido, recurso o conexión de otro tenant, o versión cambiada intenta finance.receivables.read.. **Esperado:** Fail-closed antes de leer/actuar remotamente; sin fuga o ampliación de scope, con intento auditado.

**Bloqueos:** Cross-tenant o secretos expuestos; Approval/mandato/scope ampliados sin autorización; Pérdida de historia o duplicación tras timeout; Conclusión sensible sin fuentes/revisión competente.

**Rollback:** Deshabilitar capacidad o flag y detener efectos nuevos; conservar audit, links, intents, snapshots y receipts. Restore probado con restricciones/supresiones reaplicadas; no borrar efectos remotos para fingir reversión.

## Reporte Freebuff — completar al terminar
Estado: PENDING. SHA: PENDING. Archivos/diff: PENDING. Tests/fixtures: PENDING. Gates: PENDING. Incoherencias/decisiones: PENDING. Riesgos/deuda: PENDING. Aprendizajes para siguientes campañas: PENDING. Continuar autónomamente; Codex audita después de C42.
