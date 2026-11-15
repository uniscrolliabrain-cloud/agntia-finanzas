# Finanzas — 42 campañas estructuradas

**SCaffolds conceptuales, NO campañas granulares.** Preservados 42 IDs, 294 tareas y 84 gates originales. FIN-C01–C05 cuentan ya con código y tests locales ejecutados ([checkpoint](CHECKPOINT-C05.md)); FIN-C06–C42 siguen sin implementación. Los gates de campaña continúan sin ejecutarse. [Originales](../campaigns/README.md) · [PREP](../prep/README.md) · [Factory](../factory/00-README.md) · [Léxico](../factory/02-LEXICO.md) · [ADTC](../factory/03-TRACE-OBSERVABILITY.md) · [Finanzas](../factory/04-PRODUCTO-FINANZAS.md).

| Campaña | Documento de preparación | Estado |
|---|---|---|
| FIN-C01 | [Baseline, fuentes y alcance](01-baseline-fuentes-y-alcance/README.md) | PARTIAL · código y tests locales |
| FIN-C02 | [Autoridad por dominio y contrato SaaS](02-autoridad-por-dominio-y-contrato-saas/README.md) | PARTIAL · código y tests locales |
| FIN-C03 | [Supabase JWT y principal](03-supabase-jwt-y-principal/README.md) | PARTIAL · código y tests locales |
| FIN-C04 | [Twins y nomenclatura canónica](04-twins-y-nomenclatura-canonica/README.md) | PARTIAL · código y tests locales |
| FIN-C05 | [DTOs, esquemas y errores](05-dtos-esquemas-y-errores/README.md) | PARTIAL · código y tests locales |
| FIN-C06 | [Persistencia, RLS y migraciones](06-persistencia-rls-y-migraciones/README.md) | NOT_STARTED |
| FIN-C07 | [Mandatos, finalidad y aprobaciones](07-mandatos-finalidad-y-aprobaciones/README.md) | NOT_STARTED |
| FIN-C08 | [Secretos, discovery y aislamiento remoto](08-secretos-discovery-y-aislamiento-remoto/README.md) | NOT_STARTED |
| FIN-C09 | [Modelo económico y períodos](09-modelo-economico-y-periodos/README.md) | NOT_STARTED |
| FIN-C10 | [Ingesta CSV y extractos](10-ingesta-csv-y-extractos/README.md) | NOT_STARTED |
| FIN-C11 | [Mapping de cuentas](11-mapping-de-cuentas/README.md) | NOT_STARTED |
| FIN-C12 | [Hechos monetarios](12-hechos-monetarios/README.md) | NOT_STARTED |
| FIN-C13 | [Adaptador ERPNext](13-adaptador-erpnext/README.md) | NOT_STARTED |
| FIN-C14 | [Ledgers Beancount/hledger](14-ledgers-beancount-hledger/README.md) | NOT_STARTED |
| FIN-C15 | [Fuentes bancarias read-only](15-fuentes-bancarias-read-only/README.md) | NOT_STARTED |
| FIN-C16 | [Idempotencia y revisiones](16-idempotencia-y-revisiones/README.md) | NOT_STARTED |
| FIN-C17 | [Conciliación propuesta](17-conciliacion-propuesta/README.md) | NOT_STARTED |
| FIN-C18 | [Caja y posición](18-caja-y-posicion/README.md) | NOT_STARTED |
| FIN-C19 | [Cuentas por cobrar](19-cuentas-por-cobrar/README.md) | NOT_STARTED |
| FIN-C20 | [Cuentas por pagar](20-cuentas-por-pagar/README.md) | NOT_STARTED |
| FIN-C21 | [Presupuesto versionado](21-presupuesto-versionado/README.md) | NOT_STARTED |
| FIN-C22 | [Motor de fórmulas](22-motor-de-formulas/README.md) | NOT_STARTED |
| FIN-C23 | [Escenarios y supuestos](23-escenarios-y-supuestos/README.md) | NOT_STARTED |
| FIN-C24 | [Forecast de caja](24-forecast-de-caja/README.md) | NOT_STARTED |
| FIN-C25 | [FX y conversiones](25-fx-y-conversiones/README.md) | NOT_STARTED |
| FIN-C26 | [Variaciones y drivers](26-variaciones-y-drivers/README.md) | NOT_STARTED |
| FIN-C27 | [Unit economics](27-unit-economics/README.md) | NOT_STARTED |
| FIN-C28 | [Runway y stress test](28-runway-y-stress-test/README.md) | NOT_STARTED |
| FIN-C29 | [Cierre analítico](29-cierre-analitico/README.md) | NOT_STARTED |
| FIN-C30 | [Workbook y export](30-workbook-y-export/README.md) | NOT_STARTED |
| FIN-C31 | [Propuestas de pago](31-propuestas-de-pago/README.md) | NOT_STARTED |
| FIN-C32 | [Reporting Metabase o local](32-reporting-metabase-o-local/README.md) | NOT_STARTED |
| FIN-C33 | [Reportes, dashboard e infografías](33-reportes-dashboard-e-infografias/README.md) | NOT_STARTED |
| FIN-C34 | [Portal responsive, chat y Anam](34-portal-responsive-chat-y-anam/README.md) | NOT_STARTED |
| FIN-C35 | [SDK TypeScript, Hono y tools](35-sdk-typescript-hono-y-tools/README.md) | NOT_STARTED |
| FIN-C36 | [Bridge de agente y eventos](36-bridge-de-agente-y-eventos/README.md) | NOT_STARTED |
| FIN-C37 | [Cooperación y handoff empresarial](37-cooperacion-y-handoff-empresarial/README.md) | NOT_STARTED |
| FIN-C38 | [Modelos, coste y observabilidad](38-modelos-coste-y-observabilidad/README.md) | NOT_STARTED |
| FIN-C39 | [Privacidad y pruebas adversariales](39-privacidad-y-pruebas-adversariales/README.md) | NOT_STARTED |
| FIN-C40 | [Vertical E2E y fallos distribuidos](40-vertical-e2e-y-fallos-distribuidos/README.md) | NOT_STARTED |
| FIN-C41 | [Operaciones, CI, backup y release](41-operaciones-ci-backup-y-release/README.md) | NOT_STARTED |
| FIN-C42 | [Aceptación, evidencia y handoff final](42-aceptacion-evidencia-y-handoff-final/README.md) | NOT_STARTED |

## Siguiente etapa
Meta-auditoría conceptual libre de Astra aportada por founder → reconciliación → campañas granulares por archivo, funciones, contratos, tests, handoffs y gates. Los handoffs generales están en `docs/factory/`. No se han creado resultados ficticios ni ejecutado operaciones bancarias.
