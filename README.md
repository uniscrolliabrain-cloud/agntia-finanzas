# agntia-finanzas

Finanzas empresariales, tesorería y FP&A: diseño de empresa SaaS especialista con middleware hacia AgntiaPro/`agente`.

**Estado real (2026-11-15):** documentación completa + scaffolding ejecutable de las fundaciones C01–C05. `pnpm test` ejecuta 41 tests y pasa; no hay persistencia, adaptadores, UI ni E2E todavía. Ninguna capacidad de dominio está habilitada: el catálogo responde vacío y toda integración externa es `NOT_VERIFIED`. Las 42 campañas del manifest siguen siendo el plan; C01–C05 están implementadas a nivel de contratos/identidad y C06–C42 permanecen `NOT_STARTED`.

Convertir datos económicos autorizados en caja, planificación y decisiones explicables con cálculo determinista, sin confundir un forecast con saldo real o autorización de pago.

Se presta servicio a empresas del padre y a clientes externos mediante portal propio. Agentes canónicos en `/agente`, twins vinculados aquí; todos los modos con JWT Supabase, membresía/ACL verificados y aislamiento de datos/jobs/archivos/búsqueda/Realtime/exportaciones. **No se modifica agente.**

## Código

| Ruta | Contenido |
|---|---|
| `packages/contracts` | DTOs zod estrictos: Money decimal, envelope, errores, EvidenceRef, ApprovalBinding, CapabilityReport, TwinBinding, mandato, AuthorityMap |
| `packages/core` | Kernel determinista: aritmética monetaria Decimal, signos por fuente, variance |
| `packages/auth` | Verificación JWT Supabase (JWKS fijo por servidor), principal con membership provisionada, PEP recurso/campo, revalidación de mandato |
| `apps/api` | API Hono nominada con errores sanitizados y catálogo de capacidades fail-closed |

```bash
pnpm install
pnpm typecheck
pnpm test
```

Variables de entorno sólo por nombre en `.env.example`; valores por Doppler/secretos del host. Sin configuración válida la API no arranca.

## Leer en orden

1. [Informe de checkpoint C05](docs/implementation/CHECKPOINT-C05.md) · [handoff reconciliado](FreeBuff/HANDOFF-RECONCILED.md).
2. [Producto y capacidades](docs/01-producto.md), [investigación](docs/02-investigacion.md), [comparación](docs/03-referentes-y-brechas.md), [repos/licencias](docs/04-adaptadores.md).
3. [Arquitectura](docs/architecture/01-arquitectura.md), [Supabase/twins](docs/architecture/02-identidad-twins.md), [padre](docs/architecture/03-compatibilidad-agente.md), [runtime](docs/architecture/04-runtime.md), [contratos](docs/contracts/01-contratos.md).
4. [Seguridad](docs/05-seguridad-privacidad.md), [UX/Anam](docs/06-ux-anam.md), [SaaS/cooperación](docs/07-servicio.md), [coste](docs/08-costes.md), [evaluación](docs/09-evaluacion.md).
5. [42 campañas](docs/campaigns/README.md), [manifest](docs/campaigns/campaign.json), [handoff](docs/release/HANDOFF.md), [informe](docs/release/INFORME-AL-OWNER.md), [aceptación](docs/release/PILOT-ACCEPTANCE.md), [runbook](docs/operations/RUNBOOK.md).
6. [Doppler](docs/integration/DOPPLER.md) · [bridge con el padre](docs/integration/AGENTE-BRIDGE.md).

Vertical propuesta: Extractos sintéticos y facturas → staging/unverified → mapping/revisión → conciliación propuesta → caja y presupuesto → escenario → revisión humana → reporte reproducible; PaymentProposal queda sin ejecutar.

Límite inicial: Sin pagos/transferencias, cambio de cuenta bancaria, conciliación contable posteada, recomendación personalizada de inversión o presentación fiscal en piloto. Fiscalidad acotada y emisión pertenecen a puertos de gestoría/ERP con revisión, no heurística LLM.

Fuentes primarias y repos por SHA: [sources](docs/research/sources.json), [repos](docs/research/repositories.json), [mapa padre](docs/research/parent-source-map.json). SHA del padre documentado: `54b8d5407a8576459448c4d059a877297d18ca7a` (no re-verificado en este entorno).
