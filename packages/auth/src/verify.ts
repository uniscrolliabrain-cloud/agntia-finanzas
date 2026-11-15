import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from 'jose';
import { z } from 'zod';
import { ServiceError } from '@agntia-finanzas/contracts';

/** Algoritmos admitidos: asimétricos firmados por el proyecto Supabase. */
export const ALLOWED_ALGORITHMS = ['RS256', 'ES256'] as const;
export type AllowedAlgorithm = (typeof ALLOWED_ALGORITHMS)[number];

export const MAX_TOKEN_BYTES = 8 * 1024;

export interface TokenVerifierConfig {
  issuer: string;
  audience: string;
  /** Resolver de claves fijado por servidor; nunca `jku` del token. */
  getKey: JWTVerifyGetKey;
  algorithms?: readonly AllowedAlgorithm[];
  clockToleranceSeconds?: number;
}

export interface VerifiedClaims {
  sub: string;
  tokenTenantId: string;
  expiresAt: number;
  issuedAt: number;
  /** Roles sólo informativos: no conceden autoridad por sí mismos. */
  tokenRoles: readonly string[];
}

const claimsSchema = z
  .object({
    sub: z.string().min(1).max(128),
    exp: z.number().int(),
    iat: z.number().int(),
    tenant_id: z.string().min(1).max(128).optional(),
    app_metadata: z
      .object({
        tenant_id: z.string().min(1).max(128).optional(),
        roles: z.array(z.string().max(64)).max(50).optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

function resolveTokenTenant(claims: z.infer<typeof claimsSchema>): string {
  const topLevel = claims.tenant_id;
  const appMetadata = claims.app_metadata?.tenant_id;

  if (topLevel && appMetadata && topLevel !== appMetadata) {
    // Claim contradictorio: no se elige el "más conveniente".
    throw new ServiceError('unauthenticated', 'token tenant claims disagree');
  }
  const tenant = topLevel ?? appMetadata;
  if (!tenant) {
    throw new ServiceError('unauthenticated', 'token has no tenant claim');
  }
  return tenant;
}

export class TokenVerifier {
  private readonly config: Required<Pick<TokenVerifierConfig, 'issuer' | 'audience' | 'getKey'>> & {
    algorithms: readonly AllowedAlgorithm[];
    clockToleranceSeconds: number;
  };

  constructor(config: TokenVerifierConfig) {
    if (!config.issuer || !config.audience) {
      throw new Error('issuer and audience are required');
    }
    this.config = {
      issuer: config.issuer,
      audience: config.audience,
      getKey: config.getKey,
      algorithms: config.algorithms ?? ALLOWED_ALGORITHMS,
      clockToleranceSeconds: config.clockToleranceSeconds ?? 5,
    };
  }

  async verify(token: string): Promise<VerifiedClaims> {
    if (typeof token !== 'string' || token.length === 0) {
      throw new ServiceError('unauthenticated', 'missing bearer token');
    }
    if (Buffer.byteLength(token, 'utf8') > MAX_TOKEN_BYTES) {
      throw new ServiceError('unauthenticated', 'token too large');
    }
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new ServiceError('unauthenticated', 'malformed token');
    }

    let payload: unknown;
    try {
      const result = await jwtVerify(token, this.config.getKey, {
        issuer: this.config.issuer,
        audience: this.config.audience,
        algorithms: [...this.config.algorithms],
        clockTolerance: this.config.clockToleranceSeconds,
        requiredClaims: ['sub', 'exp', 'iat'],
      });
      payload = result.payload;
    } catch (error) {
      throw new ServiceError('unauthenticated', 'invalid token', { cause: error });
    }

    const parsed = claimsSchema.safeParse(payload);
    if (!parsed.success) {
      throw new ServiceError('unauthenticated', 'token claims are incomplete');
    }

    return {
      sub: parsed.data.sub,
      tokenTenantId: resolveTokenTenant(parsed.data),
      expiresAt: parsed.data.exp,
      issuedAt: parsed.data.iat,
      tokenRoles: parsed.data.app_metadata?.roles ?? [],
    };
  }
}

/**
 * JWKS remoto con URL fijada por servidor. Se recomienda https; localhost sólo
 * en desarrollo explícito. Nunca se acepta una URL del token o del modelo.
 */
export function createJwksResolver(options: {
  url: string;
  allowInsecureLocalhost?: boolean;
  timeoutMs?: number;
  cacheMaxAgeMs?: number;
}): JWTVerifyGetKey {
  const url = new URL(options.url);
  const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '::1';
  if (url.protocol !== 'https:' && !(options.allowInsecureLocalhost === true && isLocalhost)) {
    throw new Error('JWKS url must be https');
  }
  return createRemoteJWKSet(url, {
    timeoutDuration: options.timeoutMs ?? 5_000,
    cacheMaxAge: options.cacheMaxAgeMs ?? 10 * 60 * 1000,
    cooldownDuration: 30_000,
  });
}
