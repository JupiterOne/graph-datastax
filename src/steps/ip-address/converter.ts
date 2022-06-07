import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { DataStaxIPAddress } from '../../types';

export function getIPAddressKey(id: string, databaseId: string): string {
  return `datastax_ipaddress:${id}-${databaseId}`;
}

export function removeAddressBlock(ipAddr: string): string {
  return ipAddr.split('/')[0];
}

export function createIPAddressEntity(
  ip: DataStaxIPAddress,
  databaseId: string,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: ip,
      assign: {
        _type: Entities.IP_ADDRESS._type,
        _class: Entities.IP_ADDRESS._class,
        _key: getIPAddressKey(ip.address, databaseId),
        ipAddress: removeAddressBlock(ip.address),
        name: ip.address,
        ipVersion: 4,
        description: ip.description,
        enabled: ip.enabled,
        lastUpdateDateTime: ip.lastUpdateDateTime,
      },
    },
  });
}

export function createDatabaseIpAddressRelationship(
  database: Entity,
  ipAddress: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.ALLOWS,
    from: database,
    to: ipAddress,
  });
}
