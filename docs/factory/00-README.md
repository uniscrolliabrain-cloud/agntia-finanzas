# Agntia Engineering Factory — Perfil Finanzas

**factoryVersion: 0.1.0 | domainProfile: finanzas | DESIGN/PREP | 2026-11-13**

Meta: preparar visión, contratos, léxico, trazabilidad, cooperación y 42 scaffolds **sin granularizar patchsets ni implementar código**. Una meta-auditoría conceptual independiente del founder llegará posteriormente y podrá replantear decisiones.

## Orden de lectura
1. `docs/prep/README.md` y `docs/factory/00-README.md` a `06-READINESS-AUDIT.md`.
2. `docs/01-producto.md`, `docs/architecture/`, `docs/contracts/`, `docs/05-seguridad-privacidad.md`, `docs/research/`.
3. `docs/campaigns/campaign.json`, campaña original y `docs/implementation/NN-*/README.md`.
4. Handoffs marco de `docs/factory/`; contexto N−1/N/N+1 y SHA padre antes de ejecución futura.

## Invariantes
AgntiaPro padre es autoridad de identidades, kernel, grafo, bus, SOPs, policy y agentes canónicos. Los profesionales financieros son especialistas vinculados (twins), no empleados full-time dedicados ni segundo kernel. Funcionalidad duplicada permitida; efecto único por intención y mandato. Deny-by-default, fail-closed, RLS/ACL, datos minimizados, aprobaciones, outbox e idempotencia. LLM propone y explica; cálculo monetario determinista usa Decimal, moneda, unidades y fecha. No pagos ni accesos bancarios sin habilitación específica. No tocar padre/main ni proveedores.

## Etiquetas de certeza
`DOC_ONLY`, `PROPOSED`, `CODE_VERIFIED`, `TEST_VERIFIED`, `STALE`, `UNKNOWN`. Los documentos no prueban capacidades. El boilerplate se versiona; cada repo conserva independencia conceptual.
