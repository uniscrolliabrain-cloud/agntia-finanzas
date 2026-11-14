# FIN-C06 — Persistencia, RLS y migraciones

**SCAFFOLD CONCEPTUAL / NOT_STARTED / NOT_EXECUTED.** [Campaña original](../../campaigns/06-persistencia-rls-y-migraciones.md). Leer [factory](../../factory/00-README.md), [pipeline](../../factory/01-PIPELINE.md), [léxico](../../factory/02-LEXICO.md), [ADTC](../../factory/03-TRACE-OBSERVABILITY.md), [producto](../../factory/04-PRODUCTO-FINANZAS.md) y N−1/N/N+1.

## Objetivo
Construir/verificar persistencia, rls y migraciones para Finanzas empresariales, tesorería y FP&A, preservando: FK/consultas/roles reales impiden contaminación.

## Alcance y contrato propuestos
Campos/refs a resolver: tenantFK, objectVersion, outbox, audit, idempotency. Operación interna o capacidad nominada propuesta `storage.migrate`; no se expone por defecto como endpoint/tool si es tarea de baseline/administración.

Operación: `storage.migrate`; campos: `tenantFK, objectVersion, outbox, audit, idempotency`; fuentes: H01, S01, S02, P01; dependencias: FIN-C05.

## Invariante
FK/consultas/roles reales impiden contaminación

## Tareas de diseño existentes
- **FIN-C06-T01 Congelar fuentes, ámbito y autoridad:** Cotejar tenantFK, objectVersion, outbox, audit, idempotency con originales, contrato del tenant y versiones de fuente/proveedor. Registrar qué es hecho, declaración, inferencia o desconocido; revisar alcance territorial/temporal y reglas del módulo. **Aceptación prevista:** AuthorityMap y fixture explícitos; FK/consultas/roles reales impiden contaminación. La ausencia de fuente genera pendiente, no un valor plausible.
- **FIN-C06-T02 Definir DTO y frontera de datos:** Diseñar esquema runtime para tenantFK, objectVersion, outbox, audit, idempotency: tipos, límites, IDs opacos, enums, fechas y versión. Conservar los campos nativos aplicables y declarar nuevos los del servicio. Aislar tenant/proyecto/recurso y minimizar PII. **Aceptación prevista:** Round-trip y rechazo de extra/valor inválido; referencias cruzadas no son posibles; source/actor/updatedAt y EvidenceRef preservados donde correspondan.
- **FIN-C06-T03 Aplicar lógica determinista y revisión:** Implementar o documentar el paso `storage.migrate` mediante guards, estados y expectedVersion/CAS. Separar propuesta del modelo de cálculo/decisión verificables. Money con Decimal y currency/exponente; signos de ingreso/gasto/debe/haber explícitos por fuente. CashPosition suma saldos verificados de la misma fecha/moneda o muestra FX fuente/fecha separado. Variance = actual − budget con convención declarada; runway solo con burn definido/ventana y escenarios. Prohibir eval de fórmulas del agente; DSL de cálculo con DAG/unidades/versiones y pruebas de propiedades. **Aceptación prevista:** El estado final, el protegido y los motivos de bloqueo son comprobables; Caída durante commit no deja historia/intención parcial. No eval/SQL/shell/HTTP genérico del LLM.
- **FIN-C06-T04 Adaptar con permisos mínimos:** Comprobar versión/edición/ACL de backend si esta fase lo usa; fields/métodos allowlist y binding de servidor. Si es fase local/documental no añadir HTTP. Normalizar errores y limitar IO/tamaño/tiempo/coste de `storage.migrate`. **Aceptación prevista:** Unknown/unsupported/forbidden no se simulan como éxito; cero HTTP con principal o conexión no autorizados; prueba fake no habilita capability real.
- **FIN-C06-T05 Vincular autorización y efectos:** Crear preview sin efecto remoto, diff/hash de datos y revisión; identificar quién acepta el resultado y quién puede ejecutar. Si hay efecto, exigir policy/approval/mandato vigentes y un único intent durable con idempotency key. **Aceptación prevista:** Cambiar tenantFK o materialidad del payload invalida la autorización aplicable. Replay igual no duplica; distinto contenido con misma key da conflicto.
- **FIN-C06-T06 Ejecutar pruebas de negocio y fallo:** Preparar y ejecutar caso específico: Caída durante commit no deja historia/intención parcial. Añadir A/B/P, humano/agente/colaborador, revocación, dato sin fuente, cambio concurrente y crash pertinente a `storage.migrate`. Verificar ausencia de efectos prohibidos: Forecast o saldo mezclan monedas/fechas, o una propuesta termina en pago sin mandato explícito. **Aceptación prevista:** El contrato estricto exige resultado correcto y trayectoria segura. Test fallido crítico bloquea; sin entorno se registra NOT_VERIFIED, nunca PASS por un mock.
- **FIN-C06-T07 Registrar evidencia y cerrar gate:** Guardar SHA/diff, versiones, fixture antes/después, actor/mandato/correlación, fuentes y receipts mínimos. Registrar tests reales y coste/latencia cuando existan. Actualizar riesgos, rollback y siguiente dependencia sin escribir en agente. **Aceptación prevista:** EVIDENCE/TESTS/RISKS y decisión de gate revisables; ninguna cifra, firma, actividad o integración inventadas. Mantener fuera del repo público PII, credenciales y originales restringidos.

## Gates aún no ejecutados
- FIN-C06-G01: Caída durante commit no deja historia/intención parcial — Resultado y estado protegido coherentes con invariante, revisión/receipt donde correspondan.
- FIN-C06-G02: Principal/mandato inválido, recurso o conexión de otro tenant, o versión cambiada intenta storage.migrate. — Fail-closed antes de leer/actuar remotamente; sin fuga o ampliación de scope, con intento auditado.

## Próxima fase, no hacer ahora
Después de meta-auditoría conceptual y reconciliación: patchsets por archivo, handoffs propios Freebuff/Codex/Architect+Founder, tests, evidencias y rollback. No afirmar implementación o permisos bancarios. Rollback propuesto: Deshabilitar capacidad o flag y detener efectos nuevos; conservar audit, links, intents, snapshots y receipts. Restore probado con restricciones/supresiones reaplicadas; no borrar efectos remotos para fingir reversión.
