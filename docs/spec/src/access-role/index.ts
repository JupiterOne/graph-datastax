import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const accessRoleSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://api.astra.datastax.com/v2/organizations/roles
     * PATTERN: Fetch Entities
     */
    id: 'fetch-access-roles',
    name: 'Fetch Access Roles',
    entities: [
      {
        resourceName: 'Access Role',
        _type: 'datastax_access_role',
        _class: ['AccessRole'],
      },
    ],
    relationships: [
      {
        _type: 'datastax_organization_has_access_role',
        sourceType: 'datastax_organization',
        _class: RelationshipClass.HAS,
        targetType: 'datastax_database',
      },
    ],
    dependsOn: ['fetch-organization'],
    implemented: true,
  },
];
