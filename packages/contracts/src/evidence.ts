import { z } from 'zod';
import { capabilitySchema } from './capabilities.js';
import { instantSchema, opaqueIdSchema, tenantIdSchema, currencyCodeSchema } from './ids.js';
import { moneySchema } from './money.js';

/**
 * EvidenceRef: procedencia mínima de un hecho, inferencia, afirmación de usuario
 * u observación. `confidence` no es permiso ni prueba.
 */
export const evidenceKindSchema = z.enum(['fact', 'inference', 'user_assertion', 'observation']);
export type EvidenceKind = z.infer<typeof evidenceKindSchema>;

export const evidenceRefSchema = z
  .object({
    id: opaqueIdSchema,
    tenantId: tenantIdSchema,
    resourceScope: opaqueIdSchema,
    originalCustodian: z.string().min(1).max(128),
    sourceObjectRef: z.string().min(1).max(256),
    sourceHash: z.string().regex(/^[a-z0-9]+:[0-9a-f]{16,128}$/).optional(),
    mapperVersion: z.string().min(1).max(64),
    observedAt: instantSchema,
    effectiveAt: instantSchema.optional(),
    kind: evidenceKindSchema,
    reviewRef: opaqueIdSchema.optional(),
  })
  .strict();

export type EvidenceRef = z.infer<typeof evidenceRefSchema>;

/** ExternalLink: identidad externa opaca, nunca mapeada por nombre/posición. */
export const externalLinkSchema = z
  .object({
    tenantId: tenantIdSchema,
    connectionId: opaqueIdSchema,
    provider: z.string().min(1).max(64),
    model: z.string().min(1).max(64),
    externalId: z.string().min(1).max(256),
    localKind: z.string().min(1).max(64),
    localId: opaqueIdSchema,
    remoteVersion: z.string().min(1).max(128).optional(),
    sourceHash: z.string().min(1).max(256).optional(),
    lastSeenAt: instantSchema,
  })
  .strict();

export type ExternalLink = z.infer<typeof externalLinkSchema>;

export const proposalRevisionSchema = z
  .object({
    resourceId: opaqueIdSchema,
    version: z.number().int().min(1),
    capability: capabilitySchema,
    structuredInputs: z.record(z.string(), z.unknown()),
    artifacts: z.array(opaqueIdSchema).max(100).default([]),
    sources: z.array(opaqueIdSchema).max(500).default([]),
    pendingFacts: z.array(z.string().max(256)).max(500).default([]),
    scopeHash: z.string().regex(/^[a-z0-9]+:[0-9a-f]{16,128}$/),
    modelConfigRef: z.string().min(1).max(128).optional(),
    policyVersion: z.string().min(1).max(64),
    warnings: z.array(z.string().max(512)).max(100).default([]),
  })
  .strict();

export type ProposalRevision = z.infer<typeof proposalRevisionSchema>;

/**
 * ApprovalBinding: ata tenant, recurso, revisor humano verificado, hash de
 * contenido/alcance/rights/policy, destinatario, coste y caducidad.
 * Cualquier cambio material la invalida.
 */
export const approvalBindingSchema = z
  .object({
    id: opaqueIdSchema,
    tenantId: tenantIdSchema,
    resourceId: opaqueIdSchema,
    resourceVersion: z.number().int().min(1),
    reviewerId: opaqueIdSchema,
    reviewerKind: z.enum(['human', 'agent_reviewer']),
    proofRef: z.string().min(1).max(256),
    payloadHash: z.string().regex(/^[a-z0-9]+:[0-9a-f]{16,128}$/),
    rightsHash: z.string().regex(/^[a-z0-9]+:[0-9a-f]{16,128}$/).optional(),
    policyHash: z.string().regex(/^[a-z0-9]+:[0-9a-f]{16,128}$/),
    recipient: z.string().min(1).max(256).optional(),
    channel: z.string().min(1).max(64).optional(),
    costCeiling: moneySchema.optional(),
    issuedAt: instantSchema,
    expiresAt: instantSchema,
    revocationVersion: z.number().int().min(0),
  })
  .strict()
  .superRefine((approval, ctx) => {
    if (approval.reviewerKind === 'agent_reviewer') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['reviewerKind'],
        message: 'an agent reviewer cannot bind a sensitive effect',
      });
    }
    if (Date.parse(approval.expiresAt) <= Date.parse(approval.issuedAt)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['expiresAt'], message: 'expiresAt must be after issuedAt' });
    }
  });

export type ApprovalBinding = z.infer<typeof approvalBindingSchema>;

export const operationResultStatusSchema = z.enum([
  'accepted',
  'confirmed',
  'outcome_unknown',
  'failed_definitive',
  'reconciliation_required',
]);

export const operationResultSchema = z
  .object({
    status: operationResultStatusSchema,
    operationId: opaqueIdSchema,
    localRefs: z.array(opaqueIdSchema).max(100).default([]),
    remoteRefs: z.array(z.string().min(1).max(256)).max(100).default([]),
    evidenceRefs: z.array(opaqueIdSchema).max(100).default([]),
    payloadHash: z.string().regex(/^[a-z0-9]+:[0-9a-f]{16,128}$/),
    warnings: z.array(z.string().max(512)).max(100).default([]),
    retryable: z.boolean(),
    reconciliationRequired: z.boolean(),
    actualScope: z.array(z.string().max(128)).max(100).default([]),
  })
  .strict()
  .superRefine((result, ctx) => {
    if (result.status === 'outcome_unknown' && !result.reconciliationRequired) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['reconciliationRequired'],
        message: 'outcome_unknown requires reconciliation',
      });
    }
    if (result.status === 'failed_definitive' && result.retryable) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['retryable'],
        message: 'a definitive failure is not retryable',
      });
    }
  });

export type OperationResult = z.infer<typeof operationResultSchema>;

/** CapabilityReport: lo declarado no es lo verificado en runtime. */
export const capabilityStatusSchema = z.enum([
  'documented',
  'verified_runtime',
  'unknown',
  'unsupported',
  'forbidden',
  'not_configured',
]);
export type CapabilityStatus = z.infer<typeof capabilityStatusSchema>;

export const DISABLED_CAPABILITY_STATUSES: readonly CapabilityStatus[] = [
  'unknown',
  'unsupported',
  'forbidden',
  'not_configured',
] as const;

export const capabilityReportSchema = z
  .object({
    capability: capabilitySchema,
    connectionId: opaqueIdSchema.optional(),
    deployment: z.string().min(1).max(128),
    edition: z.string().min(1).max(64).optional(),
    version: z.string().min(1).max(64),
    status: capabilityStatusSchema,
    confirmedOperations: z.array(z.string().max(128)).max(200).default([]),
    confirmedFields: z.array(z.string().max(128)).max(500).default([]),
    observedAt: instantSchema,
    expiresAt: instantSchema.optional(),
    errors: z.array(z.string().max(512)).max(50).default([]),
    evidenceRefs: z.array(opaqueIdSchema).max(50).default([]),
  })
  .strict();

export type CapabilityReport = z.infer<typeof capabilityReportSchema>;

export function isCapabilityEnabled(report: CapabilityReport, now = new Date()): boolean {
  if (DISABLED_CAPABILITY_STATUSES.includes(report.status)) return false;
  if (report.expiresAt && Date.parse(report.expiresAt) <= now.getTime()) return false;
  return report.status === 'verified_runtime';
}

/** Currency helper re-exported for report money ceilings. */
export const reportCurrencySchema = currencyCodeSchema;
