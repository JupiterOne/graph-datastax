import {
  IntegrationExecutionContext,
  IntegrationValidationError,
  IntegrationInstanceConfigFieldMap,
  IntegrationInstanceConfig,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from './client';

export const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  organizationName: {
    type: 'string',
  },
  token: {
    type: 'string',
    mask: true,
  },
};

export interface IntegrationConfig extends IntegrationInstanceConfig {
  organizationName: string;
  token: string;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;

  if (!config.organizationName || !config.token) {
    throw new IntegrationValidationError(
      'Config requires all of {organizationName, token}',
    );
  }

  const apiClient = createAPIClient(config);
  await apiClient.verifyAuthentication();
}
