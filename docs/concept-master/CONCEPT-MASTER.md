# AGNTIA FINANZAS — CONCEPT MASTER
**Versión conceptual:** 1.0 · **Fecha:** 2026-11-15 · **Estado:** TARGET_VISION / EVOLUTIVO · **Autoridad:** diseño de destino, no evidencia de producto implementado.

> **Tesis:** convertir una empresa en un sistema económico observable, explicable y capaz de anticipar, simular y coordinar decisiones financieras. Agntia Finanzas es un especialista agéntico gobernado por evidencia y cálculo determinista, integrado con el kernel de AgntiaPro, que eleva la dirección financiera disponible para pymes y autónomos sin atribuir a un LLM autoridad contable, bancaria o regulatoria.

## 0. Contrato de este documento

Este Concept Master describe **qué debe llegar a ser el producto**, no lo que existe hoy. No se rebaja la visión al piloto ni se confunde documentación con implementación. Los límites del piloto existente en `docs/01-producto.md` siguen siendo límites **de la fase de construcción**, no prohibiciones eternas para la visión final. La ampliación futura a pagos, inversión o financiación se condiciona a autorizaciones, regulación, contratos y controles específicos.

**Tres clases de afirmaciones:** [C] capacidad establecida por práctica/tecnología conocida; [D] diseño original propuesto que debe implementarse; [H] hipótesis de frontera que requiere experimentación. Las fuentes de proveedores son declaraciones de su oferta, no pruebas de rendimiento. No se afirma haber reproducido papers ni auditado instalaciones.

**Regla de autoridad:** este documento amplía y orienta la visión; no sustituye unilateralmente contratos existentes, código, decisiones de seguridad ni ownership de `agente`. Ante contradicciones, registrar ADR y resolver antes de ejecutar efectos.

## 1. Ambición y diferenciación

### 1.1 Problema humano
La mayoría de las pequeñas empresas disponen de fragmentos económicos: banco, facturas, gestoría, hojas de cálculo, ventas, nóminas y conversaciones. No poseen necesariamente una **representación temporal coherente de su economía**, ni capacidad continua para responder «¿qué está pasando?», «¿qué ocurrirá si…?» y «¿qué decisión reduce el riesgo sin destruir oportunidades?». Los sistemas de gestión registran transacciones; la planificación proyecta; los agentes pueden conectar explicación y coordinación. El reto es hacer que los tres compartan semántica, evidencia y autoridad.

### 1.2 Resultado final
El owner conversa con LAIA y con el especialista financiero, o utiliza paneles, workbooks y simuladores; recibe:
1. Una **verdad económica versionada** con incertidumbre y cobertura explícitas.
2. Una **previsión probabilística reconciliada** de caja, ingresos, costes y obligaciones.
3. Un **gemelo económico operativo** que simula intervenciones sin ejecutarlas.
4. Un **sistema de decisiones revisables** con opciones, riesgos, coste de oportunidad y trazabilidad.
5. Una **orquestación multiagente de seguimiento**, con tareas, aprobaciones y resultados medidos.
6. Una **memoria de decisiones** que compara previsiones anteriores, acciones tomadas y resultados reales.
7. Una **interfaz financiera adaptada al tamaño de la empresa**, desde autónomo hasta organización con múltiples entidades.

### 1.3 Diferenciadores de diseño [D]
- **Financial Reality Graph:** grafo temporal de hechos, fuentes, compromisos, supuestos, dependencias y derechos; no una base de datos de cifras sin contexto.
- **Evidence-to-Decision-to-Outcome:** cadena verificable desde origen a propuesta, decisión, efecto y resultado posterior.
- **Counterfactual Studio:** comparar intervenciones alternativas con supuestos, restricciones y distribución de resultados; no confundir correlación con causalidad.
- **Economic Immune System:** alertas preventivas de fragilidad, liquidez, concentración, fraude de pagos, dependencia de clientes/proveedores y fallos de datos.
- **Agentic CFO Office:** especialistas cooperando mediante el runtime de AgntiaPro, no agentes autónomos con permisos ilimitados.
- **Decision Memory:** aprendizaje supervisado de errores de forecast y de políticas de gestión, sin autoactivar SOPs ni usar información entre tenants.
- **Confidence as a first-class object:** incertidumbre de fuente, modelo, escenario y operación por separado; jamás un porcentaje de confianza lingüístico convertido en autorización.
- **Economic Digital Twin:** simulación acotada, calibrada y falsable; nunca una promesa de predecir el futuro.

## 2. Atlas de frontera: referentes y decisiones

### 2.1 Planificación y FP&A
**Anaplan, Pigment, Workday Adaptive Planning, Oracle EPM, SAP Analytics Cloud, OneStream, Planful, Vena y Prophix** constituyen un mapa de categorías a investigar: planificación conectada, modelos multidimensionales, escenarios, consolidación, workflows, control y analítica. Las tres primeras referencias ya están en `docs/02-investigacion.md`; las restantes son **candidatos de benchmarking**, no productos inspeccionados integralmente en esta ronda. La diferenciación buscada no es replicar cada pantalla, sino integrar razonamiento conversacional, datos económicos, decisiones y ejecución supervisada en un contrato único.

### 2.2 Tesorería, cobros y pagos
**Kyriba, Trovata, HighRadius, GTreasury/Ripple Treasury, Agicap, Embat, Atlar y Nomentia** forman un mapa de exploración para visibilidad bancaria, previsión de liquidez, conciliación, AR/AP, riesgos, pagos y conectividad. Revalidar características, regiones, APIs, precios y regulación antes de seleccionar adaptadores. No adjudicar a cada proveedor funciones específicas sin evidencia de su documentación oficial.

### 2.3 Contabilidad, ERP y datos
ERPNext, Odoo Community, Beancount, hledger, Actual Budget y Metabase son candidatos existentes o ampliados. Añadir como referencias conceptuales de interoperabilidad: **Open Banking/PSD2, ISO 20022, SEPA, camt.053/054, MT940 heredado, XBRL, Peppol y formatos fiscales locales**. La compatibilidad depende de entidad, país, licencia, consentimiento y proveedor. La contabilidad oficial y el cálculo fiscal no pasan a ser responsabilidad de Finanzas por importar sus datos.

### 2.4 Investigación científica y algoritmos
- **Forecast reconciliation**: Athanasopoulos, Hyndman, Kourentzes y Panagiotelis, *Forecast reconciliation: A review*, International Journal of Forecasting 40(2), 2024, DOI 10.1016/j.ijforecast.2023.10.010. Consecuencia: coherencia entre jerarquías de centros de coste, unidades, productos y períodos.
- **Nixtla StatsForecast**: baselines estadísticos, intervalos y variables exógenas; usar backtesting temporal, no claims de velocidad sin reproducir.
- **Nixtla HierarchicalForecast**: BottomUp, TopDown, MinTrace y reconciliación probabilística como candidatos.
- **Nixtla NeuralForecast**: NHITS, NBEATSx, modelos neuronales y predicción probabilística, sujetos a tamaño de muestra y backtesting.
- **MBABench-2.0, BlueFin, Hedge-Bench**: referencias ya registradas en `docs/02-investigacion.md`; sus objetivos de evaluación no deben extrapolarse como precisión financiera empresarial demostrada.
- **Investigación a profundizar [H]**: conformal prediction bajo cambio de distribución, inferencia causal y contrafactual, optimización estocástica y robusta, detección de anomalías, teoría de decisiones, modelos estructurales, forecasting intermitente y calibración de incertidumbre. Cada algoritmo debe competir con baselines simples.

### 2.5 Criterio de incorporación
Toda innovación tendrá ficha: problema, evidencia, hipótesis, datos mínimos, coste, sensibilidad, riesgos, alternativa simple, evaluación, condiciones de activación y plan de retirada. Una tecnología más nueva no gana por ser más nueva.

## 3. Mapa completo de capacidades finales

**Convención:** [C] conocido; [D] diseño de Agntia; [H] investigación. P0/P1/P2 indican orden de construcción, **no recorte del concepto final**.

### Dominio A — Fundamento económico y calidad de verdad
**F01 [C/P0]** Registro de empresas, entidades legales, unidades, centros de coste, proyectos, productos, monedas y calendarios fiscales.
**F02 [C/P0]** Ingesta de bancos, extractos, ERP, facturación, nómina, CRM, ecommerce, hojas de cálculo y APIs, con linaje y deduplicación.
**F03 [C/P0]** Normalización de moneda, signo, fechas de valor/registro/devengo, impuestos, redondeos y cambios de divisa.
**F04 [C/P0]** Motor de conciliación de facturas, movimientos, cobros, devoluciones y ajustes; propuestas y conflictos explícitos.
**F05 [D/P0]** Financial Reality Graph con hechos, inferencias, fuentes, compromisos, revisiones, autoridad y frescura.
**F06 [C/P1]** Cierre analítico y trazabilidad de versiones; conciliación con libros oficiales sin suplantar la contabilidad.
**F07 [D/P1]** Medidor de cobertura y calidad de verdad por cifra, período, fuente y tenant.
**F08 [C/P1]** Consolidación de gestión entre entidades, eliminaciones y FX, con frontera explícita frente a consolidación legal.

### Dominio B — Caja y tesorería
**F09 [C/P0]** Posición de caja por cuenta, entidad, moneda, fecha y disponibilidad.
**F10 [C/P0]** Cash flow directo e indirecto reconciliados conceptualmente; distinguir beneficio, EBITDA, caja y saldo.
**F11 [C/P1]** Previsión diaria/semanal de 13 semanas y mensual/anual, con obligaciones contractuales y estacionalidad.
**F12 [D/P1]** Liquidity Radar: fechas de ruptura, bandas de incertidumbre, buffers y explicaciones accionables.
**F13 [C/P1]** Gestión de AR/AP, antigüedad de saldos, disputas, cobros parciales, concentración y comportamiento de pago.
**F14 [C/P1]** Exposición FX, comisiones, tipos, calendario de deuda y restricciones de liquidez.
**F15 [D/P2]** Simulador de políticas de cobro, negociación de plazos, reservas, crédito y capital circulante.
**F16 [D/P2]** Orquestación supervisada de pagos/tesorería mediante proveedores autorizados y controles reforzados, **solo después de habilitación regulatoria y técnica**.

### Dominio C — Planificación, FP&A y dirección
**F17 [C/P0]** Presupuesto versionado por drivers, departamentos, productos, clientes, escenarios y horizontes.
**F18 [C/P1]** Rolling forecast con actuals, versiones, drivers, responsables y explicación de cambios.
**F19 [C/P1]** P&L de gestión, balance, cash flow y métricas operativas con reconciliación entre vistas.
**F20 [C/P1]** Variaciones actual-vs-budget-vs-forecast, puente de drivers y detección de causas plausibles.
**F21 [D/P1]** Modelo financiero declarativo: DAG de fórmulas tipadas, unidades, semántica, sensibilidad y procedencia.
**F22 [D/P1]** Planeamiento conectado entre ventas, marketing, operaciones, RRHH, inventario y finanzas.
**F23 [C/P2]** Unit economics: margen de contribución, CAC/LTV con definición explícita, cohortes, payback y rentabilidad por segmento.
**F24 [C/P2]** Modelos de pricing, elasticidad y rentabilidad de productos, contratos y clientes.
**F25 [D/P2]** Decision Cockpit: opciones de inversión operativa, contratación, expansión y ahorro con tradeoffs visibles.
**F26 [D/P2]** Boardroom Simulator: múltiples estrategias y escenarios presentados como hipótesis contrastables.

### Dominio D — Inteligencia predictiva y optimización
**F27 [C/P1]** Forecast probabilístico con baselines, intervalos, horizontes y validación rolling-origin.
**F28 [C/P1]** Reconciliación jerárquica temporal/organizativa para evitar previsiones agregadas incompatibles.
**F29 [C/P1]** Stress testing: caída de ventas, morosidad, shock de costes, tipos, FX, concentración, retrasos y eventos externos.
**F30 [D/P2]** Gemelo económico calibrado con restricciones, dependencias, shocks y mecanismos de propagación.
**F31 [H/P2]** Contrafactual causal bajo supuestos explícitos y evaluación de identificabilidad; no etiquetar simulación como causalidad probada.
**F32 [C/P2]** Optimización robusta/estocástica de caja, inventario, gasto y asignación presupuestaria bajo restricciones.
**F33 [D/P2]** Policy Sandbox: evaluar SOPs financieros antes de activarlos, incluyendo efectos adversos y equidad.
**F34 [D/P2]** Sistema de aprendizaje de forecast y decisiones: calibración, drift, impacto real, retractaciones y auditoría.
**F35 [H/P2]** Coordinación de múltiples gemelos de empresas sin compartir datos confidenciales; explorar agregación privada/federada cuando esté justificado.

### Dominio E — Riesgo, control y protección
**F36 [C/P0]** Segregación de funciones, doble aprobación, límites, mandatos, caducidad y revocación.
**F37 [C/P1]** Detección de duplicados, proveedores alterados, cambios de IBAN, patrones anómalos y facturas sospechosas.
**F38 [D/P1]** Economic Immune System: mapa de vulnerabilidades de negocio y protocolos preventivos revisables.
**F39 [C/P1]** Riesgo de crédito comercial, impago, concentración y exposición contractual, sin decisiones automáticas prohibidas.
**F40 [C/P1]** Auditoría de datos, cálculos, modelos, accesos, aprobaciones, exports y resultados.
**F41 [D/P2]** Protocolos de continuidad financiera ante ciberincidente, caída bancaria, fraude, desastre o interrupción operativa.
**F42 [D/P2]** Evidence-to-Decision-to-Outcome Ledger: historial reproducible de decisión, autorización, efecto y aprendizaje.

### Dominio F — Agentes, experiencia y colaboración
**F43 [D/P0]** Especialista financiero vinculado a identidad canónica del padre, memoria scoped y límites de competencia.
**F44 [D/P0]** Conversación financiera con fuentes clicables, fórmulas inspeccionables y distinción hecho/estimación/recomendación.
**F45 [D/P1]** CFO Office: agentes de caja, FP&A, riesgo, conciliación y reporting como roles/capacidades, no autoridades paralelas.
**F46 [D/P1]** Briefing diario/semanal/mensual: cambios, riesgos, decisiones pendientes, objetivos y seguimiento.
**F47 [D/P1]** Workspace de decisiones: propuestas, comparativas, aprobación, handoff, resultados y revisiones.
**F48 [D/P1]** Workbooks vivos con fórmulas trazables, exportaciones Excel/CSV/PDF y snapshots reproducibles.
**F49 [D/P2]** Interfaz conversacional y avatar Anam opcional, voz, móvil y colaboración, con las mismas políticas que la API.
**F50 [D/P2]** Narrativas financieras adaptadas a owner, responsable de área, gestoría y auditor, sin ocultar incertidumbre.
**F51 [D/P2]** Alertas accionables con umbrales, costes de falso positivo y escalado a humanos.
**F52 [D/P2]** Simulación guiada de decisiones con panel de sensibilidad, árbol de escenarios y comparación de alternativas.

### Dominio G — Plataforma, ecosistema y expansión
**F53 [C/P0]** Multi-tenant, ACL por recurso/campo, propósito, secretos segregados, RLS y trazabilidad.
**F54 [D/P0]** AuthorityMap por encargo: qué sistema gobierna cada hecho, cálculo, decisión y efecto.
**F55 [C/P1]** Adaptadores por capacidad y versión para bancos/ERP/gestoría/CRM, con discovery verificable y reconciliación.
**F56 [D/P1]** Contratos de cooperación entre Finanzas, Gestoría, Ventas, Marketing, Clientes, Seguros y Legal.
**F57 [C/P1]** Versionado de modelos, snapshots, reproducibilidad, observabilidad, restore y gobernanza.
**F58 [D/P2]** Biblioteca de modelos sectoriales: comercio, servicios, suscripción, hostelería, fabricación, proyectos y autónomos.
**F59 [D/P2]** Extensibilidad controlada: modelos financieros declarativos, plugins aislados y marketplace de plantillas revisadas.
**F60 [H/P2]** Gemelos económicos de cadenas de suministro/ecosistemas con consentimiento y privacidad, para análisis de resiliencia colectiva.

**Regla de completitud:** cada Fxx se desglosará antes de construir en historias, entidades, entradas, salidas, criterios de aceptación, riesgos, restricciones, datos de evaluación, interfaces y owner de autoridad. El mapa de 60 capacidades es **taxonomía de destino**, no 60 features implementadas ni afirmación de exhaustividad eterna.

## 4. Arquitectura conceptual del sistema final

### 4.1 Planos separados
1. **Data & Evidence Plane**: conectores, ingesta, snapshots inmutables, fuente de autoridad, calidad, consentimiento, acceso y versionado.
2. **Economic Semantics Plane**: entidades económicas, cuentas, períodos, monedas, relaciones, compromisos, grafo de hechos y ontología de drivers.
3. **Deterministic Calculation Plane**: Decimal, DAG tipado, unidades, calendario, reglas, reconciliación, agregación y snapshots.
4. **Forecast & Simulation Plane**: modelos estadísticos, probabilísticos, escenarios, stress tests, optimización y backtesting.
5. **Decision Plane**: opciones, utilidad/objetivos declarados, restricciones, explicación, revisión, aprobación y política.
6. **Agent & Interaction Plane**: LAIA, especialista, twins, UI, voz, reportes y herramientas nominadas; no permisos autónomos.
7. **Execution & Integration Plane**: intents, outbox, workers, adaptadores, receipts, conciliación de outcomes y handoffs.
8. **Governance Plane**: identidad, tenancy, auditoría, privacidad, seguridad, versionado, evaluación y gestión de cambios.

### 4.2 Flujo canónico
`fuente autorizada → snapshot/provenance → semántica/validación → hecho económico versionado → cálculo → modelo/escenario → propuesta comparativa → política/revisión → aprobación vinculada → ejecución autorizada → receipt/estado incierto → medición de resultado → memoria de decisión`.

**Invariantes:** el LLM propone y explica; código valida identidad, política, dinero, cálculos y efectos. Ninguna confianza estadística crea permisos. El forecast no modifica saldo real. El simulador no ejecuta pagos. Un ACK de proveedor no prueba liquidación. El retry no duplica un efecto incierto. Nunca mezclar datos de tenants, monedas, períodos o estados sin conversión explícita.

### 4.3 Modelo de datos conceptual
`Tenant, Company, LegalEntity, BusinessUnit, CostCenter, EconomicPeriod, Currency, FinancialSource, SourceSnapshot, ProvenanceRef, EconomicFact, JournalProjection, AccountMapping, CashAccount, CashPosition, Receivable, Payable, Commitment, ContractObligation, ReconciliationProposal, BudgetVersion, Driver, FinancialModel, FormulaNode, Scenario, Shock, ForecastRun, ForecastDistribution, ReconciliationConstraint, StressResult, RiskSignal, DecisionOption, DecisionCase, ApprovalBinding, ExecutionIntent, ExternalReceipt, OutcomeObservation, ModelEvaluation, DecisionMemory, AuthorityMap, WorkOrder, DelegationMandate, AgentTwinBinding`.

Cada objeto declara tenant, versión, actor/autoridad, período, source refs, classification, retention y permisos. Las series de datos diferencian `observedAt`, `effectiveAt`, `bookedAt`, `valueAt` y `asOf`. Las estimaciones incorporan horizonte, distribución, supuestos y calibración. Las propuestas llevan hash de alcance, estado y caducidad.

### 4.4 Motor económico declarativo
Fórmulas como AST/DAG versionado, nunca `eval` de texto LLM. Tipos `Money<Currency>`, `Rate`, `Quantity<Unit>`, `Duration`, `Period`, `Probability` y `Distribution`; sumar EUR con USD o stock con flujo sin conversión explícita es error. Decimal y reglas de redondeo configuradas por operación; FX con fuente/fecha, spread y método. Distinguir ajustes retrospectivos de datos nuevos, recalcular dependencias y preservar snapshots aprobados.

## 5. Núcleo científico: predicción, simulación y decisiones

### 5.1 Forecasting
Baselines obligatorios: naive/seasonal naive, media móvil, reglas contractuales y modelos de drivers. Candidatos: ARIMA/ETS, modelos de regresión, gradient boosting, forecasting intermitente y modelos neuronales solo si superan baselines fuera de muestra. Evaluación rolling-origin sin leakage, segmentada por tamaño, horizonte, estacionalidad, fuente y shocks. Métricas MAE/WAPE con tratamiento de ceros, pinball loss, cobertura de intervalos, calibración, coherencia jerárquica y **coste de decisión**. El MAPE no es métrica universal.

### 5.2 Coherencia
Jerarquías: `empresa → entidad → unidad → producto`, `año → trimestre → mes → semana`, `ingresos - costes → margen`, `opening cash + inflows - outflows = closing cash`. El reconciliador impone restricciones semánticas; reconciliar estadísticamente no legitima datos mal definidos. Los intervalos probabilísticos deben respetar dependencias; no sumar p90 independientes como si fuera p90 del total.

### 5.3 Simulación
Simulador con tres modos: **identidad contable** (exacta), **escenario condicional** (si se cumplen supuestos) y **estimación predictiva** (incertidumbre calibrada). Shock propagation sobre drivers con dependencias explícitas; comparar escenarios base, optimista, adverso y escenarios construidos por el usuario. Registrar qué relaciones son reglas, cuáles estadísticas y cuáles hipótesis causales.

### 5.4 Optimización y recomendaciones
Definir objetivo humano (supervivencia de caja, margen, crecimiento, estabilidad, empleo, sostenibilidad) y restricciones (liquidez mínima, contratos, capacidades, riesgo, legalidad). Producir frontera de Pareto, no un supuesto óptimo universal. Una propuesta presenta `beneficio esperado, downside, sensibilidad, información faltante, reversibilidad, tiempo de efecto, dependencia y autoridad necesaria`. Separar recomendación estratégica de asesoramiento regulado.

### 5.5 Aprendizaje
Guardar forecast original y actual posterior, no reescribir el pasado; medir drift, cobertura, falsos avisos, acciones y consecuencias. El agente puede proponer cambios de modelo/SOP; activación requiere evaluación, regresión, aprobación y rollback. No entrenar entre tenants sin base jurídica y autorización específica.

## 6. Agentes y relación con AgntiaPro

**Identidad y autoridad:** LAIA y agentes canónicos existen en el padre `uniscrolliabrain-cloud/agente`; Finanzas expone twins, herramientas y vistas de especialista, no crea un kernel paralelo. Roles conceptuales: **CFO Strategist** (escenarios y objetivos), **Treasury Analyst** (caja y obligaciones), **FP&A Analyst** (presupuesto/forecast), **Controller** (calidad/reconciliación), **Risk Analyst** (stress/fraude), **Reporting Analyst** (entregables). Son perfiles funcionales y SOPs, no nuevas personas con permisos propios.

**Contrato de delegación:** `WorkOrder → capability → tenant/resource/purpose → authority → evidence → proposal → approval if required → execution → receipt → outcome → ACK to parent`. El padre decide identidad, organización, tarea, aprobaciones y políticas transversales. Finanzas posee semántica financiera, modelos, cálculo, fuentes de dominio y evidencias de resultado. Se permiten duplicidades de capacidad entre repos, pero un `AuthorityMap` elige el ejecutor por efecto.

**Cooperación:**
- **Gestoría:** hechos contables/fiscales y cálculos tributarios autorizados; Finanzas consume resultados y no suplanta presentación fiscal.
- **Ventas/Clientes:** pipeline, cohortes, contratos y probabilidad de cobro con incertidumbre.
- **Marketing:** presupuesto, CAC, atribución con reservas causales y retorno.
- **RRHH/Formación:** costes de plantilla, capacidad, escenarios de contratación, nunca decisiones laborales automáticas sin evaluación específica.
- **Legal:** obligaciones, vencimientos, contingencias y contratos.
- **Seguros:** primas, coberturas, franquicias, pérdidas esperadas y continuidad.
- **Ciberseguridad:** escenarios de fraude, ransomware, interrupción y protocolos de resiliencia.
- **Comunicación:** narrativas autorizadas a socios, dirección y clientes sin filtrar secretos.

**Tooling conceptual:** `finance.reality.read`, `finance.cash.snapshot`, `finance.forecast.run`, `finance.scenario.compare`, `finance.risk.explain`, `finance.budget.propose`, `finance.reconciliation.preview`, `finance.decision.propose`, `finance.report.generate`, `finance.execution.intent.prepare`. Ninguna tool acepta `tenantId` libre del LLM ni método de proveedor arbitrario. Capacidades de pago/financiación reguladas, si se incorporan, exigirán permisos nominados, control dual, step-up y garantías externas.

## 7. UX final: empresa financiera conversable

**Vista owner:** «¿Cuánto dinero tenemos realmente disponible?», «¿Qué pasa si perdemos al principal cliente?», «¿Podemos contratar a dos personas?», «¿Por qué cayó el margen?», «¿Qué decisiones necesitan mi aprobación?». Cada respuesta separa **hechos, inferencias, hipótesis y decisiones**, y enlaza fuentes, fechas, cobertura y versiones.

**Workspaces:** Reality Dashboard (estado y calidad), Cash Tower (liquidez), Planning Studio (presupuestos), Scenario Lab (gemelo), Decision Board (alternativas y aprobaciones), Risk Radar (alertas), Evidence Explorer (linaje), Agent Office (tareas/handoffs), Model Registry (calibración), Report Factory (entregables).

**Interacciones clave:** drill-down de cifra a origen; sliders de drivers con recálculo; comparación lado a lado de escenarios; diff entre forecast anterior y nuevo; línea temporal de decisiones; warnings de moneda/frescura; preview de aprobación con payload exacto; modo de accesibilidad; export editable y snapshot firmado por hash. Voz/Anam opcional: un «sí» hablado nunca basta para pagos o actos sensibles.

## 8. Seguridad, cumplimiento y límites

RGPD, normativa de servicios de pago y banca, AML/KYC cuando aplique, normativa contable/fiscal y AI Act deben clasificarse por **función, país, rol, proveedor y fecha**, no por el nombre del repositorio. PSD2/Open Banking no equivale a licencia propia de iniciación de pagos. Para un proveedor regulado, verificar su habilitación y contrato. No dar asesoramiento de inversión personalizado sin análisis jurídico y operativo previo. Modelos de riesgo sobre personas pueden activar obligaciones adicionales. Mantener separación de lectura, propuesta, revisión, ejecución y liquidación.

Controles: deny-by-default, RLS y ACL por recurso/campo, mandatos con expiración/revocación, step-up, dual control, secretos vault, minimización, cifrado, audit append-only, límites de egress, idempotencia, reconciliación de efectos inciertos, backups/restore, red teaming de prompt injection en facturas/CSV, controles contra envenenamiento de fuentes y exportación segura. No reutilizar datasets bancarios entre clientes. Prohibir resultados simulados presentados como hechos.

**Autonomía por niveles:** L0 lectura; L1 explicación; L2 propuesta; L3 ejecución reversible autorizada; L4 efecto económico sensible con autorización explícita, controles y proveedor habilitado. El nivel no lo decide el agente ni el usuario mediante un prompt: lo decide la política por capacidad y jurisdicción.

## 9. Métricas de excelencia conceptual y producto futuro

**Calidad económica:** exactitud de identidades, conciliación, cobertura, frescura, unidades, ausencia de mezclas y reproducibilidad.
**Forecast:** MAE/WAPE/pinball, cobertura/calibración, coherencia, estabilidad, drift y mejora vs baseline.
**Decisiones:** calidad de opciones, escenarios realmente diferenciados, sensibilidad, decisiones revisadas, resultado observado, coste de error y oportunidad.
**Seguridad:** 0 fugas entre tenants; 0 permisos/competencias inventados; 0 pagos duplicados por replay; 0 efectos sin autorización.
**Operación:** p50/p95, disponibilidad, recuperación, errores, costes por workflow, tasa de bloqueo justificado, estados inciertos reconciliados.
**Experiencia:** tiempo hasta explicación verificable, comprensión del owner, adopción de escenarios, capacidad de corregir supuestos, accesibilidad.
**Investigación:** referencias verificadas, hipótesis falsables, experimentos reproducibles, incertidumbres abiertas.

## 10. Ruta de convergencia hacia el concepto

El roadmap **no redefine el producto final**; define cómo perseguirlo.

**G0 — Concepto y evidencias:** fijar atlas, fichas F01–F60, taxonomía, ADRs, baselines y fronteras reguladas.
**G1 — Reality Foundation:** identidad, tenancy, ingestión, proveniencia, hechos monetarios, reconciliación, motor de fórmulas, snapshots y UI de fuentes.
**G2 — CFO Fundamentals:** caja, AR/AP, presupuesto, variaciones, 13-week cash forecast y reporting con revisión.
**G3 — Probabilistic FP&A:** forecasting calibrado, reconciliación jerárquica, escenarios, sensibilidad, estrés y modelo económico.
**G4 — Decision Intelligence:** gemelo económico, opciones, restricciones, Decision Board, memoria de decisiones y análisis de impacto.
**G5 — Agentic CFO Office:** especialidades, handoffs al padre, reportes periódicos, cooperación inter-repos y seguimiento.
**G6 — Advanced Treasury & Ecosystem:** conectores y efectos autorizados, resiliencia, modelos sectoriales, optimización, extensiones y capacidades de investigación verificadas.
**G7 — Concept V2:** auditoría de frontera y revisión conceptual basada en aprendizajes de construcción, papers y necesidades reales.

**Gates:** un hito no se cierra por volumen de código ni número de campañas. Debe demostrar semántica correcta, evidencia, tenant isolation, resultado verificable y correspondencia con las fichas de capacidad.

## 11. Preguntas abiertas y falsación

1. ¿Qué segmento inicial maximiza valor sin imponer complejidad de enterprise? [H]
2. ¿Qué granularidad de fuentes necesita una previsión de caja realmente útil para pymes con datos incompletos? [H]
3. ¿Qué modelos superan consistentemente baselines simples en cada vertical? [H]
4. ¿Qué partes del gemelo pueden validarse causalmente y cuáles son escenarios condicionales? [H]
5. ¿Cuándo compensa un modelo neuronal su coste, latencia y complejidad? [H]
6. ¿Qué efectos bancarios son posibles mediante proveedores autorizados en España/UE sin que Agntia asuma roles regulados no deseados? [H]
7. ¿Qué límites de datos impiden compartir señales entre empresas incluso con anonimización? [H]
8. ¿Cómo medir utilidad real de una recomendación cuando el contrafactual no es observable? [H]
9. ¿Qué funciones deben vivir en Finanzas y cuáles delegarse a Gestoría/Legal/Seguros según AuthorityMap? [D]
10. ¿Cómo diseñar plantillas sectoriales sin sobreajustar modelos ni inventar precisión? [H]

Cada pregunta requiere responsable, método, evidencia de cierre, coste de investigación y decisión versionada. Las preguntas abiertas **no impiden fijar la visión**, pero impiden afirmar que las hipótesis están demostradas.

## 12. Fuentes y trazabilidad

### Fuentes del repositorio existentes, preservadas
- [Producto actual](../01-producto.md)
- [Investigación y papers registrados](../02-investigacion.md)
- [Referentes y brechas](../03-referentes-y-brechas.md)
- [Adaptadores y licencias](../04-adaptadores.md)
- [Arquitectura](../architecture/01-arquitectura.md)
- [Runtime determinista](../architecture/04-runtime.md)
- [Contratos](../contracts/01-contratos.md)
- [Mapa de fuentes primarias](../research/sources.json)

### Investigación adicional de esta revisión (fuentes primarias/técnicas)
- Athanasopoulos et al., *Forecast reconciliation: A review*, International Journal of Forecasting (2024): https://doi.org/10.1016/j.ijforecast.2023.10.010
- Nixtla StatsForecast: https://github.com/Nixtla/statsforecast
- Nixtla HierarchicalForecast: https://github.com/Nixtla/hierarchicalforecast
- Nixtla NeuralForecast: https://github.com/Nixtla/neuralforecast
- Anaplan agentic enterprise: https://www.anaplan.com/news/anaplan-introduces-the-agentic-enterprise/
- Pigment AI: https://kb.pigment.com/docs/pigment-ai
- Workday Adaptive Planning: https://www.workday.com/en-us/products/adaptive-planning/overview.html
- Reglamento general de protección de datos: https://eur-lex.europa.eu/eli/reg/2016/679/oj
- Reglamento de IA UE: https://eur-lex.europa.eu/eli/reg/2024/1689/oj

**Alcance de la investigación:** revisión selectiva de documentación del repo y fuentes técnicas; **no** revisión sistemática de todos los papers ni pruebas de todos los competidores. Los nombres de proveedores adicionales constituyen una agenda explícita de benchmarking. La versión 1.0 es un **concepto maestro evolutivo**, no certificación de excelencia absoluta ni producto construido.

## 13. Política de evolución del concepto

`CONCEPT-MASTER.md` es la visión de referencia de destino. Cada revisión V1.x añade investigación, precisa capacidades o resuelve ADRs; una V2 puede reimaginar el producto tras la construcción o nuevos descubrimientos. No borrar historia ni cambiar silenciosamente el significado de una capacidad. Los agentes y desarrolladores deben perseguir el concepto, **no encoger el concepto para justificar lo implementado**. Toda brecha se registra como trabajo pendiente, limitación aceptada o hipótesis descartada con evidencia.
