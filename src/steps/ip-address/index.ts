import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { DataStaxAccessList } from '../../types';
import { Entities, Steps, Relationships } from '../constants';
import { getDatabaseKey } from '../database/converter';
import {
  createIPAddressEntity,
  createDatabaseIpAddressRelationship,
} from './converter';

export async function fetchIPAddresses({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const accessList: DataStaxAccessList[] = await apiClient.fetchAccessLists();
  for (const access of accessList) {
    const databaseEntity = await jobState.findEntity(
      getDatabaseKey(access.databaseId),
    );

    if (databaseEntity) {
      for (const ipAddress of access.addresses) {
        const ipAddressEntity = await jobState.addEntity(
          createIPAddressEntity(ipAddress, access.databaseId),
        );
        await jobState.addRelationship(
          createDatabaseIpAddressRelationship(databaseEntity, ipAddressEntity),
        );
      }
    }
  }
}

export const ipAddressSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.IP_ADDRESSES,
    name: 'Fetch IP Addresses',
    entities: [Entities.IP_ADDRESS],
    relationships: [Relationships.DATABASE_ALLOWS_IP_ADDRESS],
    dependsOn: [Steps.DATABASES],
    executionHandler: fetchIPAddresses,
  },
];
