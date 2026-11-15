import { z } from 'zod';
import { capabilitySchema } from './capabilities.js';
import { actorIdSchema, opaqueIdSchema, tenantIdSchema } from './ids.js';

/**
 * Envelope de operación. `tenantId`/`actorId`/`capability` declarados por el
 * cliente NO son prueba: el PEP los deriva y verifica en servidor.
 */
export const ENVELOPE_SCHEMA_VERSION = 1;
export const MAX_ENVELOPE_BYTES = 64 * 1024;

export const idempotencyKeySchema = z
  .string()
  .min(8)
  .max(128)
  .regex(/^[A-Za-z0-9][A-Za-z0-9._:-]{7,127}$/, 'idempotency key must be 8-128 opaque chars');

export const operationEnvelopeSchema = z
  .object({
    schemaVersion: z.literal(ENVELOPE_SCHEMA_VERSION),
    operationId: opaqueIdSchema,
    tenantId: tenantIdSchema,
    actorId: actorIdSchema,
    capability: capabilitySchema,
    requestId: z.string().min(1).max(128).optional(),
    correlationId: z.string().min(1).max(128),
    causationId: z.string().min(1).max(128).nullable().default(null),
    idempotencyKey: idempotencyKeySchema.optional(),
    expectedVersion: z.number().int().min(1).optional(),
    approvalRef: opaqueIdSchema.nullable().default(null),
    dryRun: z.boolean().default(true),
    payload: z.record(z.string(), z.unknown()),
  })
  .strict();

export type OperationEnvelope = z.infer<typeof operationEnvelopeSchema>;

export function parseOperationEnvelope(text: string): OperationEnvelope {
  const bytes = Buffer.byteLength(text, 'utf8');
  if (bytes > MAX_ENVELOPE_BYTES) {
    throw new RangeError(`envelope exceeds ${MAX_ENVELOPE_BYTES} bytes`);
  }
  return operationEnvelopeSchema.parse(JSON.parse(text));
}

/** Campos que el servidor debe re-derivar y comparar con el envelope. */
export const SERVER_DERIVED_FIELDS = ['tenantId', 'actorId', 'capability'] as const;
