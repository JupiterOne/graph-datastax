import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { organizationSpec } from './organization';
import { databaseSpec } from './database';
import { accessListSpec } from './access-list';
import { userSpec } from './user';
import { accessRoleSpec } from './access-role';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [
    ...organizationSpec,
    ...databaseSpec,
    ...accessListSpec,
    ...userSpec,
    ...accessRoleSpec,
  ],
};
