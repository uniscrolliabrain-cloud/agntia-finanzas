import { z } from 'zod';
import { capabilitySchema } from './capabilities.js';
import { instantSchema, opaqueIdSchema, tenantIdSchema, userIdSchema } from './ids.js';
import { moneySchema } from './money.js';

/**
 * Actor canónico. `id` de un agente es su runtimeId, nunca persona o rol.
 * Actor de origen y tenant objetivo se conservan separados.
 */
export const actorSchema = z
  .object({
    kind: z.enum(['human', 'agent', 'worker']),
    id: opaqueIdSchema,
    tenantId: tenantIdSchema,
    userId: userIdSchema.optional(),
    roleId: opaqueIdSchema.optional(),
    runtimeId: opaqueIdSchema.optional(),
    personaId: opaqueIdSchema.optional(),
    kernelTurnId: opaqueIdSchema.optional(),
  })
  .strict()
  .superRefine((actor, ctx) => {
    if (actor.kind === 'human' && !actor.userId) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['userId'], message: 'human actor requires userId' });
    }
    if (actor.kind === 'agent' && !actor.runtimeId) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['runtimeId'], message: 'agent actor requires runtimeId' });
    }
  });

export type Actor = z.infer<typeof actorSchema>;

/** TwinBinding: especialización local sobre una identidad canónica del padre. */
export const twinBindingSchema = z
  .object({
    id: opaqueIdSchema,
    localInstanceId: opaqueIdSchema,
    canonicalRuntimeId: opaqueIdSchema,
    canonicalRevision: z.string().min(1).max(64),
    targetTenantId: tenantIdSchema,
    workOrderId: opaqueIdSchema,
    capabilities: z.array(capabilitySchema).min(1).max(24),
    purpose: z.string().min(1).max(256),
    budget: moneySchema.optional(),
    issuedAt: instantSchema,
    expiresAt: instantSchema,
    revocationVersion: z.number().int().min(0),
    proofRef: z.string().min(1).max(256),
  })
  .strict()
  .superRefine((binding, ctx) => {
    if (Date.parse(binding.expiresAt) <= Date.parse(binding.issuedAt)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['expiresAt'], message: 'expiresAt must be after issuedAt' });
    }
  });

export type TwinBinding = z.infer<typeof twinBindingSchema>;

/** DelegationMandate: autoridad acotada que un worker revalida en cada job. */
export const delegationMandateSchema = z
  .object({
    id: opaqueIdSchema,
    originatingActorId: opaqueIdSchema,
    originatingTenantId: tenantIdSchema,
    targetTenantId: tenantIdSchema,
    workOrderId: opaqueIdSchema,
    twinBindingId: opaqueIdSchema.optional(),
    capabilities: z.array(capabilitySchema).min(1).max(24),
    resources: z.array(opaqueIdSchema).max(500).default([]),
    fields: z.array(z.string().min(1).max(128)).max(500).default([]),
    purpose: z.string().min(1).max(256),
    budget: moneySchema.optional(),
    issuedAt: instantSchema,
    expiresAt: instantSchema,
    revocationVersion: z.number().int().min(0),
    proofRef: z.string().min(1).max(256),
  })
  .strict();

export type DelegationMandate = z.infer<typeof delegationMandateSchema>;

export function isMandateActive(mandate: DelegationMandate, now = new Date()): boolean {
  const t = now.getTime();
  return Date.parse(mandate.issuedAt) <= t && Date.parse(mandate.expiresAt) > t;
}

/** AuthorityMap: un custodio y un ejecutor por campo/efecto de cada encargo. */
export const authorityEntrySchema = z
  .object({
    scope: z.string().min(1).max(128),
    custodian: z.enum(['bank', 'erp', 'finanzas', 'gestoria', 'client']),
    executor: z.enum(['bank', 'erp', 'finanzas', 'gestoria', 'client']),
    reviewerRequirement: z.enum(['none', 'human_review', 'competent_professional']),
    evidenceRefs: z.array(opaqueIdSchema).max(50).default([]),
  })
  .strict();

export const authorityMapSchema = z
  .object({
    workOrderId: opaqueIdSchema,
    tenantId: tenantIdSchema,
    entries: z.array(authorityEntrySchema).min(1).max(200),
  })
  .strict()
  .superRefine((map, ctx) => {
    const seen = new Set<string>();
    for (const entry of map.entries) {
      if (seen.has(entry.scope)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['entries'],
          message: `duplicate authority scope: ${entry.scope}`,
        });
      }
      seen.add(entry.scope);
    }
  });

export type AuthorityMap = z.infer<typeof authorityMapSchema>;

export const workOrderSchema = z
  .object({
    id: opaqueIdSchema,
    tenantId: tenantIdSchema,
    objective: z.string().min(1).max(1024),
    deliverable: z.string().min(1).max(512),
    allowedSources: z.array(opaqueIdSchema).max(200).default([]),
    acceptedBy: opaqueIdSchema,
    reviewerId: opaqueIdSchema.optional(),
    executorId: opaqueIdSchema,
  })
  .strict();

export type WorkOrder = z.infer<typeof workOrderSchema>;
