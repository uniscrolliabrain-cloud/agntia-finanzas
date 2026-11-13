# Handoff para la IA implementadora · agntia-finanzas

2026-11-13. Encargo actual: **solo documentación**, no implementación. Trabajar en `uniscrolliabrain-cloud/agntia-finanzas`. **No modificar `/agente` ni repos hermanos.** La carpeta local es `/workspace/agntia-finanzas`; en otra máquina obtener checkout de GitHub. Las rutas de implementación de las campañas son propuestas, no archivos ya existentes.

## Intención y acuerdos

Convertir datos económicos autorizados en caja, planificación y decisiones explicables con cálculo determinista, sin confundir un forecast con saldo real o autorización de pago. El servicio es una empresa SaaS especialista que puede servir a clientes externos o integrados, con humanos responsables y presencia por Anam. Se permiten funciones solapadas con padre/hermanos, con AuthorityMap por encargo y un ejecutor de cada efecto. El agente canónico vive en padre, twin aquí; no crear nuevo registro soberano de empleados. Todos los modos JWT Supabase, membership/ACL y scopes end-to-end. La UI externa no requiere UI AgntiaPro, pero mantiene vínculo del especialista al padre.

## Antes de codificar con autorización posterior

Leer README/producto/arquitectura/twins/contratos/seguridad/evaluación/fuentes/licencias. Congelar SHA propio/padre/upstreams e instrucciones locales. Padre observado `54b8d5407a8576459448c4d059a877297d18ca7a`; mapa selectivo con lecturas heredadas y nuevas, no auditoría o suite. Cotejar cualquier cambio antes de adaptar. Índice default12/catálogo16 no implica12 runtimes activos; confirmar catálogo/revisión, no copiar memoria default ni crear agentes para compensar.

Conservar Actor/runtimeId/roleId/personaId/kernelTurnId, provenance y assignedBy/To. Outcome/VerificationResult/CapabilityContract tienen semánticas distintas: verified/confidence/idempotency declarados no fabrican autorización o garantía real. LearningFact procedural del padre no es perfil clínico/educativo del cliente. FormSpec chip no concede acceso. Nuevos DTOs de dominio se declaran nuevos; SystemEvent host schemaVersion string1.0/emittedAt/owner/source permitido, no enum inventado.

## Orden

[42 campañas](../campaigns/README.md) y [manifest](../campaigns/campaign.json). C01–C08 fundaciones; C09–C32 los24 módulos del dominio; C33–C42 reportes/UI/SDK/host/cooperación/coste/seguridad/E2E/ops/aceptación.294 tareas con aceptación,84 escenarios; todo NOT_STARTED/NOT_EXECUTED. No plazo ficticio. Gate bloqueado no se vuelve PASS por tener un mock o un documento que diga lo esperado.

## Núcleo específico

Money con Decimal y currency/exponente; signos de ingreso/gasto/debe/haber explícitos por fuente. CashPosition suma saldos verificados de la misma fecha/moneda o muestra FX fuente/fecha separado. Variance = actual − budget con convención declarada; runway solo con burn definido/ventana y escenarios. Prohibir eval de fórmulas del agente; DSL de cálculo con DAG/unidades/versiones y pruebas de propiedades.

Banco/ERP custodian hechos originales; finanzas conserva snapshots/mapping y cálculos de gestión; gestoría gobierna cálculos fiscales delimitados; aprobación no se fabrica en el ERP. Estados de dominio propuestos: `ingested_unverified, mapping_blocked, reconciled_proposed, reviewed, planned, approved, stale, conflict, superseded, unknown`. Entidades: `CompanyFact FinancialSource AccountMapping TransactionFact LedgerProjection ReconciliationProposal BudgetVersion ForecastRun Scenario Assumption FXObservation Receivable Payable CashPosition CloseChecklist ReportSnapshot PaymentProposal`. La IA implementadora debe fijar cardinalidad, types, invariantes y pruebas por fase, sin depender de texto libre para representar dinero, permisos o hechos. Caja real según fuente/fecha, beneficio y flujo separados; presupuesto vs actual con períodos/unidades, FX y ajustes; p50/p95 de jobs, cobertura y calidad de datos. Forecast con escenario/sensibilidad, no rentabilidad garantizada.

Vertical: Extractos sintéticos y facturas → staging/unverified → mapping/revisión → conciliación propuesta → caja y presupuesto → escenario → revisión humana → reporte reproducible; PaymentProposal queda sin ejecutar.

## Adaptadores

Elegir un camino de piloto, no instalar todos. ERPNext GPL-3.0, hledger GPL-3.0 y Beancount GPL-2.0 según metadatos/README deben evaluarse por módulo/distribución. Actual MIT es referencia de presupuesto, no ERP/tesorería empresarial completo. Metabase combina AGPL y Enterprise comercial; un dashboard multiempresa necesita aislamiento de consulta/embedding probado, no una colección con nombre distinto. SHAs de referencia son de ramas observadas, no digests/release aprobados; revisar licencia/edición/datos/pesos/plugins y permisos. Si falta red/Docker/cuenta, unit/contratos locales y gate real NOT_VERIFIED. No demos ajenas o datos reales para aparentar éxito. La UI del backend no es producto obligatorio para el cliente.

## Invariantes

Sin pagos/transferencias, cambio de cuenta bancaria, conciliación contable posteada, recomendación personalizada de inversión o presentación fiscal en piloto. Fiscalidad acotada y emisión pertenecen a puertos de gestoría/ERP con revisión, no heurística LLM. Unidades, signos, moneda, devengo/caja o fórmulas erróneas pueden convertir un informe correcto en una decisión perjudicial.

Preview local sin writes, firma o gasto. Approval atada al hash/revisión/tenant/recipient/alcance/policy/rights/coste/expiry; cambio material invalida. Modelo y avatar no aprueban, compran o adquieren condición profesional. Mandato y autorización se revalidan en cada job; actor de origen y target separados. No URL/método/SQL/HTTP/shell genéricos. No memoria compartida de clientes o secretos al modelo.

Commit local/outbox/audit/key atómico y HTTP separado. Timeout después de posible efecto: reconciliar, no reintentar ciego o por otro proveedor. Restore reaplica supresiones/restricciones y no reenvía historia. Datos faltantes/conflict/stale visibles; fuentes, versión y evidence antes de conclusión. No paridad mundial/cumplimiento/certeza universal.

## Evidencias y checkpoints

Informar tras 5/10/15/20/25/30/35/40/42. Fases PASS/BLOCKED/NOT_VERIFIED con SHA/PR/diff, entorno/versiones, tests ejecutados/pasados/fallidos/skipped, fixtures inicial/final, estado protegido, receipts/correlación sanitizados, coste y riesgos. Cero tests de producto ejecutados en esta entrega. No contar84 escenarios planeados como84tests. Logs públicos sin tokens/PII/originales restringidos.

## Entrega y expansión

Demo sintética A/B/P con fuentes, propuesta/revisión, efecto permitido o artefacto, receipt y reporte reproducible; E2E/fallos/revocación/restore, capacidades reales por versión/edición/rol, manuales/coste/límites. SDK/Hono y patch de wiring se preparan aquí; instalación/cambio en agente requiere otro encargo. Producción/datos reales/efectos regulados o compras después de aceptación explícita del owner. Entregar pendientes como pendientes, con responsable, sin maquillar alcance.
