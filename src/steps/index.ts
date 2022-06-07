import { accessRoleSteps } from './access-role';
import { databaseSteps } from './database';
import { ipAddressSteps } from './ip-address';
import { organizationSteps } from './organization';
import { userSteps } from './user';

const integrationSteps = [
  ...accessRoleSteps,
  ...databaseSteps,
  ...ipAddressSteps,
  ...organizationSteps,
  ...userSteps,
];

export { integrationSteps };
