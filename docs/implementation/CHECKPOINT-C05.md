# Checkpoint C05 · baseline ejecutable de fundaciones

2026-11-15 · rama `freebuff/eb82fba44c09de96a765bf93` · base `f811638`

Este informe describe **lo ejecutado**, no lo planificado. Los gates de campaña
siguen `NOT_EXECUTED` cuando requieren host/tenants/persistencia reales.

## 1. Baseline y entorno

| Dato | Valor |
|---|---|
| SHA base heredado | `f811638c9bee34efa99d46be5422e044089794db` |
| SHA del padre | `54b8d5407a8576459448c4d059a877297d18ca7a` (documentado; **no re-verificado** aquí) |
| Estado inicial | Sólo documentación: 64 `.md` + 5 `.json`, sin `package.json` ni tests |
| Directorios citados por la prompt maestra | `docs/factory`, `docs/prep`, `docs/execution-program`, `docs/implementation`, `FreeBuff/`: **no existían** |
| Node | v26.13.0 |
| pnpm | 10.34.9 |
| TypeScript | 5.9.3 (strict, `noUncheckedIndexedAccess`) |
| vitest | 2.1.9 |
| zod / jose / hono / decimal.js | 3.25.76 / 5.x / 4.x / 10.x |

## 2. Módulos creados

- `packages/contracts`: `capabilities.ts`, `ids.ts`, `money.ts`, `domain.ts`, `errors.ts`, `evidence.ts`, `identity.ts`, `envelope.ts`.
- `packages/core`: `arithmetic.ts` (Decimal, escala, moneda, variance).
- `packages/auth`: `verify.ts`, `policy.ts`, `mandate.ts`.
- `apps/api`: `app.ts`, `server.ts`.
- Infra: `package.json` raíz, `pnpm-workspace.yaml`, `tsconfig.base.json`, `vitest.config.ts`, `.github/workflows/ci.yml`, `.env.example`, `.gitignore`.

## 3. Campañas C01–C05

| Campaña | Implementado | Pendiente |
|---|---|---|
| C01 Baseline | Workspace reproducible, congelación de SHA propio, CI, `.env.example` | Re-cotejo del SHA del padre contra el remoto real |
| C02 Autoridad por dominio | `AuthorityMap`, `WorkOrder`, custodio/ejecutor/revisor como contrato validado | Persistencia y verificación de contratos por tenant |
| C03 Supabase JWT y principal | Verificación firma/issuer/audience/tiempos, JWKS fijo por servidor, tenant desde claims no editables, membership provisionada, deny-by-default | Supabase real, revocación en caliente, JWKS remoto real |
| C04 Twins y nomenclatura | `TwinBinding`, `DelegationMandate`, `isMandateActive`, revalidación por job | Bridge con el padre y resolución de identidad canónica real |
| C05 DTOs, esquemas y errores | Envelope estricto con límite de tamaño, Money decimal, EvidenceRef, ApprovalBinding, OperationResult, CapabilityReport, códigos de error cerrados con mapeo HTTP | Persistencia de revisions/evidence/intents |

Tareas del manifest: C01–C05 cubren el andamiaje de sus `T01`–`T07` en lo que es
código puro. Las tareas de verificación con entorno real (`T06`/`T07` con host,
tenants, receipts) quedan `NOT_EXECUTED`.

## 4. Checks ejecutados

```
pnpm typecheck   → exit 0 (3 paquetes + app)
pnpm test        → 3 archivos, 41 tests, 41 passed, 0 failed, 0 skipped
```

Cobertura de los tests ejecutados:

| Suite | Casos |
|---|---|
| `packages/core/test/arithmetic.test.ts` (8) | Decimal exacto, rechazo de mezcla de monedas, escala, negativo cero, comparación, variance, suma homogénea |
| `packages/auth/test/auth.test.ts` (23) | Token válido; expirado; issuer/audience ajenos; HS256 simétrico rechazado; `alg:none` rechazado; claims de tenant contradictorios; token sin tenant; `user_metadata` ignorado como autoridad; token malformado/sobredimensionado; membership ausente/suspendida/revocada/desalineada; recurso de otro tenant → 404; grant ausente; campo fuera del grant; capability no delegada; mandato expirado/revocado/otro tenant/otra capability/otro recurso |
| `apps/api/test/api.test.ts` (10) | `/healthz`; 401 sin token y con firma falsa; principal resuelto con `cache-control: private, no-store`; recurso concedido; recurso de otro tenant → 404; sin grant → 403; campo no permitido → 403; catálogo vacío; ruta desconocida → 404 sanitizado |

## 5. Gates

`FIN-C01-G01..G02` y equivalentes de C02–C05: **NOT_EXECUTED** como gates de
campaña. Los escenarios que sí son comprobables sin host están cubiertos por
los tests anteriores (p. ej. cross-tenant, claim hostil, approval de agente).
No se declara ningún gate PASS por analogía.

## 6. Desviaciones y deuda

1. La prompt maestra cita un handoff en `FreeBuff/`; no existía. Se crea `FreeBuff/HANDOFF-RECONCILED.md` como entrada, sin alterar `docs/release/HANDOFF.md`.
2. Los artefactos por campaña previstos (`docs/implementation/c0X/README|EVIDENCE|TESTS|RISKS.md`) se consolidan aquí para evitar 20 documentos casi idénticos; el contenido exigido (estado, tests, riesgos, decisión) está presente.
3. `campaign.json` conserva el estado de planificación (`NOT_STARTED`). El estado real se lee en este informe y en el README.
4. No hay `Docker`, Postgres ni Supabase disponibles: toda persistencia y todo gate de aislamiento real quedan pendientes.
5. El `pnpm-lock.yaml` se genera en este entorno; CI lo consume con `--frozen-lockfile`.

## 7. Riesgos abiertos

- Sin RLS probado, la autorización vive sólo en la capa de aplicación: no es suficiente para producción.
- El JWKS remoto no se ejercitó contra un proyecto Supabase real; la verificación local cubre criptografía y claims, no la configuración del proyecto.
- `OperationResult`/`ApprovalBinding` existen como contratos, pero no hay almacén durable: idempotencia y reconciliación no están implementadas.
- Anam, Metabase, ERPNext, Beancount/hledger y fuentes bancarias siguen `NOT_IMPLEMENTED`/`NOT_VERIFIED`; ninguna capacidad se oferta como disponible.

## 8. Siguiente dependencia

C06: migraciones Postgres con RLS, roles `api`/`worker`, FKs compuestas por
tenant, CAS/audit/outbox, y pruebas de aislamiento A/B ejecutables en CI
(Postgres real o PGlite). Después C07 (mandatos/aprobaciones persistentes) y
C09–C12 (modelo económico, ingesta, mapping, hechos monetarios).
