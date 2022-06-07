import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { DataStaxUsers } from '../../types';
import { ORGANIZATION_ENTITY_KEY } from '../organization';
import { Entities, Steps, Relationships } from '../constants';
import { getRoleKey } from '../access-role/converter';
import {
  createUserEntity,
  createOrganizationUserRelationship,
  createUserAccessRoleRelationship,
} from './converter';

export async function fetchUsers({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const organizationEntity = (await jobState.getData(
    ORGANIZATION_ENTITY_KEY,
  )) as Entity;

  const users: DataStaxUsers = await apiClient.fetchUsers();
  for (const user of users.Users) {
    const userEntity = await jobState.addEntity(createUserEntity(user));
    await jobState.addRelationship(
      createOrganizationUserRelationship(organizationEntity, userEntity),
    );

    for (const role of user.Roles) {
      const accessRoleEntity = await jobState.findEntity(getRoleKey(role.ID));
      if (accessRoleEntity) {
        await jobState.addRelationship(
          createUserAccessRoleRelationship(userEntity, accessRoleEntity),
        );
      }
    }
  }
}

export const userSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.USERS,
    name: 'Fetch Users',
    entities: [Entities.USER],
    relationships: [
      Relationships.ORGANIZATION_HAS_USER,
      Relationships.USER_HAS_ACCESS_ROLE,
    ],
    dependsOn: [Steps.ORGANIZATION, Steps.ACCESS_ROLES],
    executionHandler: fetchUsers,
  },
];
