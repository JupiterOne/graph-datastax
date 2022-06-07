import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { DataStaxDatabase } from '../../types';

export function getDatabaseKey(id: string): string {
  return `datastax_database:${id}`;
}

export function createDatabaseEntity(database: DataStaxDatabase): Entity {
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
        info: JSON.stringify(database.info),
        creationTime: database.creationTime,
        terminationTime: database.terminationTime,
        status: database.status,
        storage: JSON.stringify(database.storage),
        metrics: JSON.stringify(database.metrics),
        cost: JSON.stringify(database.cost),
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
