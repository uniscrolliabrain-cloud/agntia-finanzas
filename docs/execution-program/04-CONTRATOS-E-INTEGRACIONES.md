# Contratos — Finanzas

Fuentes: `docs/contracts/01-contratos.md`, `docs/architecture/01-arquitectura.md`, `docs/architecture/02-identidad-twins.md`, `docs/architecture/03-compatibilidad-agente.md`, `docs/architecture/04-runtime.md`.

JWT Supabase+membresía y ACL cuentas/periodos, originTenant/targetTenant, twin bajo mandato. Money con Decimal, ISO currency, exponente, signo, fuente, effectiveAt y observedAt; no float para importes. CashPosition solo saldos de misma fecha/moneda, FX explícito con fuente/fecha. Variance = actual-budget con convención; runway con burn y ventana documentados. Fórmulas DSL DAG con unidades y límites, nunca eval/SQL del LLM. ERPNext/Beancount/hledger/banca read-only con discovery, provenance y reconciliación. PaymentProposal no equivale a PaymentExecution; approval por efecto, idempotencia, no pagos ni transferencias sin mandato y autorización explícita. RLS, auditoría, retención y minimización de datos financieros.
