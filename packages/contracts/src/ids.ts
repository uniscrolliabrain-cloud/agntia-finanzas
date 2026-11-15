import { z } from 'zod';

/**
 * IDs opacos del servicio: sin semántica inferible, sin UUID forzado sobre IDs
 * del padre (docs/contracts/01-contratos.md).
 */
export const OPAQUE_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;

export const opaqueIdSchema = z
  .string()
  .min(1)
  .max(128)
  .regex(OPAQUE_ID_PATTERN, 'opaque id must be 1-128 chars of [A-Za-z0-9._:-]');

export type OpaqueId = z.infer<typeof opaqueIdSchema>;

export const tenantIdSchema = opaqueIdSchema;
export const actorIdSchema = opaqueIdSchema;
export const resourceIdSchema = opaqueIdSchema;

export const userIdSchema = z.string().min(1).max(128);

export function isOpaqueId(value: unknown): value is OpaqueId {
  return typeof value === 'string' && OPAQUE_ID_PATTERN.test(value);
}

/** ISO-8601 con offset obligatorio para instantes de efecto. */
export const instantSchema = z
  .string()
  .datetime({ offset: true })
  .describe('ISO-8601 timestamp with explicit offset');

export const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD')
  .describe('calendar date without time');

export const currencyCodeSchema = z
  .string()
  .regex(/^[A-Z]{3}$/, 'expected ISO-4217 alpha-3 currency code');
