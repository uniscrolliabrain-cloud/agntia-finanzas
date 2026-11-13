# Investigación y decisiones

Fuentes primarias consultadas selectivamente 2026-11-13; no revisión sistemática ni benchmarks reproducidos. El registro separa abstract/README/documentación/anuncio, acceso fallido y validación de runtime. Revalidar al implementar porque versiones, planes y leyes pueden cambiar.

| Paper | Decisión de diseño (inferencia propia) |
|---|---|
| P01: MBABench-2.0 · [arXiv](https://arxiv.org/abs/2610.31711) | Exactitud, auditabilidad y mantenibilidad del workbook se evalúan por separado; no basta una celda final. |
| P02: BlueFin · [arXiv](https://arxiv.org/abs/2605.30907) | Probar corrección dinámica de fórmulas y sensibilidad de escenarios además de los valores cacheados. |
| P03: Hedge-Bench · [arXiv](https://arxiv.org/abs/2606.03918) | Forecast con información congelada y cobertura; no convertir este benchmark de mercados en asesoramiento de inversión o score del producto. |

No se trasladan scores, porcentajes, tamaños de muestra o eficacia de los autores a Agntia. Leer un abstract no demuestra replicación de método o licencia de sus datasets. Se diseñarán fixtures originales con datos sintéticos y criterios de estado/efecto/proceso; antes de incorporar harness/datos ajenos revisar licencia, splits, dependencia de modelos y términos.

## Conceptos propuestos

Evidence-to-Effect Ledger une fuente, versión, actor, mandato, propuesta, approval y resultado confirmado. Scope-bound Twin conserva una identidad canónica y especialización local por cliente sin memoria global. Reviewable Decision Contract define hechos, estado protegido, resultado y qué requiere humano/competencia. Son propuestas de ingeniería de esta entrega, no afirmación de novedad científica o patente.

Para Finanzas empresariales, tesorería y FP&A, la decisión particular es: Money con Decimal y currency/exponente; signos de ingreso/gasto/debe/haber explícitos por fuente. CashPosition suma saldos verificados de la misma fecha/moneda o muestra FX fuente/fecha separado. Variance = actual − budget con convención declarada; runway solo con burn definido/ventana y escenarios. Prohibir eval de fórmulas del agente; DSL de cálculo con DAG/unidades/versiones y pruebas de propiedades.

## Referentes actuales

| Referencia | Patrón estudiado |
|---|---|
| V01: Anaplan | Planificación conectada, agentes de análisis y gobierno; no disponibilidad/precio garantizados. |
| V02: Pigment | Patrón de modelos/boards/contexto y revisión de escenarios; API de instalación pendiente. |
| V03: Workday Adaptive | Patrón FP&A y planificación; no reconstruir nómina o consolidación reglada por nombrarlo. |

Las páginas oficiales describen oferta y novedades, no se probaron productos ni cuentas. No adoptar sus claims de cumplimiento, seguridad, productividad o certificaciones como propios. API/plan/edición/territorio y coste son gates de implementación. Fuentes no accesibles se registran, no sustituyen con una afirmación de capacidad. Algunas URLs cambian de ruta o versión: conservar el origen/redirect y no fijar un endpoint por memoria.

## Repos públicos

Se consultaron metadatos, SHA y README de los candidatos de [repositories.json](research/repositories.json). No son una auditoría completa ni se han instalado. Rama main/master/develop/hotfix no es un pin de release. Selección posterior por compatibilidad/licencia/recursos/ACL y evidencia con una instancia aislada. ERPNext GPL-3.0, hledger GPL-3.0 y Beancount GPL-2.0 según metadatos/README deben evaluarse por módulo/distribución. Actual MIT es referencia de presupuesto, no ERP/tesorería empresarial completo. Metabase combina AGPL y Enterprise comercial; un dashboard multiempresa necesita aislamiento de consulta/embedding probado, no una colección con nombre distinto.

## Fuentes jurídicas y de seguridad

Supabase JWT/RLS y Anam se estudiaron en documentación oficial; nunca credenciales ni sesiones reales. Normativa común y específica en Dxx requiere interpretación contextual, territorio/fecha y revisión humana. No prometer cumplimiento universal por importar una librería o tener un dashboard. Un uso no cubierto debe quedar unsupported/needs_review.

| Fuente específica | Qué exige al diseño |
|---|---|
| D01: [RGPD](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | Datos bancarios/empleados/clientes limitados a propósito y acceso. |
| D02: [AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) | Clasificar uso real y responsabilidad; el nombre finanzas no autoriza decisiones significativas. |

Mantener preguntas abiertas: derechos/ediciones, fuente incompleta, verificación real de proveedor, operación humana y coste medido. El mapa del padre conserva lecturas heredadas y nuevas por el mismo SHA; no supone una relectura total. Cualquier divergencia futura se coteja antes del wiring. Nunca modificar el padre para que una prueba propia pase.
