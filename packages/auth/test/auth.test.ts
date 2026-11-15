import { beforeAll, describe, expect, it } from 'vitest';
import { SignJWT, generateKeyPair, type KeyLike } from 'jose';
import { ServiceError, type DelegationMandate } from '@agntia-finanzas/contracts';
import {
  PolicyEngine,
  TokenVerifier,
  assertMandateForEffect,
  type MembershipRecord,
  type MembershipStore,
  type ResourceGrant,
  type AclStore,
} from '../src/index.js';

const ISSUER = 'https://project.supabase.co/auth/v1';
const AUDIENCE = 'authenticated';
const KID = 'test-key-1';

let privateKey: KeyLike;
let publicKey: KeyLike;
let verifier: TokenVerifier;

beforeAll(async () => {
  const pair = await generateKeyPair('RS256');
  privateKey = pair.privateKey;
  publicKey = pair.publicKey;
  verifier = new TokenVerifier({
    issuer: ISSUER,
    audience: AUDIENCE,
    getKey: async () => publicKey,
  });
});

interface TokenOptions {
  sub?: string;
  tenantId?: string | null;
  appTenantId?: string;
  userTenantId?: string;
  issuer?: string;
  audience?: string;
  expiresInSeconds?: number;
  claims?: Record<string, unknown>;
}

async function signToken(options: TokenOptions = {}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: Record<string, unknown> = { ...options.claims };
  if (options.tenantId !== null) payload.tenant_id = options.tenantId ?? 'tenant-a';
  if (options.appTenantId) payload.app_metadata = { tenant_id: options.appTenantId };
  if (options.userTenantId) payload.user_metadata = { tenant_id: options.userTenantId };

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'RS256', kid: KID })
    .setSubject(options.sub ?? 'user-1')
    .setIssuer(options.issuer ?? ISSUER)
    .setAudience(options.audience ?? AUDIENCE)
    .setIssuedAt(now)
    .setExpirationTime(now + (options.expiresInSeconds ?? 600))
    .sign(privateKey);
}

function membership(overrides: Partial<MembershipRecord> = {}): MembershipRecord {
  return {
    userId: 'user-1',
    tenantId: 'tenant-a',
    status: 'active',
    roles: ['owner'],
    aclVersion: 1,
    ...overrides,
  };
}

function inMemoryMemberships(records: MembershipRecord[]): MembershipStore {
  return {
    find: async (userId, tenantId) =>
      records.find((record) => record.userId === userId && record.tenantId === tenantId) ?? null,
  };
}

function inMemoryAcls(records: ResourceGrant[]): AclStore {
  return {
    find: async (userId, tenantId, resourceId) =>
      records.find((record) => record.userId === userId && record.tenantId === tenantId && record.resourceId === resourceId) ??
      null,
  };
}

describe('Supabase JWT verification', () => {
  it('accepts a signed token and derives the tenant from the tenant claim', async () => {
    const claims = await verifier.verify(await signToken());
    expect(claims.sub).toBe('user-1');
    expect(claims.tokenTenantId).toBe('tenant-a');
  });

  it('rejects an expired token', async () => {
    await expect(verifier.verify(await signToken({ expiresInSeconds: -3600 }))).rejects.toMatchObject({
      code: 'unauthenticated',
    });
  });

  it('rejects a token from another issuer', async () => {
    await expect(verifier.verify(await signToken({ issuer: 'https://evil.example/auth/v1' }))).rejects.toMatchObject({
      code: 'unauthenticated',
    });
  });

  it('rejects a token for another audience', async () => {
    await expect(verifier.verify(await signToken({ audience: 'service_role' }))).rejects.toMatchObject({
      code: 'unauthenticated',
    });
  });

  it('rejects a symmetric token even if correctly signed', async () => {
    const now = Math.floor(Date.now() / 1000);
    const secret = new TextEncoder().encode('super-secret-value-not-allowed');
    const token = await new SignJWT({ tenant_id: 'tenant-a' })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject('user-1')
      .setIssuer(ISSUER)
      .setAudience(AUDIENCE)
      .setIssuedAt(now)
      .setExpirationTime(now + 600)
      .sign(secret);
    await expect(verifier.verify(token)).rejects.toMatchObject({ code: 'unauthenticated' });
  });

  it('rejects an unsigned (alg none) token', async () => {
    const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(
      JSON.stringify({ sub: 'user-1', tenant_id: 'tenant-a', iss: ISSUER, aud: AUDIENCE, exp: 9999999999, iat: 1 }),
    ).toString('base64url');
    await expect(verifier.verify(`${header}.${payload}.`)).rejects.toMatchObject({ code: 'unauthenticated' });
  });

  it('rejects conflicting tenant claims instead of picking one', async () => {
    await expect(verifier.verify(await signToken({ tenantId: 'tenant-a', appTenantId: 'tenant-b' }))).rejects.toMatchObject({
      code: 'unauthenticated',
    });
  });

  it('rejects a token without any tenant claim', async () => {
    await expect(verifier.verify(await signToken({ tenantId: null }))).rejects.toMatchObject({
      code: 'unauthenticated',
    });
  });

  it('never treats editable user_metadata as authority', async () => {
    const claims = await verifier.verify(
      await signToken({ tenantId: undefined, appTenantId: 'tenant-a', userTenantId: 'tenant-b' }),
    );
    expect(claims.tokenTenantId).toBe('tenant-a');
  });

  it('rejects malformed and oversized tokens', async () => {
    await expect(verifier.verify('not-a-jwt')).rejects.toMatchObject({ code: 'unauthenticated' });
    await expect(verifier.verify('a'.repeat(9000))).rejects.toMatchObject({ code: 'unauthenticated' });
  });
});

describe('principal resolution', () => {
  it('resolves a principal from provisioned membership', async () => {
    const policy = new PolicyEngine(inMemoryMemberships([membership()]), inMemoryAcls([]));
    const principal = await policy.resolvePrincipal(await verifier.verify(await signToken()));
    expect(principal).toEqual({ userId: 'user-1', tenantId: 'tenant-a', roles: ['owner'], aclVersion: 1 });
  });

  it('denies a token whose tenant has no membership', async () => {
    const policy = new PolicyEngine(inMemoryMemberships([membership({ tenantId: 'tenant-b' })]), inMemoryAcls([]));
    await expect(policy.resolvePrincipal(await verifier.verify(await signToken()))).rejects.toMatchObject({
      code: 'forbidden',
    });
  });

  it('denies a suspended or revoked membership', async () => {
    for (const status of ['suspended', 'revoked'] as const) {
      const policy = new PolicyEngine(inMemoryMemberships([membership({ status })]), inMemoryAcls([]));
      await expect(policy.resolvePrincipal(await verifier.verify(await signToken()))).rejects.toMatchObject({
        code: 'forbidden',
      });
    }
  });

  it('denies a membership record that does not match the token principal', async () => {
    const policy = new PolicyEngine(inMemoryMemberships([membership({ userId: 'someone-else' })]), inMemoryAcls([]));
    await expect(policy.resolvePrincipal(await verifier.verify(await signToken()))).rejects.toBeInstanceOf(ServiceError);
  });
});

describe('resource and field policy', () => {
  const grant: ResourceGrant = {
    tenantId: 'tenant-a',
    userId: 'user-1',
    resourceId: 'res-a',
    allow: true,
    fields: ['id', 'state'],
  };

  it('allows a granted resource inside the tenant', async () => {
    const policy = new PolicyEngine(inMemoryMemberships([membership()]), inMemoryAcls([grant]));
    const principal = { userId: 'user-1', tenantId: 'tenant-a', roles: ['owner'], aclVersion: 1 };
    await expect(policy.assertResourceAccess(principal, { id: 'res-a', tenantId: 'tenant-a' }, ['id'])).resolves.toBeUndefined();
  });

  it('hides a resource that belongs to another tenant', async () => {
    const policy = new PolicyEngine(inMemoryMemberships([membership()]), inMemoryAcls([grant]));
    const principal = { userId: 'user-1', tenantId: 'tenant-a', roles: ['owner'], aclVersion: 1 };
    await expect(policy.assertResourceAccess(principal, { id: 'res-b', tenantId: 'tenant-b' })).rejects.toMatchObject({
      code: 'not_found',
    });
  });

  it('denies a resource without an explicit grant', async () => {
    const policy = new PolicyEngine(inMemoryMemberships([membership()]), inMemoryAcls([]));
    const principal = { userId: 'user-1', tenantId: 'tenant-a', roles: ['owner'], aclVersion: 1 };
    await expect(policy.assertResourceAccess(principal, { id: 'res-a', tenantId: 'tenant-a' })).rejects.toMatchObject({
      code: 'forbidden',
    });
  });

  it('denies a field outside the grant', async () => {
    const policy = new PolicyEngine(inMemoryMemberships([membership()]), inMemoryAcls([grant]));
    const principal = { userId: 'user-1', tenantId: 'tenant-a', roles: ['owner'], aclVersion: 1 };
    await expect(
      policy.assertResourceAccess(principal, { id: 'res-a', tenantId: 'tenant-a' }, ['bank_account']),
    ).rejects.toMatchObject({ code: 'forbidden' });
  });

  it('denies a capability that was not delegated', () => {
    const policy = new PolicyEngine(inMemoryMemberships([membership()]), inMemoryAcls([]));
    expect(() => policy.assertCapability(['finance.cash.snapshot'], 'finance.payment.propose')).toThrowError(ServiceError);
  });
});

describe('delegation mandate revalidation', () => {
  const now = new Date('2026-11-15T10:00:00Z');
  const mandate: DelegationMandate = {
    id: 'mandate-1',
    originatingActorId: 'actor-parent',
    originatingTenantId: 'operator-p',
    targetTenantId: 'tenant-a',
    workOrderId: 'wo-1',
    capabilities: ['finance.cash.snapshot'],
    resources: ['res-a'],
    fields: ['id'],
    purpose: 'snapshot de caja del encargo',
    issuedAt: '2026-11-15T09:00:00Z',
    expiresAt: '2026-11-15T11:00:00Z',
    revocationVersion: 3,
    proofRef: 'proof-1',
  };

  const operation = {
    capability: 'finance.cash.snapshot' as const,
    tenantId: 'tenant-a',
    resourceId: 'res-a',
    now,
    currentRevocationVersion: 3,
  };

  it('accepts an active mandate for the delegated capability', () => {
    expect(() => assertMandateForEffect(mandate, operation)).not.toThrow();
  });

  it('rejects an expired mandate', () => {
    expect(() =>
      assertMandateForEffect(mandate, { ...operation, now: new Date('2026-11-15T12:00:00Z') }),
    ).toThrowError(/expired/);
  });

  it('rejects a revoked mandate', () => {
    expect(() => assertMandateForEffect(mandate, { ...operation, currentRevocationVersion: 4 })).toThrowError(/revoked/);
  });

  it('rejects another tenant, another capability and another resource', () => {
    expect(() => assertMandateForEffect(mandate, { ...operation, tenantId: 'tenant-b' })).toThrowError(ServiceError);
    expect(() =>
      assertMandateForEffect(mandate, { ...operation, capability: 'finance.payment.propose' as never }),
    ).toThrowError(ServiceError);
    expect(() => assertMandateForEffect(mandate, { ...operation, resourceId: 'res-b' })).toThrowError(ServiceError);
  });
});
