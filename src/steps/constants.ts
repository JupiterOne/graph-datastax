import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ORGANIZATION: 'fetch-organization',
  DATABASES: 'fetch-databases',
  ACCESS_LISTS: 'fetch-access-lists',
  USERS: 'fetch-users',
  ACCESS_ROLES: 'fetch-access-roles',
  BUILD_USER_ROLE_RELATIONSHIPS: 'build-user-role-relationships',
  BUILD_ACCESS_LIST_DATABASE_RELATIONSHIPS:
    'build-access-list-database-relationships',
};

export const Entities: Record<
  | 'ORGANIZATION'
  | 'DATABASE'
  | 'ACCESS_LIST'
  | 'ACCESS_LIST_ADDRESS'
  | 'USER'
  | 'ACCESS_ROLE',
  StepEntityMetadata
> = {
  ORGANIZATION: {
    resourceName: 'Organization',
    _type: 'datastax_organization',
    _class: ['Organization'],
  },
  DATABASE: {
    resourceName: 'Database',
    _type: 'datastax_database',
    _class: ['Database'],
  },
  ACCESS_LIST: {
    resourceName: 'Access List',
    _type: 'datastax_access_list',
    _class: ['Firewall'],
  },
  ACCESS_LIST_ADDRESS: {
    resourceName: 'Access List Address',
    _type: 'datastax_access_list_address',
    _class: ['Configuration'],
  },
  USER: {
    resourceName: 'User',
    _type: 'datastax_user',
    _class: ['User'],
  },
  ACCESS_ROLE: {
    resourceName: 'Access Role',
    _type: 'datastax_access_role',
    _class: ['AccessRole'],
  },
};

export const Relationships: Record<
  | 'ORGANIZATION_HAS_DATABASE'
  | 'ORGANIZATION_HAS_ACCESS_ROLE'
  | 'ORGANIZATION_HAS_USER'
  | 'ORGANIZATION_HAS_ACCESS_LIST'
  | 'ACCESS_LIST_HAS_ADDRESS'
  | 'DATABASE_ASSIGNED_ACCESS_LIST'
  | 'USER_ASSIGNED_ACCESS_ROLE',
  StepRelationshipMetadata
> = {
  ORGANIZATION_HAS_DATABASE: {
    _type: 'datastax_organization_has_database',
    sourceType: Entities.ORGANIZATION._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.DATABASE._type,
  },
  DATABASE_ASSIGNED_ACCESS_LIST: {
    _type: 'datastax_database_assigned_access_list',
    sourceType: Entities.DATABASE._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.ACCESS_LIST._type,
  },
  ORGANIZATION_HAS_ACCESS_ROLE: {
    _type: 'datastax_organization_has_access_role',
    sourceType: Entities.ORGANIZATION._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.DATABASE._type,
  },
  ORGANIZATION_HAS_USER: {
    _type: 'datastax_organization_has_user',
    sourceType: Entities.ORGANIZATION._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  ORGANIZATION_HAS_ACCESS_LIST: {
    _type: 'datastax_organization_has_access_list',
    sourceType: Entities.ORGANIZATION._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.ACCESS_LIST._type,
  },
  ACCESS_LIST_HAS_ADDRESS: {
    _type: 'datastax_access_list_has_address',
    sourceType: Entities.ACCESS_LIST._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.ACCESS_LIST_ADDRESS._type,
  },
  USER_ASSIGNED_ACCESS_ROLE: {
    _type: 'datastax_user_assigned_access_role',
    sourceType: Entities.USER._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.ACCESS_ROLE._type,
  },
};
