import { ServiceError, type Capability } from '@agntia-finanzas/contracts';
import type { VerifiedClaims } from './verify.js';

/** Membership provisionada, no deducida del token ni de user_metadata. */
export interface MembershipRecord {
  userId: string;
  tenantId: string;
  status: 'active' | 'suspended' | 'revoked';
  roles: readonly string[];
  aclVersion: number;
}

export interface MembershipStore {
  find(userId: string, tenantId: string): Promise<MembershipRecord | null>;
}

export interface ResourceGrant {
  tenantId: string;
  userId: string;
  resourceId: string;
  allow: boolean;
  fields: readonly string[];
}

export interface AclStore {
  find(userId: string, tenantId: string, resourceId: string): Promise<ResourceGrant | null>;
}

export interface Principal {
  userId: string;
  tenantId: string;
  roles: readonly string[];
  aclVersion: number;
}

export interface AuthorizedResource {
  id: string;
  tenantId: string;
}

/**
 * PEP: resuelve el principal desde claims verificados + membership provisionada
 * y autoriza recurso/campo. Deny-by-default y fail-closed: sin fallback a
 * owner/admin/default cuando falta una pieza.
 */
export class PolicyEngine {
  constructor(
    private readonly memberships: MembershipStore,
    private readonly acls: AclStore,
  ) {}

  async resolvePrincipal(claims: VerifiedClaims): Promise<Principal> {
    const membership = await this.memberships.find(claims.sub, claims.tokenTenantId);
    if (!membership) {
      throw new ServiceError('forbidden', 'no provisioned membership for this tenant');
    }
    if (membership.userId !== claims.sub || membership.tenantId !== claims.tokenTenantId) {
      throw new ServiceError('forbidden', 'membership does not match token principal');
    }
    if (membership.status !== 'active') {
      throw new ServiceError('forbidden', `membership is ${membership.status}`);
    }
    return {
      userId: membership.userId,
      tenantId: membership.tenantId,
      roles: membership.roles,
      aclVersion: membership.aclVersion,
    };
  }

  async assertResourceAccess(
    principal: Principal,
    resource: AuthorizedResource | null,
    requiredFields: readonly string[] = [],
  ): Promise<void> {
    // Recurso de otro tenant se comporta como inexistente: no se filtra su existencia.
    if (!resource || resource.tenantId !== principal.tenantId) {
      throw new ServiceError('not_found', 'resource not found');
    }
    const grant = await this.acls.find(principal.userId, principal.tenantId, resource.id);
    if (!grant || !grant.allow) {
      throw new ServiceError('forbidden', 'no access to resource');
    }
    const missing = requiredFields.filter((field) => !grant.fields.includes(field));
    if (missing.length > 0) {
      throw new ServiceError('forbidden', `no access to fields: ${missing.join(',')}`);
    }
  }

  assertCapability(capabilities: readonly Capability[], capability: Capability): void {
    if (!capabilities.includes(capability)) {
      throw new ServiceError('forbidden', 'capability not delegated');
    }
  }
}
