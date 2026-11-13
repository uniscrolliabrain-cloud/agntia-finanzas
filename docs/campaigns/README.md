# Campaña de42 fases

Diseño para una implementación futura autorizada. **42 campañas,294 tareas,84 escenarios, NOT_STARTED/NOT_EXECUTED.** No plazo ficticio de siete días. No modificar agente. Fuentes/contratos no equivalen a capacidades probadas.

[Manifest estructurado](campaign.json): IDs/dependencias, campos, operaciones, invariantes, tareas/aceptación, gates, bloqueos y rollback. Rutas de artefactos son propuestas, no archivos existentes.

C01–C08 fundaciones; C09–C32 dominio; C33–C42 exposición/servicio/seguridad/operaciones/aceptación. Avance por gates con capacidades no verificadas deshabilitadas; un fake no pasa gate real. Checkpoints cada 5 y al final de 2.

| Fase | Documento | Estado | Checkpoint |
|---|---|---|---|
| 01 | [Baseline, fuentes y alcance](01-baseline-fuentes-y-alcance.md) | NOT_STARTED | — |
| 02 | [Autoridad por dominio y contrato SaaS](02-autoridad-por-dominio-y-contrato-saas.md) | NOT_STARTED | — |
| 03 | [Supabase JWT y principal](03-supabase-jwt-y-principal.md) | NOT_STARTED | — |
| 04 | [Twins y nomenclatura canónica](04-twins-y-nomenclatura-canonica.md) | NOT_STARTED | — |
| 05 | [DTOs, esquemas y errores](05-dtos-esquemas-y-errores.md) | NOT_STARTED | Informe |
| 06 | [Persistencia, RLS y migraciones](06-persistencia-rls-y-migraciones.md) | NOT_STARTED | — |
| 07 | [Mandatos, finalidad y aprobaciones](07-mandatos-finalidad-y-aprobaciones.md) | NOT_STARTED | — |
| 08 | [Secretos, discovery y aislamiento remoto](08-secretos-discovery-y-aislamiento-remoto.md) | NOT_STARTED | — |
| 09 | [Modelo económico y períodos](09-modelo-economico-y-periodos.md) | NOT_STARTED | — |
| 10 | [Ingesta CSV y extractos](10-ingesta-csv-y-extractos.md) | NOT_STARTED | Informe |
| 11 | [Mapping de cuentas](11-mapping-de-cuentas.md) | NOT_STARTED | — |
| 12 | [Hechos monetarios](12-hechos-monetarios.md) | NOT_STARTED | — |
| 13 | [Adaptador ERPNext](13-adaptador-erpnext.md) | NOT_STARTED | — |
| 14 | [Ledgers Beancount/hledger](14-ledgers-beancount-hledger.md) | NOT_STARTED | — |
| 15 | [Fuentes bancarias read-only](15-fuentes-bancarias-read-only.md) | NOT_STARTED | Informe |
| 16 | [Idempotencia y revisiones](16-idempotencia-y-revisiones.md) | NOT_STARTED | — |
| 17 | [Conciliación propuesta](17-conciliacion-propuesta.md) | NOT_STARTED | — |
| 18 | [Caja y posición](18-caja-y-posicion.md) | NOT_STARTED | — |
| 19 | [Cuentas por cobrar](19-cuentas-por-cobrar.md) | NOT_STARTED | — |
| 20 | [Cuentas por pagar](20-cuentas-por-pagar.md) | NOT_STARTED | Informe |
| 21 | [Presupuesto versionado](21-presupuesto-versionado.md) | NOT_STARTED | — |
| 22 | [Motor de fórmulas](22-motor-de-formulas.md) | NOT_STARTED | — |
| 23 | [Escenarios y supuestos](23-escenarios-y-supuestos.md) | NOT_STARTED | — |
| 24 | [Forecast de caja](24-forecast-de-caja.md) | NOT_STARTED | — |
| 25 | [FX y conversiones](25-fx-y-conversiones.md) | NOT_STARTED | Informe |
| 26 | [Variaciones y drivers](26-variaciones-y-drivers.md) | NOT_STARTED | — |
| 27 | [Unit economics](27-unit-economics.md) | NOT_STARTED | — |
| 28 | [Runway y stress test](28-runway-y-stress-test.md) | NOT_STARTED | — |
| 29 | [Cierre analítico](29-cierre-analitico.md) | NOT_STARTED | — |
| 30 | [Workbook y export](30-workbook-y-export.md) | NOT_STARTED | Informe |
| 31 | [Propuestas de pago](31-propuestas-de-pago.md) | NOT_STARTED | — |
| 32 | [Reporting Metabase o local](32-reporting-metabase-o-local.md) | NOT_STARTED | — |
| 33 | [Reportes, dashboard e infografías](33-reportes-dashboard-e-infografias.md) | NOT_STARTED | — |
| 34 | [Portal responsive, chat y Anam](34-portal-responsive-chat-y-anam.md) | NOT_STARTED | — |
| 35 | [SDK TypeScript, Hono y tools](35-sdk-typescript-hono-y-tools.md) | NOT_STARTED | Informe |
| 36 | [Bridge de agente y eventos](36-bridge-de-agente-y-eventos.md) | NOT_STARTED | — |
| 37 | [Cooperación y handoff empresarial](37-cooperacion-y-handoff-empresarial.md) | NOT_STARTED | — |
| 38 | [Modelos, coste y observabilidad](38-modelos-coste-y-observabilidad.md) | NOT_STARTED | — |
| 39 | [Privacidad y pruebas adversariales](39-privacidad-y-pruebas-adversariales.md) | NOT_STARTED | — |
| 40 | [Vertical E2E y fallos distribuidos](40-vertical-e2e-y-fallos-distribuidos.md) | NOT_STARTED | Informe |
| 41 | [Operaciones, CI, backup y release](41-operaciones-ci-backup-y-release.md) | NOT_STARTED | — |
| 42 | [Aceptación, evidencia y handoff final](42-aceptacion-evidencia-y-handoff-final.md) | NOT_STARTED | Informe |

Informe: SHA/PR/diff, versiones/entorno, fases PASS/BLOCKED/NOT_VERIFIED, tests realmente ejecutados/pasados/fallidos/skipped, fixtures/receipts/fuentes, costo/riesgos y siguiente dependencia. No contar escenarios planeados como tests. STOP ante fuga, bypass de autorización/revisión, secreto, doble efecto o pérdida de audit. Producción/pagos/firmas/actos regulados fuera de esta entrega.
