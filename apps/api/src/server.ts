import { serve } from '@hono/node-server';
import { createJwksResolver, PolicyEngine, TokenVerifier } from '@agntia-finanzas/auth';
import { createApp, type CapabilityReportStore, type ResourceStore } from './app.js';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`missing required environment variable: ${name}`);
  }
  return value;
}

const port = Number(process.env.PORT ?? 8787);
const verifier = new TokenVerifier({
  issuer: requireEnv('SUPABASE_ISSUER'),
  audience: requireEnv('SUPABASE_AUDIENCE'),
  getKey: createJwksResolver({
    url: requireEnv('SUPABASE_JWKS_URL'),
    allowInsecureLocalhost: process.env.NODE_ENV !== 'production',
  }),
});

// Stores sin datos: hasta que exista persistencia real (C06) toda capacidad
// permanece not_configured y ningún recurso se sirve.
const resources: ResourceStore = { get: async () => null };
const capabilityReports: CapabilityReportStore = { list: async () => [] };

const app = createApp({
  verifier,
  policy: new PolicyEngine(
    { find: async () => null },
    { find: async () => null },
  ),
  resources,
  capabilityReports,
});

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`finanzas api listening on ${info.port}`);
});
