import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const accessListSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://api.astra.datastax.com/v2/access-lists
     * PATTERN: Fetch Entities
     */
    id: 'fetch-access-lists',
    name: 'Fetch Access Lists',
    entities: [
      {
        resourceName: 'Access List',
        _type: 'datastax_access_list',
        _class: ['Configuration'],
      },
      {
        resourceName: 'Access List Address',
        _type: 'datastax_access_list_address',
        _class: ['Configuration'],
      },
    ],
    relationships: [
      {
        _type: 'datastax_organization_has_access_list',
        sourceType: 'datastax_organization',
        _class: RelationshipClass.HAS,
        targetType: 'datastax_access_list',
      },
      {
        _type: 'datastax_access_list_has_address',
        sourceType: 'datastax_access_list',
        _class: RelationshipClass.HAS,
        targetType: 'datastax_access_list_address',
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
    id: 'build-access-list-database-relationships',
    name: 'Build Access List Database Relationships',
    entities: [],
    relationships: [
      {
        _type: 'datastax_database_assigned_access_list',
        sourceType: 'datastax_database',
        _class: RelationshipClass.ASSIGNED,
        targetType: 'datastax_access_list',
      },
    ],
    dependsOn: ['fetch-access-lists', 'fetch-databases'],
    implemented: true,
  },
];
