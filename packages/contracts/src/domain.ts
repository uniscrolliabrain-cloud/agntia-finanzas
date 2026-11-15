import { z } from 'zod';

/**
 * Estados de dominio propuestos por el servicio. No son enums existentes del
 * padre; se mapean por bridge cuando proceda (docs/campaigns/03, docs/contracts).
 */
export const DOMAIN_STATES = [
  'ingested_unverified',
  'mapping_blocked',
  'reconciled_proposed',
  'reviewed',
  'planned',
  'approved',
  'stale',
  'conflict',
  'superseded',
  'unknown',
] as const;

export const domainStateSchema = z.enum(DOMAIN_STATES);
export type DomainState = z.infer<typeof domainStateSchema>;

/**
 * Estado de operación, separado del estado del dato. Confirmar aceptación
 * remota no confirma entrega, resultado profesional ni satisfacción.
 */
export const OPERATION_STATES = [
  'proposed',
  'needs_review',
  'approved',
  'queued',
  'running',
  'accepted',
  'confirmed',
  'failed_definitive',
  'outcome_unknown',
  'reconciliation_required',
  'cancelled',
] as const;

export const operationStateSchema = z.enum(OPERATION_STATES);
export type OperationState = z.infer<typeof operationStateSchema>;

/** Estados terminales: no admiten transición a efecto nuevo. */
export const TERMINAL_OPERATION_STATES: readonly OperationState[] = [
  'confirmed',
  'failed_definitive',
  'cancelled',
] as const;

export function isTerminalOperationState(state: OperationState): boolean {
  return TERMINAL_OPERATION_STATES.includes(state);
}

/**
 * Entidades del dominio. Declaradas como nuevas; ninguna es alias automático de
 * un modelo del proveedor o del padre.
 */
export const DOMAIN_ENTITIES = [
  'CompanyFact',
  'FinancialSource',
  'AccountMapping',
  'TransactionFact',
  'LedgerProjection',
  'ReconciliationProposal',
  'BudgetVersion',
  'ForecastRun',
  'Scenario',
  'Assumption',
  'FXObservation',
  'Receivable',
  'Payable',
  'CashPosition',
  'CloseChecklist',
  'ReportSnapshot',
  'PaymentProposal',
] as const;

export const domainEntitySchema = z.enum(DOMAIN_ENTITIES);
export type DomainEntity = z.infer<typeof domainEntitySchema>;

/** Aristas de la FSM de operación que el servicio permite. */
export const OPERATION_TRANSITIONS: Readonly<Record<OperationState, readonly OperationState[]>> = {
  proposed: ['needs_review', 'approved', 'cancelled'],
  needs_review: ['approved', 'cancelled'],
  approved: ['queued', 'cancelled'],
  queued: ['running', 'cancelled'],
  running: ['accepted', 'failed_definitive', 'outcome_unknown'],
  accepted: ['confirmed', 'outcome_unknown', 'reconciliation_required'],
  confirmed: [],
  failed_definitive: [],
  outcome_unknown: ['reconciliation_required', 'confirmed', 'failed_definitive'],
  reconciliation_required: ['confirmed', 'failed_definitive'],
  cancelled: [],
};

export function canTransition(from: OperationState, to: OperationState): boolean {
  return OPERATION_TRANSITIONS[from].includes(to);
}
