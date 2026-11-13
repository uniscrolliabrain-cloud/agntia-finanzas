# agntia-finanzas

Finanzas empresariales, tesorería y FP&A: diseño de empresa SaaS especialista con middleware hacia AgntiaPro/`agente`. Entrega documental de la familia Agntia · 2026-11-13.

**DOCUMENTATION_ONLY. No hay aplicación, SDK, proveedores conectados o tests de producto ejecutados. Las 42 campañas están NOT_STARTED; sus pruebas están NOT_EXECUTED.** Aspiración de calidad inspirada en referentes mundiales; no afirmación de paridad, certificación o cumplimiento universal.

Convertir datos económicos autorizados en caja, planificación y decisiones explicables con cálculo determinista, sin confundir un forecast con saldo real o autorización de pago.

Se presta servicio a empresas del padre y a clientes externos mediante portal propio. Agentes canónicos en `/agente`, twins vinculados aquí; todos los modos con JWT Supabase, membresía/ACL verificados y aislamiento de datos/jobs/archivos/búsqueda/Realtime/exportaciones. Se permite duplicación de funciones con repos hermanos; un AuthorityMap por encargo fija responsables para evitar doble efecto. **No se modifica agente.**

## Leer en orden

1. [Producto y capacidades](docs/01-producto.md), [investigación](docs/02-investigacion.md), [comparación](docs/03-referentes-y-brechas.md), [repos/licencias](docs/04-adaptadores.md).
2. [Arquitectura](docs/architecture/01-arquitectura.md), [Supabase/twins](docs/architecture/02-identidad-twins.md), [padre](docs/architecture/03-compatibilidad-agente.md), [runtime](docs/architecture/04-runtime.md), [contratos](docs/contracts/01-contratos.md).
3. [Seguridad](docs/05-seguridad-privacidad.md), [UX/Anam](docs/06-ux-anam.md), [SaaS/cooperación](docs/07-servicio.md), [coste](docs/08-costes.md), [evaluación](docs/09-evaluacion.md).
4. [42 campañas](docs/campaigns/README.md), [manifest](docs/campaigns/campaign.json), [handoff](docs/release/HANDOFF.md), [informe](docs/release/INFORME-AL-OWNER.md), [aceptación](docs/release/PILOT-ACCEPTANCE.md), [runbook](docs/operations/RUNBOOK.md).

Vertical propuesta: Extractos sintéticos y facturas → staging/unverified → mapping/revisión → conciliación propuesta → caja y presupuesto → escenario → revisión humana → reporte reproducible; PaymentProposal queda sin ejecutar.

Límite inicial: Sin pagos/transferencias, cambio de cuenta bancaria, conciliación contable posteada, recomendación personalizada de inversión o presentación fiscal en piloto. Fiscalidad acotada y emisión pertenecen a puertos de gestoría/ERP con revisión, no heurística LLM.

Fuentes primarias y repos por SHA: [sources](docs/research/sources.json), [repos](docs/research/repositories.json), [mapa padre](docs/research/parent-source-map.json). [Validación](docs/release/document-validation.json) comprueba documentos, no acredita producto. SHA del padre cotejado: `54b8d5407a8576459448c4d059a877297d18ca7a`.
