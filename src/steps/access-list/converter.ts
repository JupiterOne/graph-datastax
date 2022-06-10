import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { DataStaxAccessList, DataStaxAddress } from '../../types';

export function getAccessListKey(orgId: string, dbId: string) {
  return `datastax_access_list:${orgId}:${dbId}`;
}

export function createAccessListEntity(accessList: DataStaxAccessList): Entity {
  return createIntegrationEntity({
    entityData: {
      source: accessList,
      assign: {
        _type: Entities.ACCESS_LIST._type,
        _class: Entities.ACCESS_LIST._class,
        _key: getAccessListKey(
          accessList.organizationId,
          accessList.databaseId,
        ),
        // There isn't a good way to get a name
        name: `${accessList.organizationId}:${accessList.databaseId}`,
        accessListEnabled: accessList.configurations.accessListEnabled,
      },
    },
  });
}

export function getAccessListAddressKey(
  orgId: string,
  dbId: string,
  index: string,
) {
  return `datastax_access_list_address:${orgId}:${dbId}:${index}`;
}

export function createAccessListAddressEntity({
  address,
  orgId,
  dbId,
  index,
}: {
  address: DataStaxAddress;
  orgId: string;
  dbId: string;
  index: string;
}): Entity {
  const updatedOn = parseTimePropertyValue(address.lastUpdateDateTime);

  return createIntegrationEntity({
    entityData: {
      source: address,
      assign: {
        _type: Entities.ACCESS_LIST_ADDRESS._type,
        _class: Entities.ACCESS_LIST_ADDRESS._class,
        _key: getAccessListAddressKey(orgId, dbId, index),
        // There isn't a good way to get a name
        name: `access_list_address:${orgId}:${dbId}:${index}`,
        address: address.address,
        description: address.description,
        enabled: address.enabled,
        updatedOn: updatedOn && updatedOn > 0 ? updatedOn : undefined,
      },
    },
  });
}

export function createAccessListAddressRelationship(
  accessList: Entity,
  accessListAddress: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: accessList,
    to: accessListAddress,
  });
}

export function createOrganizationAccessListRelationship(
  organization: Entity,
  accessList: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: organization,
    to: accessList,
  });
}

export function createDatabaseAccessListRelationship(
  database: Entity,
  accessList: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.ASSIGNED,
    from: database,
    to: accessList,
  });
}
