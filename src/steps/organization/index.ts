import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../config';
import { Steps, Entities } from '../constants';
import { createOrganizationEntity } from './converter';

export const ORGANIZATION_ENTITY_KEY = 'entity:account';

export async function fetchOrganizationDetails({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const accountEntity = await jobState.addEntity(
    createOrganizationEntity({
      name: instance.config.organizationName,
    }),
  );
  await jobState.setData(ORGANIZATION_ENTITY_KEY, accountEntity);
}

export const organizationSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ORGANIZATION,
    name: 'Fetch Organization Details',
    entities: [Entities.ORGANIZATION],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchOrganizationDetails,
  },
];
