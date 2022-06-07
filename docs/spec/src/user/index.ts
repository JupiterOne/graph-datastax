import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const userSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://api.astra.datastax.com/v2/organizations/users
     * PATTERN: Fetch Entities
     */
    id: 'fetch-users',
    name: 'Fetch Users',
    entities: [
      {
        resourceName: 'User',
        _type: 'datastax_user',
        _class: ['User'],
      },
    ],
    relationships: [
      {
        _type: 'datastax_organization_has_user',
        sourceType: 'datastax_organization',
        _class: RelationshipClass.HAS,
        targetType: 'datastax_user',
      },
      {
        _type: 'datastax_user_has_access_role',
        sourceType: 'datastax_user',
        _class: RelationshipClass.HAS,
        targetType: 'datastax_access_role',
      },
    ],
    dependsOn: ['fetch-organization', 'fetch-access-roles'],
    implemented: true,
  },
];
