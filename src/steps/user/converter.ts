import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { DataStaxUser } from '../../types';

export function getUserKey(id: string): string {
  return `datastax_user:${id}`;
}

export function createUserEntity(user: DataStaxUser): Entity {
  return createIntegrationEntity({
    entityData: {
      source: user,
      assign: {
        _type: Entities.USER._type,
        _class: Entities.USER._class,
        _key: getUserKey(user.UserID),
        id: user.UserID,
        email: user.Email,
        name: user.Email,
        username: user.Email,
        active: user.Status == 'active' ? true : false,
      },
    },
  });
}

export function createOrganizationUserRelationship(
  organization: Entity,
  user: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: organization,
    to: user,
  });
}

export function createUserAccessRoleRelationship(
  user: Entity,
  accessRole: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: user,
    to: accessRole,
  });
}
