# FIN-C06 — Persistencia, RLS y migraciones

**DESIGN_ONLY · NOT_STARTED · 6/42.** [Campaña original](../../../campaigns/06-persistencia-rls-y-migraciones.md). Este programa no demuestra implementación.

## Objetivo y límites
Construir/verificar persistencia, rls y migraciones para Finanzas empresariales, tesorería y FP&A, preservando: FK/consultas/roles reales impiden contaminación.

**Operación propuesta:** `storage.migrate`. **Campos:** tenantFK, objectVersion, outbox, audit, idempotency. **Invariante:** FK/consultas/roles reales impiden contaminación. **Depende de:** FIN-C05.

## Archivos y ownership propuestos
- Superficie primaria: `packages/db/migrations/001_init.sql` (verificar checkout; no asumir archivo existente).
- DTO Zod: `packages/contracts/src/06.ts` si procede.
- API Hono: `apps/api/src/routes/06.ts` solo para capability explícita.
- Tests: `tests/campaigns/006.test.ts`, fixtures `tests/fixtures/006/`.
- Artefactos originales: `docs/implementation/c06/README.md`, `docs/implementation/c06/EVIDENCE.md`, `docs/implementation/c06/TESTS.md`, `docs/implementation/c06/RISKS.md`.
- Reporte Freebuff dentro de este CAMPAIGN.md; evidencias extendidas en docs/implementation/c06/.

## Patchsets secuenciales
### 006.01 — FIN-C06-T01: Congelar fuentes, ámbito y autoridad
**Acción:** Cotejar tenantFK, objectVersion, outbox, audit, idempotency con originales, contrato del tenant y versiones de fuente/proveedor. Registrar qué es hecho, declaración, inferencia o desconocido; revisar alcance territorial/temporal y reglas del módulo.

**Implementación primaria:** `packages/db/migrations/001_init.sql`. Separar dominio, esquema, adaptador y tests cuando corresponda; justificar cada ruta creada. No introducir endpoints para investigación documental.

**Aceptación:** AuthorityMap y fixture explícitos; FK/consultas/roles reales impiden contaminación. La ausencia de fuente genera pendiente, no un valor plausible.

**Dependencias:** inicio. **Pruebas:** fixture positivo, tenant ajeno, principal sin mandato, input/moneda/fecha inválidos, replay, concurrencia y timeout/rollback cuando haya efectos. Guardar SHA, diff, comandos y resultados.

### 006.02 — FIN-C06-T02: Definir DTO y frontera de datos
**Acción:** Diseñar esquema runtime para tenantFK, objectVersion, outbox, audit, idempotency: tipos, límites, IDs opacos, enums, fechas y versión. Conservar los campos nativos aplicables y declarar nuevos los del servicio. Aislar tenant/proyecto/recurso y minimizar PII.

**Implementación primaria:** `packages/db/migrations/001_init.sql`. Separar dominio, esquema, adaptador y tests cuando corresponda; justificar cada ruta creada. No introducir endpoints para investigación documental.

**Aceptación:** Round-trip y rechazo de extra/valor inválido; referencias cruzadas no son posibles; source/actor/updatedAt y EvidenceRef preservados donde correspondan.

**Dependencias:** FIN-C06-T01. **Pruebas:** fixture positivo, tenant ajeno, principal sin mandato, input/moneda/fecha inválidos, replay, concurrencia y timeout/rollback cuando haya efectos. Guardar SHA, diff, comandos y resultados.

### 006.03 — FIN-C06-T03: Aplicar lógica determinista y revisión
**Acción:** Implementar o documentar el paso `storage.migrate` mediante guards, estados y expectedVersion/CAS. Separar propuesta del modelo de cálculo/decisión verificables. Money con Decimal y currency/exponente; signos de ingreso/gasto/debe/haber explícitos por fuente. CashPosition suma saldos verificados de la misma fecha/moneda o muestra FX fuente/fecha separado. Variance = actual − budget con convención declarada; runway solo con burn definido/ventana y escenarios. Prohibir eval de fórmulas del agente; DSL de cálculo con DAG/unidades/versiones y pruebas de propiedades.

**Implementación primaria:** `packages/db/migrations/001_init.sql`. Separar dominio, esquema, adaptador y tests cuando corresponda; justificar cada ruta creada. No introducir endpoints para investigación documental.

**Aceptación:** El estado final, el protegido y los motivos de bloqueo son comprobables; Caída durante commit no deja historia/intención parcial. No eval/SQL/shell/HTTP genérico del LLM.

**Dependencias:** FIN-C06-T02. **Pruebas:** fixture positivo, tenant ajeno, principal sin mandato, input/moneda/fecha inválidos, replay, concurrencia y timeout/rollback cuando haya efectos. Guardar SHA, diff, comandos y resultados.

### 006.04 — FIN-C06-T04: Adaptar con permisos mínimos
**Acción:** Comprobar versión/edición/ACL de backend si esta fase lo usa; fields/métodos allowlist y binding de servidor. Si es fase local/documental no añadir HTTP. Normalizar errores y limitar IO/tamaño/tiempo/coste de `storage.migrate`.

**Implementación primaria:** `packages/db/migrations/001_init.sql`. Separar dominio, esquema, adaptador y tests cuando corresponda; justificar cada ruta creada. No introducir endpoints para investigación documental.

**Aceptación:** Unknown/unsupported/forbidden no se simulan como éxito; cero HTTP con principal o conexión no autorizados; prueba fake no habilita capability real.

**Dependencias:** FIN-C06-T03. **Pruebas:** fixture positivo, tenant ajeno, principal sin mandato, input/moneda/fecha inválidos, replay, concurrencia y timeout/rollback cuando haya efectos. Guardar SHA, diff, comandos y resultados.

### 006.05 — FIN-C06-T05: Vincular autorización y efectos
**Acción:** Crear preview sin efecto remoto, diff/hash de datos y revisión; identificar quién acepta el resultado y quién puede ejecutar. Si hay efecto, exigir policy/approval/mandato vigentes y un único intent durable con idempotency key.

**Implementación primaria:** `packages/db/migrations/001_init.sql`. Separar dominio, esquema, adaptador y tests cuando corresponda; justificar cada ruta creada. No introducir endpoints para investigación documental.

**Aceptación:** Cambiar tenantFK o materialidad del payload invalida la autorización aplicable. Replay igual no duplica; distinto contenido con misma key da conflicto.

**Dependencias:** FIN-C06-T04. **Pruebas:** fixture positivo, tenant ajeno, principal sin mandato, input/moneda/fecha inválidos, replay, concurrencia y timeout/rollback cuando haya efectos. Guardar SHA, diff, comandos y resultados.

### 006.06 — FIN-C06-T06: Ejecutar pruebas de negocio y fallo
**Acción:** Preparar y ejecutar caso específico: Caída durante commit no deja historia/intención parcial. Añadir A/B/P, humano/agente/colaborador, revocación, dato sin fuente, cambio concurrente y crash pertinente a `storage.migrate`. Verificar ausencia de efectos prohibidos: Forecast o saldo mezclan monedas/fechas, o una propuesta termina en pago sin mandato explícito.

**Implementación primaria:** `packages/db/migrations/001_init.sql`. Separar dominio, esquema, adaptador y tests cuando corresponda; justificar cada ruta creada. No introducir endpoints para investigación documental.

**Aceptación:** El contrato estricto exige resultado correcto y trayectoria segura. Test fallido crítico bloquea; sin entorno se registra NOT_VERIFIED, nunca PASS por un mock.

**Dependencias:** FIN-C06-T05. **Pruebas:** fixture positivo, tenant ajeno, principal sin mandato, input/moneda/fecha inválidos, replay, concurrencia y timeout/rollback cuando haya efectos. Guardar SHA, diff, comandos y resultados.

### 006.07 — FIN-C06-T07: Registrar evidencia y cerrar gate
**Acción:** Guardar SHA/diff, versiones, fixture antes/después, actor/mandato/correlación, fuentes y receipts mínimos. Registrar tests reales y coste/latencia cuando existan. Actualizar riesgos, rollback y siguiente dependencia sin escribir en agente.

**Implementación primaria:** `packages/db/migrations/001_init.sql`. Separar dominio, esquema, adaptador y tests cuando corresponda; justificar cada ruta creada. No introducir endpoints para investigación documental.

**Aceptación:** EVIDENCE/TESTS/RISKS y decisión de gate revisables; ninguna cifra, firma, actividad o integración inventadas. Mantener fuera del repo público PII, credenciales y originales restringidos.

**Dependencias:** FIN-C06-T06. **Pruebas:** fixture positivo, tenant ajeno, principal sin mandato, input/moneda/fecha inválidos, replay, concurrencia y timeout/rollback cuando haya efectos. Guardar SHA, diff, comandos y resultados.


## Wiring transversal
JWT Supabase+membresía → originTenant/targetTenant y mandato del twin → ACL cuentas/periodos → Zod DTO → policy/AuthorityMap → Decimal Money/currency+fecha+fuente → FSM+expectedVersion+approval → Postgres RLS+audit/outbox → worker scoped → adaptador tipado read-only salvo permiso explícito → receipt/reconciliación → bridge padre. No pagos ni transferencias reales; una propuesta de pago no es una orden ejecutable. DSL de fórmulas sin eval; no sumar monedas ni fechas incompatibles, no inventar FX, saldos o forecasts.

## Gates de aceptación
- **FIN-C06-G01 / NOT_EXECUTED:** Caída durante commit no deja historia/intención parcial. **Esperado:** Resultado y estado protegido coherentes con invariante, revisión/receipt donde correspondan.
- **FIN-C06-G02 / NOT_EXECUTED:** Principal/mandato inválido, recurso o conexión de otro tenant, o versión cambiada intenta storage.migrate.. **Esperado:** Fail-closed antes de leer/actuar remotamente; sin fuga o ampliación de scope, con intento auditado.

**Bloqueos:** Cross-tenant o secretos expuestos; Approval/mandato/scope ampliados sin autorización; Pérdida de historia o duplicación tras timeout; Conclusión sensible sin fuentes/revisión competente.

**Rollback:** Deshabilitar capacidad o flag y detener efectos nuevos; conservar audit, links, intents, snapshots y receipts. Restore probado con restricciones/supresiones reaplicadas; no borrar efectos remotos para fingir reversión.

## Reporte Freebuff — completar al terminar
Estado: PENDING. SHA: PENDING. Archivos/diff: PENDING. Tests/fixtures: PENDING. Gates: PENDING. Incoherencias/decisiones: PENDING. Riesgos/deuda: PENDING. Aprendizajes para siguientes campañas: PENDING. Continuar autónomamente; Codex audita después de C42.
