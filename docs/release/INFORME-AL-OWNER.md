# Informe al propietario · agntia-finanzas

Finanzas empresariales, tesorería y FP&A · 2026-11-13. Entrega documental avanzada para otra IA, no código de aplicación ni producto funcionando. Aspiración de nivel profesional inspirada en líderes, sin afirmar paridad o certificación actual.

**42 campañas,294 tareas con aceptación,84 escenarios de gate. Todas NOT_STARTED/NOT_EXECUTED.** Investigación selectiva de3 papers y5repos por SHA, fuentes oficiales/comerciales/seguridad/normativa. Sin benchmarks reproducidos, instalación/proveedores/contenedores/sesiones AV/tests de producto/despliegue/gasto. [Validación](document-validation.json) registra checks documentales reales.

## Capacidad propuesta

Convertir datos económicos autorizados en caja, planificación y decisiones explicables con cálculo determinista, sin confundir un forecast con saldo real o autorización de pago.

Datos económicos con origen y revisiones; Caja y conciliación propuesta; Presupuesto, escenarios y forecast; Reporting de gestión y cierre analítico; Receivables/payables y riesgos explicables; Mandatos, aprobaciones y separación del efecto bancario. Interfaz propia con chat/twin y visio Anam, reportes/dashboard/infografías, SDK servidor/Hono/tools nominadas, datos/evidencias y colaboración con humanos/agentes. Cliente externo usa Supabase/portal sin UI AgntiaPro; empleado canónico en padre, twin aquí. Aislamiento en API/DB/workers/archivos/search/cache/Realtime/exportaciones. Solapamientos de servicio permitidos con autoridad por encargo.

## Diferencia particular

Money con Decimal y currency/exponente; signos de ingreso/gasto/debe/haber explícitos por fuente. CashPosition suma saldos verificados de la misma fecha/moneda o muestra FX fuente/fecha separado. Variance = actual − budget con convención declarada; runway solo con burn definido/ventana y escenarios. Prohibir eval de fórmulas del agente; DSL de cálculo con DAG/unidades/versiones y pruebas de propiedades. Caja real según fuente/fecha, beneficio y flujo separados; presupuesto vs actual con períodos/unidades, FX y ajustes; p50/p95 de jobs, cobertura y calidad de datos. Forecast con escenario/sensibilidad, no rentabilidad garantizada.

Sin pagos/transferencias, cambio de cuenta bancaria, conciliación contable posteada, recomendación personalizada de inversión o presentación fiscal en piloto. Fiscalidad acotada y emisión pertenecen a puertos de gestoría/ERP con revisión, no heurística LLM. Riesgo crítico: Forecast o saldo mezclan monedas/fechas, o una propuesta termina en pago sin mandato explícito. Revisión/representación/competencia y prueba del resultado son requisitos reales, no un avatar o flag de LLM.

## Investigación y compatibilidad

Papers: MBABench-2.0, BlueFin, Hedge-Bench; lectura de abstracts, no reproducción ni eficacia heredada. Referencias: Anaplan, Pigment, Workday Adaptive, con accesos fallidos/limitaciones declarados. Repos de [mapa](../research/repositories.json) son candidatos, algunos referencias limitadas, no motor universal del dominio. ERPNext GPL-3.0, hledger GPL-3.0 y Beancount GPL-2.0 según metadatos/README deben evaluarse por módulo/distribución. Actual MIT es referencia de presupuesto, no ERP/tesorería empresarial completo. Metabase combina AGPL y Enterprise comercial; un dashboard multiempresa necesita aislamiento de consulta/embedding probado, no una colección con nombre distinto.

Padre cotejado en `54b8d5407a8576459448c4d059a877297d18ca7a`, mapa selectivo y contratos Actor/JWT/provenance/tareas/eventos/form/capability/outcome/learning; no auditoría exhaustiva o suite ejecutada. **Ningún cambio a agente.** Mapping/wiring futuro solo se propone documentalmente. Índice12/catálogo16 sigue discrepancia de plantillas, no ejecución probada.

## Falta para estar completo

Toda implementación y evidencia real: storage/roles/RLS, core, conectores, UI/AV, cálculos/validaciones, pruebas/E2E y operación. Humanos responsables, acuerdos, revisión jurídica/profesional, licencias y costes de configuración concretos. Las bolsas 30/70/300€ son hipótesis separadas de efectos de negocio/licencias/humano; no plan contratado ni garantía de volumen.

Leer [handoff](HANDOFF.md), [campañas](../campaigns/README.md), [contratos](../contracts/01-contratos.md), [aceptación](PILOT-ACCEPTANCE.md) y [runbook](../operations/RUNBOOK.md). Implementar con checkpoint cada 5 fases y las 2 finales, deteniendo críticos. El trabajo futuro se evalúa por artefactos/estado/fuentes/receipts, no por volumen de texto o trabajo simulado.
