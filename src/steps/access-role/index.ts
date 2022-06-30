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
  createAccessRoleEntity,
  createOrganizationAccessRoleRelationship,
} from './converter';

export async function fetchAccessRoles({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const organizationEntity = (await jobState.getData(
    ORGANIZATION_ENTITY_KEY,
  )) as Entity;

  await apiClient.iterateRoles(async (role) => {
    const accessRoleEntity = await jobState.addEntity(
      createAccessRoleEntity(role),
    );

    await jobState.addRelationship(
      createOrganizationAccessRoleRelationship(
        organizationEntity,
        accessRoleEntity,
      ),
    );
  });
}

export const accessRoleSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ACCESS_ROLES,
    name: 'Fetch Access Roles',
    entities: [Entities.ACCESS_ROLE],
    relationships: [Relationships.ORGANIZATION_HAS_ACCESS_ROLE],
    dependsOn: [Steps.ORGANIZATION],
    executionHandler: fetchAccessRoles,
  },
];
