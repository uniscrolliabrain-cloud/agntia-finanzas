import { Hono } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import {
  ServiceError,
  isCapabilityEnabled,
  toErrorEnvelope,
  type Capability,
  type CapabilityReport,
} from '@agntia-finanzas/contracts';
import type { PolicyEngine, Principal, TokenVerifier } from '@agntia-finanzas/auth';

export interface ResourceRecord {
  id: string;
  tenantId: string;
  /** Campos materializados y legibles; la ACL decide cuáles se exponen. */
  fields: readonly string[];
}

export interface ResourceStore {
  get(resourceId: string): Promise<ResourceRecord | null>;
}

export interface CapabilityReportStore {
  list(tenantId: string): Promise<readonly CapabilityReport[]>;
}

export interface AppDependencies {
  verifier: TokenVerifier;
  policy: PolicyEngine;
  resources: ResourceStore;
  capabilityReports: CapabilityReportStore;
}

export interface AppVariables {
  correlationId: string;
  principal: Principal;
}

const MAX_CORRELATION_ID_LENGTH = 128;
const DEFAULT_FIELDS = ['id', 'state', 'freshness'] as const;

export function createApp(deps: AppDependencies): Hono<{ Variables: AppVariables }> {
  const app = new Hono<{ Variables: AppVariables }>();

  app.onError((error, c) => {
    const correlationId = c.get('correlationId') ?? crypto.randomUUID();
    const status = error instanceof ServiceError ? error.status : 500;
    return c.json(toErrorEnvelope(error, correlationId), status as ContentfulStatusCode);
  });

  app.notFound((c) => {
    const correlationId = c.get('correlationId') ?? crypto.randomUUID();
    return c.json(toErrorEnvelope(new ServiceError('not_found', 'route not found'), correlationId), 404);
  });

  app.get('/healthz', (c) => c.json({ status: 'ok', service: 'finanzas', schemaVersion: 1 }));

  app.use('/v1/*', async (c, next) => {
    const incoming = c.req.header('x-correlation-id');
    const correlationId =
      incoming && incoming.length <= MAX_CORRELATION_ID_LENGTH && /^[A-Za-z0-9._:-]+$/.test(incoming)
        ? incoming
        : crypto.randomUUID();
    c.set('correlationId', correlationId);

    const authorization = c.req.header('authorization');
    if (!authorization?.startsWith('Bearer ')) {
      throw new ServiceError('unauthenticated', 'bearer token required');
    }
    const token = authorization.slice('Bearer '.length).trim();
    const claims = await deps.verifier.verify(token);
    const principal = await deps.policy.resolvePrincipal(claims);
    c.set('principal', principal);

    c.header('cache-control', 'private, no-store');
    await next();
  });

  app.get('/v1/finanzas/me', (c) => {
    const principal = c.get('principal');
    return c.json({
      userId: principal.userId,
      tenantId: principal.tenantId,
      roles: principal.roles,
      aclVersion: principal.aclVersion,
    });
  });

  app.get('/v1/finanzas/capabilities', async (c) => {
    const principal = c.get('principal');
    const reports = await deps.capabilityReports.list(principal.tenantId);
    return c.json({
      capabilities: reports
        .filter((report) => report.status !== 'forbidden')
        .map((report) => ({
          capability: report.capability,
          status: report.status,
          enabled: isCapabilityEnabled(report),
          version: report.version,
          observedAt: report.observedAt,
        })),
    });
  });

  app.get('/v1/finanzas/resources/:id', async (c) => {
    const principal = c.get('principal');
    const resourceId = c.req.param('id');
    const requested = c.req.query('fields');
    const fields = requested ? requested.split(',').map((field) => field.trim()).filter(Boolean) : [...DEFAULT_FIELDS];

    const resource = await deps.resources.get(resourceId);
    await deps.policy.assertResourceAccess(principal, resource, fields);

    // `assertResourceAccess` garantiza que resource no es null.
    const authorized = resource as ResourceRecord;
    return c.json({
      id: authorized.id,
      state: 'unknown',
      freshness: 'unknown',
      fields: fields.filter((field) => authorized.fields.includes(field)),
    });
  });

  return app;
}

/** Capacidad reservada para rutas futuras; hoy sólo expone el catálogo. */
export function assertKnownCapability(capability: string): Capability {
  const allowed = ['finance.cash.snapshot', 'finance.forecast.run', 'finance.dashboard.read'] as const;
  if (!(allowed as readonly string[]).includes(capability)) {
    throw new ServiceError('not_found', 'capability not exposed');
  }
  return capability as Capability;
}
