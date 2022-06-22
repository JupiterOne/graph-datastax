import { accessRoleSteps } from './access-role';
import { databaseSteps } from './database';
import { accessListSteps } from './access-list';
import { organizationSteps } from './organization';
import { userSteps } from './user';

const integrationSteps = [
  ...accessRoleSteps,
  ...databaseSteps,
  ...accessListSteps,
  ...organizationSteps,
  ...userSteps,
];

export { integrationSteps };
