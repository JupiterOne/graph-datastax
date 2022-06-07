import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ORGANIZATION: 'fetch-organization',
  DATABASES: 'fetch-databases',
  IP_ADDRESSES: 'fetch-ip-addresses',
  USERS: 'fetch-users',
  ACCESS_ROLES: 'fetch-access-roles',
};

export const Entities: Record<
  'ORGANIZATION' | 'DATABASE' | 'IP_ADDRESS' | 'USER' | 'ACCESS_ROLE',
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
  IP_ADDRESS: {
    resourceName: 'IP Address',
    _type: 'datastax_ip_address',
    _class: ['IpAddress'],
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
  | 'DATABASE_ALLOWS_IP_ADDRESS'
  | 'ORGANIZATION_HAS_ACCESS_ROLE'
  | 'ORGANIZATION_HAS_USER'
  | 'USER_HAS_ACCESS_ROLE',
  StepRelationshipMetadata
> = {
  ORGANIZATION_HAS_DATABASE: {
    _type: 'datastax_organization_has_database',
    sourceType: Entities.ORGANIZATION._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.DATABASE._type,
  },
  DATABASE_ALLOWS_IP_ADDRESS: {
    _type: 'datastax_database_allows_ip_address',
    sourceType: Entities.DATABASE._type,
    _class: RelationshipClass.ALLOWS,
    targetType: Entities.IP_ADDRESS._type,
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
  USER_HAS_ACCESS_ROLE: {
    _type: 'datastax_user_has_access_role',
    sourceType: Entities.USER._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.ACCESS_ROLE._type,
  },
};
