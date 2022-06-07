import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { DataStaxRole } from '../../types';

export function getRoleKey(id: string): string {
  return `datastax_role:${id}`;
}

export function createAccessRoleEntity(role: DataStaxRole): Entity {
  return createIntegrationEntity({
    entityData: {
      source: role,
      assign: {
        _type: Entities.ACCESS_ROLE._type,
        _class: Entities.ACCESS_ROLE._class,
        _key: getRoleKey(role.id),
        id: role.id,
        name: role.name,
        info: JSON.stringify(role.policy),
        lastUpdateDateTime: role.last_update_date_time,
        lastUpdateUserId: role.last_update_user_id,
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
