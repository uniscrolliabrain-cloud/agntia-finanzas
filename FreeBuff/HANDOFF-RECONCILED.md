# Handoff reconciliado · agntia-finanzas

2026-11-15. Punto de entrada para cualquier agente o auditor que continúe este repositorio.
Sustituye en la práctica a `FreeBuff/` (no existía en el repo) y no reemplaza la documentación original.

## Identidad y alcance

- Repositorio: `uniscrolliabrain-cloud/agntia-finanzas`. Rama de trabajo: `freebuff/eb82fba44c09de96a765bf93`.
- Baseline heredado: `f811638` (`docs: publish research, architecture and 42 implementation campaigns`), árbol limpio al inicio de esta fase.
- Padre `uniscrolliabrain-cloud/agente`: **no modificado, no clonado aquí**. SHA documentado `54b8d5407a8576459448c4d059a877297d18ca7a`; en este entorno es `NOT_VERIFIED` (no se accedió al remoto del padre).
- Programa: 42 campañas / 294 tareas / 84 escenarios en `docs/campaigns/campaign.json`. El manifest conserva el estado de planificación; el estado de ejecución real vive en [CHECKPOINT-C05](../docs/implementation/CHECKPOINT-C05.md).

## Qué existe hoy

| Área | Estado |
|---|---|
| Documentación de producto, arquitectura, contratos, campañas | Completa (entrega 2026-11-13) |
| `packages/contracts` | Implementado: DTOs zod estrictos, Money decimal, errores, evidence, approval, capability, twin/mandato/authority |
| `packages/core` | Implementado: aritmética monetaria determinista, variance (base de C09/C12/C18/C26) |
| `packages/auth` | Implementado: verificación JWT Supabase, principal con membership, PEP recurso/campo, revalidación de mandato |
| `apps/api` | Implementado: Hono nominado, errores sanitizados, catálogo fail-closed |
| Persistencia/RLS (C06) | **No implementado** |
| Adaptadores (C13/C14/C15/C32) | **No implementados** |
| Dominio económico (C09–C32) | **No implementado** (sólo shared kernel monetario) |
| UI/Anam (C33/C34) | **No implementado** |
| SDK/bridge (C35/C36) | Diseño en `docs/integration/`, sin código |
| E2E y gates reales | **NOT_EXECUTED** |

## Cómo verificar

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test        # 41 tests
```

Requiere Node >= 22 y pnpm 10. La API (`apps/api/src/server.ts`) exige `SUPABASE_ISSUER`, `SUPABASE_AUDIENCE`, `SUPABASE_JWKS_URL` y falla cerrada si faltan.

## Estado de campañas

- C01–C05: scaffolding implementado con tests locales ejecutados. Gates de campaña siguen `NOT_EXECUTED` porque exigen host, tenants provisionados y persistencia real.
- C06–C42: `NOT_STARTED`.
- No existe ningún proveedor conectado, cuenta real, dato de cliente ni efecto externo.

## Reglas que no se negocian

1. Deny-by-default; sin fallback admin/owner/default.
2. `user_metadata`, claims del modelo y nombres/personas no conceden autoridad.
3. Money Decimal con currency/escala; nunca float; no sumar monedas distintas sin FX con fuente y fecha.
4. LLM propone; PEP/FSM/cálculo y revisión humana determinan efecto.
5. Approval ligada a hash/versión/tenant/destinatario/alcance/coste/expiración; cambio material la invalida.
6. Idempotencia durable; timeout tras posible efecto se reconcilia, nunca retry ciego.
7. Sin pagos, transferencias, cambio de cuenta bancaria, conciliación posteada, inversión personalizada ni presentación fiscal en piloto.
8. `documentado ≠ instalado`, `mock ≠ proveedor`, `test planeado ≠ test ejecutado`.
9. No modificar `agente` ni repos hermanos; cambios en el padre se entregan como propuesta.

## Siguiente paso

C06 (persistencia, RLS y migraciones) con Postgres real o PGlite en CI, incluyendo roles `api`/`worker`, FKs compuestas por tenant y pruebas de aislamiento A/B. Ver dependencias y riesgos en el checkpoint.
