import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { organizationSpec } from './organization';
import { databaseSpec } from './database';
import { ipAddressSpec } from './ip-address';
import { userSpec } from './user';
import { accessRoleSpec } from './access-role';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [
    ...organizationSpec,
    ...databaseSpec,
    ...ipAddressSpec,
    ...userSpec,
    ...accessRoleSpec,
  ],
};
