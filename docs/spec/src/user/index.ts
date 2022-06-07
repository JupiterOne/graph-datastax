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
    ],
    dependsOn: ['fetch-organization'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT:
     * PATTERN: Build Child Relationships
     */
    id: 'build-user-role-relationships',
    name: 'Build User Role Relationships',
    entities: [],
    relationships: [
      {
        _type: 'datastax_user_assigned_access_role',
        sourceType: 'datastax_user',
        _class: RelationshipClass.ASSIGNED,
        targetType: 'datastax_access_role',
      },
    ],
    dependsOn: ['fetch-users', 'fetch-access-roles'],
    implemented: true,
  },
];
