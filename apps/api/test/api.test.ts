import { beforeAll, describe, expect, it } from 'vitest';
import { SignJWT, generateKeyPair, type KeyLike } from 'jose';
import { PolicyEngine, TokenVerifier } from '@agntia-finanzas/auth';
import type { MembershipRecord, ResourceGrant } from '@agntia-finanzas/auth';
import { createApp, type AppDependencies, type ResourceStore } from '../src/app.js';

const ISSUER = 'https://project.supabase.co/auth/v1';
const AUDIENCE = 'authenticated';

let privateKey: KeyLike;
let publicKey: KeyLike;

const memberships: MembershipRecord[] = [
  { userId: 'user-1', tenantId: 'tenant-a', status: 'active', roles: ['owner'], aclVersion: 1 },
  { userId: 'user-2', tenantId: 'tenant-a', status: 'active', roles: ['collaborator'], aclVersion: 1 },
];

const grants: ResourceGrant[] = [
  { tenantId: 'tenant-a', userId: 'user-1', resourceId: 'res-a', allow: true, fields: ['id', 'state', 'freshness'] },
];

const resources: ResourceStore = {
  get: async (id) => {
    if (id === 'res-a') return { id, tenantId: 'tenant-a', fields: ['id', 'state', 'freshness'] };
    if (id === 'res-b') return { id, tenantId: 'tenant-b', fields: ['id', 'state'] };
    return null;
  },
};

function buildDeps(): AppDependencies {
  return {
    verifier: new TokenVerifier({ issuer: ISSUER, audience: AUDIENCE, getKey: async () => publicKey }),
    policy: new PolicyEngine(
      { find: async (userId, tenantId) => memberships.find((m) => m.userId === userId && m.tenantId === tenantId) ?? null },
      {
        find: async (userId, tenantId, resourceId) =>
          grants.find((g) => g.userId === userId && g.tenantId === tenantId && g.resourceId === resourceId) ?? null,
      },
    ),
    resources,
    capabilityReports: { list: async () => [] },
  };
}

async function tokenFor(userId: string, tenantId = 'tenant-a'): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({ tenant_id: tenantId })
    .setProtectedHeader({ alg: 'RS256', kid: 'api-test' })
    .setSubject(userId)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt(now)
    .setExpirationTime(now + 600)
    .sign(privateKey);
}

beforeAll(async () => {
  const pair = await generateKeyPair('RS256');
  privateKey = pair.privateKey;
  publicKey = pair.publicKey;
});

describe('finanzas API', () => {
  it('serves an unauthenticated health check', async () => {
    const app = createApp(buildDeps());
    const response = await app.request('/healthz');
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ status: 'ok' });
  });

  it('rejects a request without a bearer token', async () => {
    const app = createApp(buildDeps());
    const response = await app.request('/v1/finanzas/me', { headers: { 'x-correlation-id': 'corr-123' } });
    expect(response.status).toBe(401);
    const body = (await response.json()) as { error: { code: string; correlationId: string } };
    expect(body.error.code).toBe('unauthenticated');
    expect(body.error.correlationId).toBe('corr-123');
  });

  it('rejects an invalid signature', async () => {
    const other = await generateKeyPair('RS256');
    const now = Math.floor(Date.now() / 1000);
    const forged = await new SignJWT({ tenant_id: 'tenant-a' })
      .setProtectedHeader({ alg: 'RS256' })
      .setSubject('user-1')
      .setIssuer(ISSUER)
      .setAudience(AUDIENCE)
      .setIssuedAt(now)
      .setExpirationTime(now + 600)
      .sign(other.privateKey);
    const app = createApp(buildDeps());
    const response = await app.request('/v1/finanzas/me', { headers: { authorization: `Bearer ${forged}` } });
    expect(response.status).toBe(401);
  });

  it('returns the resolved principal and forbids caching', async () => {
    const app = createApp(buildDeps());
    const response = await app.request('/v1/finanzas/me', {
      headers: { authorization: `Bearer ${await tokenFor('user-1')}` },
    });
    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('private, no-store');
    await expect(response.json()).resolves.toEqual({
      userId: 'user-1',
      tenantId: 'tenant-a',
      roles: ['owner'],
      aclVersion: 1,
    });
  });

  it('serves a granted resource to its tenant', async () => {
    const app = createApp(buildDeps());
    const response = await app.request('/v1/finanzas/resources/res-a', {
      headers: { authorization: `Bearer ${await tokenFor('user-1')}` },
    });
    expect(response.status).toBe(200);
  });

  it('hides a resource of another tenant behind 404', async () => {
    const app = createApp(buildDeps());
    const response = await app.request('/v1/finanzas/resources/res-b', {
      headers: { authorization: `Bearer ${await tokenFor('user-1')}` },
    });
    expect(response.status).toBe(404);
  });

  it('denies a resource without an explicit grant', async () => {
    const app = createApp(buildDeps());
    const response = await app.request('/v1/finanzas/resources/res-a', {
      headers: { authorization: `Bearer ${await tokenFor('user-2')}` },
    });
    expect(response.status).toBe(403);
  });

  it('denies a field outside the grant', async () => {
    const app = createApp(buildDeps());
    const response = await app.request('/v1/finanzas/resources/res-a?fields=id,bank_account', {
      headers: { authorization: `Bearer ${await tokenFor('user-1')}` },
    });
    expect(response.status).toBe(403);
  });

  it('exposes no enabled capability while nothing is configured', async () => {
    const app = createApp(buildDeps());
    const response = await app.request('/v1/finanzas/capabilities', {
      headers: { authorization: `Bearer ${await tokenFor('user-1')}` },
    });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ capabilities: [] });
  });

  it('returns a sanitized 404 envelope for unknown routes', async () => {
    const app = createApp(buildDeps());
    const response = await app.request('/v1/finanzas/execute-anything', {
      headers: { authorization: `Bearer ${await tokenFor('user-1')}` },
    });
    expect(response.status).toBe(404);
    const body = (await response.json()) as { error: { code: string } };
    expect(body.error.code).toBe('not_found');
  });
});
