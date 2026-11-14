# Arquitectura objetivo — Finanzas

Servicio TS/pnpm/Hono, Zod, Postgres RLS, JWT Supabase+membresías, dominio Money Decimal/currency/exponent, cuentas y periodos, ingesta CSV, fuentes bancarias read-only, ERPNext y ledgers Beancount/hledger opcionales, conciliación propuesta, AR/AP, presupuestos, DSL de fórmulas determinista, escenarios/forecast/runway, reporting Metabase/local, workbook, SDK y portal Anam. Agentes canónicos y policy en padre; twins aquí bajo mandato. No transferencias ni pagos reales por defecto.

`JWT+membership → Hono → policy/AuthorityMap → FinancialIntent/version/approval → RLS+audit/outbox → scoped worker → read-only adapter → receipts/reconciliation → parent bridge`. Separar hechos verificados, cálculos y proyecciones con provenance y corte temporal.
