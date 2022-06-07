import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const ipAddressSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://api.astra.datastax.com/v2/access-lists
     * PATTERN: Fetch Entities
     */
    id: 'fetch-ip-addresses',
    name: 'Fetch IP Addresses',
    entities: [
      {
        resourceName: 'IP Address',
        _type: 'datastax_ip_address',
        _class: ['IpAddress'],
      },
    ],
    relationships: [
      {
        _type: 'datastax_database_allows_ip_address',
        sourceType: 'datastax_database',
        _class: RelationshipClass.ALLOWS,
        targetType: 'datastax_ip_address',
      },
    ],
    dependsOn: ['fetch-databases'],
    implemented: true,
  },
];
