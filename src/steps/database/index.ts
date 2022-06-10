import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { ORGANIZATION_ENTITY_KEY } from '../organization';
import { Entities, Steps, Relationships } from '../constants';
import {
  createDatabaseEntity,
  createOrganizationDatabaseRelationship,
} from './converter';

export async function fetchDatabases({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const organizationEntity = (await jobState.getData(
    ORGANIZATION_ENTITY_KEY,
  )) as Entity;

  await apiClient.iterateDatabases(async (database) => {
    const databaseEntity = await jobState.addEntity(
      createDatabaseEntity(database),
    );

    await jobState.addRelationship(
      createOrganizationDatabaseRelationship(
        organizationEntity,
        databaseEntity,
      ),
    );
  });
}

export const databaseSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.DATABASES,
    name: 'Fetch Databases',
    entities: [Entities.DATABASE],
    relationships: [Relationships.ORGANIZATION_HAS_DATABASE],
    dependsOn: [Steps.ORGANIZATION],
    executionHandler: fetchDatabases,
  },
];
