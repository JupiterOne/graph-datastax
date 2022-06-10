import {
  Entity,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { DataStaxUser } from '../../types';
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

  await apiClient.iterateUsers(async (user) => {
    const userEntity = await jobState.addEntity(createUserEntity(user));
    await jobState.addRelationship(
      createOrganizationUserRelationship(organizationEntity, userEntity),
    );
  });
}

export async function buildUserRoleRelationships({
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    {
      _type: Entities.USER._type,
    },
    async (userEntity) => {
      const user = getRawData<DataStaxUser>(userEntity);

      if (!user) {
        logger.warn(
          { _key: userEntity._key },
          'Could not get raw data for user entity',
        );
        return;
      }

      for (const role of user.Roles) {
        const accessRoleEntity = await jobState.findEntity(getRoleKey(role.ID));
        if (accessRoleEntity) {
          await jobState.addRelationship(
            createUserAccessRoleRelationship(userEntity, accessRoleEntity),
          );
        }
      }
    },
  );
}

export const userSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.USERS,
    name: 'Fetch Users',
    entities: [Entities.USER],
    relationships: [Relationships.ORGANIZATION_HAS_USER],
    dependsOn: [Steps.ORGANIZATION],
    executionHandler: fetchUsers,
  },
  {
    id: Steps.BUILD_USER_ROLE_RELATIONSHIPS,
    name: 'Build User Role Relationships',
    entities: [],
    relationships: [Relationships.USER_ASSIGNED_ACCESS_ROLE],
    dependsOn: [Steps.USERS, Steps.ACCESS_ROLES],
    executionHandler: buildUserRoleRelationships,
  },
];
