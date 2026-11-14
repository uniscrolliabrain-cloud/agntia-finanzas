# Pipeline conceptual y ejecución posterior

**Hoy:** arquitecto ChatGPT + founder diseñan PREP y boilerplate. **Después:** Astra hace meta-auditoría conceptual libre, sin rúbrica prescriptiva ni exigencia de código inexistente; nosotros reconciliamos sus ideas. **Finalmente:** se granularizan campañas; Freebuff implementa, Codex revisa SHA congelado, arquitecto arbitra contratos, founder aprueba.

## Estados
`PREP → META_AUDIT_PENDING → META_AUDIT_REVIEWED → ARCHITECTURE_RECONCILED → CAMPAIGNS_GRANULARIZED → READY_PER_CAMPAIGN → IMPLEMENTING → REVIEWING → ARCH_REVIEW → FOUNDER_APPROVAL → MERGED`. No crear meta-audits ficticios ni marcar READY por un scaffold.

## Handoffs y ramas
`HANDOFF-FREEBUFF.md`, `HANDOFF-CODEX.md`, `HANDOFF-ARCHITECT-FOUNDER.md` son instrucciones marco, no órdenes de ejecución. En fase granular posterior cada campaña tendrá `PATCHSETS.md` por archivo/función/wiring, `ACCEPTANCE.md`, tests negativos, evidencias, rollback y handoffs propios. Un writer por superficie; una rama por campaña; Codex no edita rama implementadora; gate dependiente de contrato congelado. Founder autoriza merge, accesos externos, gastos y despliegues; merge no equivale deploy.
