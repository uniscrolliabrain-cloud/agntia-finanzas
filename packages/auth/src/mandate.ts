import { ServiceError, type DelegationMandate } from '@agntia-finanzas/contracts';

/**
 * Revalidación de mandato en cada job/worker. Un mandato caducado o revocado
 * bloquea efectos nuevos sin borrar estado ni historia.
 */
export function assertMandateForEffect(
  mandate: DelegationMandate,
  operation: {
    capability: DelegationMandate['capabilities'][number];
    tenantId: string;
    resourceId?: string;
    now?: Date;
    currentRevocationVersion: number;
  },
): void {
  const now = (operation.now ?? new Date()).getTime();
  if (Date.parse(mandate.expiresAt) <= now || Date.parse(mandate.issuedAt) > now) {
    throw new ServiceError('forbidden', 'mandate is expired or not yet valid');
  }
  if (mandate.revocationVersion !== operation.currentRevocationVersion) {
    throw new ServiceError('forbidden', 'mandate was revoked');
  }
  if (mandate.targetTenantId !== operation.tenantId) {
    throw new ServiceError('forbidden', 'mandate targets a different tenant');
  }
  if (!mandate.capabilities.includes(operation.capability)) {
    throw new ServiceError('forbidden', 'capability not delegated to this mandate');
  }
  if (operation.resourceId && mandate.resources.length > 0 && !mandate.resources.includes(operation.resourceId)) {
    throw new ServiceError('forbidden', 'resource outside mandate scope');
  }
}
