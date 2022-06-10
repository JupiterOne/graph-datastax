import {
  Entity,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { DataStaxAccessList } from '../../types';
import { Entities, Steps, Relationships } from '../constants';
import { getDatabaseKey } from '../database/converter';
import { ORGANIZATION_ENTITY_KEY } from '../organization';
import {
  createAccessListAddressEntity,
  createAccessListAddressRelationship,
  createAccessListEntity,
  createDatabaseAccessListRelationship,
  createOrganizationAccessListRelationship,
} from './converter';

export async function fetchAccessLists({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const organizationEntity = (await jobState.getData(
    ORGANIZATION_ENTITY_KEY,
  )) as Entity;

  await apiClient.iterateAccessLists(async (accessList) => {
    const accessListEntity = await jobState.addEntity(
      createAccessListEntity(accessList),
    );

    await jobState.addRelationship(
      createOrganizationAccessListRelationship(
        organizationEntity,
        accessListEntity,
      ),
    );

    for (const [index, address] of Object.entries(accessList.addresses)) {
      const accessListAddressEntity = await jobState.addEntity(
        createAccessListAddressEntity({
          address,
          orgId: accessList.organizationId,
          dbId: accessList.databaseId,
          index,
        }),
      );

      await jobState.addRelationship(
        createAccessListAddressRelationship(
          accessListEntity,
          accessListAddressEntity,
        ),
      );
    }
  });
}

export async function buildAccessListDatabaseRelationships({
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    {
      _type: Entities.ACCESS_LIST._type,
    },
    async (accessListEntity) => {
      const accessList = getRawData<DataStaxAccessList>(accessListEntity);
      if (!accessList) {
        logger.warn(
          { _key: accessListEntity._key },
          'Could not get raw data for access list entity',
        );
        return;
      }

      const databaseEntity = await jobState.findEntity(
        getDatabaseKey(accessList.databaseId),
      );

      if (!databaseEntity) {
        return;
      }

      await jobState.addRelationship(
        createDatabaseAccessListRelationship(databaseEntity, accessListEntity),
      );
    },
  );
}

export const accessListSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ACCESS_LISTS,
    name: 'Fetch Access Lists',
    entities: [Entities.ACCESS_LIST, Entities.ACCESS_LIST_ADDRESS],
    relationships: [
      Relationships.ORGANIZATION_HAS_ACCESS_LIST,
      Relationships.ACCESS_LIST_HAS_ADDRESS,
    ],
    dependsOn: [Steps.ORGANIZATION],
    executionHandler: fetchAccessLists,
  },
  {
    id: Steps.BUILD_ACCESS_LIST_DATABASE_RELATIONSHIPS,
    name: 'Build Access List Database Relationships',
    entities: [],
    relationships: [Relationships.DATABASE_ASSIGNED_ACCESS_LIST],
    dependsOn: [Steps.ACCESS_LISTS, Steps.DATABASES],
    executionHandler: buildAccessListDatabaseRelationships,
  },
];
