import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { DataStaxRole } from '../../types';

export function getRoleKey(id: string): string {
  return `datastax_role:${id}`;
}

export function createAccessRoleEntity(role: DataStaxRole): Entity {
  const updatedOn = parseTimePropertyValue(role.last_update_date_time);

  return createIntegrationEntity({
    entityData: {
      source: role,
      assign: {
        _type: Entities.ACCESS_ROLE._type,
        _class: Entities.ACCESS_ROLE._class,
        _key: getRoleKey(role.id),
        id: role.id,
        name: role.name,
        'policy.description': role.policy?.description,
        'policy.resources': role.policy?.resources,
        'policy.actions': role.policy?.actions,
        'policy.effect': role.policy?.effect,
        updatedOn: updatedOn && updatedOn > 0 ? updatedOn : undefined,
        updatedByUserId: role.last_update_user_id,
      },
    },
  });
}

export function createOrganizationAccessRoleRelationship(
  organization: Entity,
  accessRole: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: organization,
    to: accessRole,
  });
}
