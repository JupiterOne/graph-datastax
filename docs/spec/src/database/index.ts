import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const databaseSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://api.astra.datastax.com/v2/databases
     * PATTERN: Fetch Entities
     */
    id: 'fetch-databases',
    name: 'Fetch Databases',
    entities: [
      {
        resourceName: 'Database',
        _type: 'datastax_database',
        _class: ['Database'],
      },
    ],
    relationships: [
      {
        _type: 'datastax_organization_has_database',
        sourceType: 'datastax_organization',
        _class: RelationshipClass.HAS,
        targetType: 'datastax_database',
      },
    ],
    dependsOn: ['fetch-organization'],
    implemented: true,
  },
];
