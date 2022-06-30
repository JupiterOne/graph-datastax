import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { DataStaxDatabase } from '../../types';

export function getDatabaseKey(id: string): string {
  return `datastax_database:${id}`;
}

export function createDatabaseEntity(database: DataStaxDatabase): Entity {
  const createdOn = parseTimePropertyValue(database.creationTime);
  const deletedOn = parseTimePropertyValue(database.terminationTime);

  return createIntegrationEntity({
    entityData: {
      source: database,
      assign: {
        _type: Entities.DATABASE._type,
        _class: Entities.DATABASE._class,
        _key: getDatabaseKey(database.id),
        id: database.id,
        name: database.info.name,
        location: database.studioUrl,
        'info.keyspace': database.info.keyspace,
        'info.cloudProvider': database.info.cloudProvider,
        'info.tier': database.info.tier,
        'info.capacityUnits': database.info.capacityUnits,
        'info.region': database.info.region,
        // if unix timestamp is negative, it means the action never occurred
        createdOn: createdOn && createdOn > 0 ? createdOn : undefined,
        deletedOn: deletedOn && deletedOn > 0 ? deletedOn : undefined,
        status: database.status,
        'storage.nodeCount': database.storage.nodeCount,
        'storage.replicationFactor': database.storage.replicationFactor,
        'storage.totalStorage': database.storage.totalStorage,
        'metrics.writeRequestsTotalCount':
          database.metrics.writeRequestsTotalCount,
        'metrics.readRequestsTotalCount':
          database.metrics.readRequestsTotalCount,
        'metrics.liveDataSizeBytes': database.metrics.liveDataSizeBytes,
        'metrics.errorsTotalCount': database.metrics.errorsTotalCount,
        availableActions: database.availableActions,
        studioUrl: database.studioUrl,
        grafanaUrl: database.grafanaUrl,
        cqlshUrl: database.cqlshUrl,
        graphqlUrl: database.graphqlUrl,
        dataEndpointUrl: database.dataEndpointUrl,
        lastUsageTime: database.lastUsageTime,
        observedStatus: database.observedStatus,
      },
    },
  });
}

export function createOrganizationDatabaseRelationship(
  organization: Entity,
  database: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: organization,
    to: database,
  });
}
