# FIN-C03 — Supabase JWT y principal

**SCAFFOLD CONCEPTUAL / NOT_STARTED / NOT_EXECUTED.** [Campaña original](../../campaigns/03-supabase-jwt-y-principal.md). Leer [factory](../../factory/00-README.md), [pipeline](../../factory/01-PIPELINE.md), [léxico](../../factory/02-LEXICO.md), [ADTC](../../factory/03-TRACE-OBSERVABILITY.md), [producto](../../factory/04-PRODUCTO-FINANZAS.md) y N−1/N/N+1.

## Objetivo
Construir/verificar supabase jwt y principal para Finanzas empresariales, tesorería y FP&A, preservando: JWT válido sin membresía/scope no autoriza; no user_metadata/default.

## Alcance y contrato propuestos
Campos/refs a resolver: sub, tenant_id, membership, resourceACL, capability. Operación interna o capacidad nominada propuesta `auth.verify`; no se expone por defecto como endpoint/tool si es tarea de baseline/administración.

Operación: `auth.verify`; campos: `sub, tenant_id, membership, resourceACL, capability`; fuentes: H01, S01, S02, P01; dependencias: FIN-C02.

## Invariante
JWT válido sin membresía/scope no autoriza; no user_metadata/default

## Tareas de diseño existentes
- **FIN-C03-T01 Congelar fuentes, ámbito y autoridad:** Cotejar sub, tenant_id, membership, resourceACL, capability con originales, contrato del tenant y versiones de fuente/proveedor. Registrar qué es hecho, declaración, inferencia o desconocido; revisar alcance territorial/temporal y reglas del módulo. **Aceptación prevista:** AuthorityMap y fixture explícitos; JWT válido sin membresía/scope no autoriza; no user_metadata/default. La ausencia de fuente genera pendiente, no un valor plausible.
- **FIN-C03-T02 Definir DTO y frontera de datos:** Diseñar esquema runtime para sub, tenant_id, membership, resourceACL, capability: tipos, límites, IDs opacos, enums, fechas y versión. Conservar los campos nativos aplicables y declarar nuevos los del servicio. Aislar tenant/proyecto/recurso y minimizar PII. **Aceptación prevista:** Round-trip y rechazo de extra/valor inválido; referencias cruzadas no son posibles; source/actor/updatedAt y EvidenceRef preservados donde correspondan.
- **FIN-C03-T03 Aplicar lógica determinista y revisión:** Implementar o documentar el paso `auth.verify` mediante guards, estados y expectedVersion/CAS. Separar propuesta del modelo de cálculo/decisión verificables. Money con Decimal y currency/exponente; signos de ingreso/gasto/debe/haber explícitos por fuente. CashPosition suma saldos verificados de la misma fecha/moneda o muestra FX fuente/fecha separado. Variance = actual − budget con convención declarada; runway solo con burn definido/ventana y escenarios. Prohibir eval de fórmulas del agente; DSL de cálculo con DAG/unidades/versiones y pruebas de propiedades. **Aceptación prevista:** El estado final, el protegido y los motivos de bloqueo son comprobables; TokenA con recursoB falla sin revelar metadatos. No eval/SQL/shell/HTTP genérico del LLM.
- **FIN-C03-T04 Adaptar con permisos mínimos:** Comprobar versión/edición/ACL de backend si esta fase lo usa; fields/métodos allowlist y binding de servidor. Si es fase local/documental no añadir HTTP. Normalizar errores y limitar IO/tamaño/tiempo/coste de `auth.verify`. **Aceptación prevista:** Unknown/unsupported/forbidden no se simulan como éxito; cero HTTP con principal o conexión no autorizados; prueba fake no habilita capability real.
- **FIN-C03-T05 Vincular autorización y efectos:** Crear preview sin efecto remoto, diff/hash de datos y revisión; identificar quién acepta el resultado y quién puede ejecutar. Si hay efecto, exigir policy/approval/mandato vigentes y un único intent durable con idempotency key. **Aceptación prevista:** Cambiar sub o materialidad del payload invalida la autorización aplicable. Replay igual no duplica; distinto contenido con misma key da conflicto.
- **FIN-C03-T06 Ejecutar pruebas de negocio y fallo:** Preparar y ejecutar caso específico: TokenA con recursoB falla sin revelar metadatos. Añadir A/B/P, humano/agente/colaborador, revocación, dato sin fuente, cambio concurrente y crash pertinente a `auth.verify`. Verificar ausencia de efectos prohibidos: Forecast o saldo mezclan monedas/fechas, o una propuesta termina en pago sin mandato explícito. **Aceptación prevista:** El contrato estricto exige resultado correcto y trayectoria segura. Test fallido crítico bloquea; sin entorno se registra NOT_VERIFIED, nunca PASS por un mock.
- **FIN-C03-T07 Registrar evidencia y cerrar gate:** Guardar SHA/diff, versiones, fixture antes/después, actor/mandato/correlación, fuentes y receipts mínimos. Registrar tests reales y coste/latencia cuando existan. Actualizar riesgos, rollback y siguiente dependencia sin escribir en agente. **Aceptación prevista:** EVIDENCE/TESTS/RISKS y decisión de gate revisables; ninguna cifra, firma, actividad o integración inventadas. Mantener fuera del repo público PII, credenciales y originales restringidos.

## Gates aún no ejecutados
- FIN-C03-G01: TokenA con recursoB falla sin revelar metadatos — Resultado y estado protegido coherentes con invariante, revisión/receipt donde correspondan.
- FIN-C03-G02: Principal/mandato inválido, recurso o conexión de otro tenant, o versión cambiada intenta auth.verify. — Fail-closed antes de leer/actuar remotamente; sin fuga o ampliación de scope, con intento auditado.

## Próxima fase, no hacer ahora
Después de meta-auditoría conceptual y reconciliación: patchsets por archivo, handoffs propios Freebuff/Codex/Architect+Founder, tests, evidencias y rollback. No afirmar implementación o permisos bancarios. Rollback propuesto: Deshabilitar capacidad o flag y detener efectos nuevos; conservar audit, links, intents, snapshots y receipts. Restore probado con restricciones/supresiones reaplicadas; no borrar efectos remotos para fingir reversión.
