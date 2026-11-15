import { z } from 'zod';

/**
 * Códigos de error cerrados y su estado HTTP (docs/contracts/01-contratos.md).
 * Un resultado incierto no es `failed` seguro para reintento.
 */
export const ERROR_CODES = [
  'invalid_input',
  'business_rule',
  'unauthenticated',
  'forbidden',
  'not_found',
  'conflict',
  'version_conflict',
  'idempotency_conflict',
  'dependency_failed',
  'rate_limited',
  'upstream_invalid',
  'upstream_unavailable',
  'upstream_timeout',
  'internal',
] as const;

export const errorCodeSchema = z.enum(ERROR_CODES);
export type ErrorCode = z.infer<typeof errorCodeSchema>;

export const ERROR_STATUS: Readonly<Record<ErrorCode, number>> = {
  invalid_input: 400,
  business_rule: 422,
  unauthenticated: 401,
  forbidden: 403,
  not_found: 404,
  conflict: 409,
  version_conflict: 409,
  idempotency_conflict: 409,
  dependency_failed: 424,
  rate_limited: 429,
  upstream_invalid: 502,
  upstream_unavailable: 503,
  upstream_timeout: 504,
  internal: 500,
};

/** Errores donde reintentar la misma operación es seguro por definición. */
export const RETRYABLE_CODES: readonly ErrorCode[] = ['rate_limited', 'upstream_unavailable', 'internal'] as const;

export const errorEnvelopeSchema = z
  .object({
    error: z
      .object({
        code: errorCodeSchema,
        message: z.string().min(1).max(512),
        correlationId: z.string().min(1).max(128),
        retryable: z.boolean(),
        reconciliationRequired: z.boolean(),
        details: z.array(z.object({ path: z.string().max(256), message: z.string().max(512) }).strict()).max(50).optional(),
      })
      .strict(),
  })
  .strict();

export type ErrorEnvelope = z.infer<typeof errorEnvelopeSchema>;

export class ServiceError extends Error {
  readonly code: ErrorCode;
  readonly retryable: boolean;
  readonly reconciliationRequired: boolean;

  constructor(
    code: ErrorCode,
    message: string,
    options: { retryable?: boolean; reconciliationRequired?: boolean; cause?: unknown } = {},
  ) {
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = 'ServiceError';
    this.code = code;
    this.retryable = options.retryable ?? RETRYABLE_CODES.includes(code);
    this.reconciliationRequired = options.reconciliationRequired ?? false;
  }

  get status(): number {
    return ERROR_STATUS[this.code];
  }
}

export function toErrorEnvelope(error: unknown, correlationId: string): ErrorEnvelope {
  if (error instanceof ServiceError) {
    return {
      error: {
        code: error.code,
        message: error.message.slice(0, 512),
        correlationId,
        retryable: error.retryable,
        reconciliationRequired: error.reconciliationRequired,
      },
    };
  }
  // Nunca se propaga traceback, PII ni secretos al cliente.
  return {
    error: {
      code: 'internal',
      message: 'internal error',
      correlationId,
      retryable: false,
      reconciliationRequired: false,
    },
  };
}
