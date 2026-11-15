import { z } from 'zod';

/**
 * Capacidades nominadas del servicio (docs/contracts/01-contratos.md).
 * No son endpoints genéricos ni aliases del padre: cada una corresponde a una
 * operación de dominio concreta y se autoriza por principal + scope.
 */
export const CAPABILITIES = [
  'finance.company.preview',
  'finance.import.preview',
  'finance.mapping.propose',
  'finance.fact.normalize',
  'finance.erp.preview',
  'finance.ledger.preview',
  'finance.bank.read',
  'finance.sync.stage',
  'finance.reconcile.preview',
  'finance.cash.snapshot',
  'finance.receivables.read',
  'finance.payables.read',
  'finance.budget.propose',
  'finance.model.validate',
  'finance.scenario.propose',
  'finance.forecast.run',
  'finance.fx.preview',
  'finance.variance.explain',
  'finance.unit-economics.run',
  'finance.stress.run',
  'finance.close.propose',
  'finance.workbook.preview',
  'finance.payment.propose',
  'finance.dashboard.read',
] as const;

export const capabilitySchema = z.enum(CAPABILITIES);
export type Capability = z.infer<typeof capabilitySchema>;

/**
 * Capacidades que producen una propuesta con efecto potencial: exigen
 * ApprovalBinding vigente antes de convertirse en intent ejecutable.
 * `finance.payment.propose` existe como propuesta; ejecutar un pago queda
 * fuera del piloto y del catálogo inicial.
 */
export const APPROVAL_REQUIRED_CAPABILITIES: readonly Capability[] = [
  'finance.payment.propose',
  'finance.budget.propose',
  'finance.close.propose',
] as const;

/** Catálogo inicial de tools expuesto a modelo/agent (allowlist exacta). */
export const TOOL_ALLOWLIST = [
  'finance_cash_read',
  'finance_transaction_preview',
  'finance_reconcile_propose',
  'finance_budget_propose',
  'finance_forecast_explain',
  'finance_report_read',
  'finance_payment_propose',
] as const;

export const toolNameSchema = z.enum(TOOL_ALLOWLIST);
export type ToolName = z.infer<typeof toolNameSchema>;

/** Tools que nunca se exponen: approve/send/export_all/admin y efectos sensibles. */
export const FORBIDDEN_TOOL_PREFIXES = ['admin.', 'system.', 'provider.'] as const;

export function requiresApproval(capability: Capability): boolean {
  return APPROVAL_REQUIRED_CAPABILITIES.includes(capability);
}
