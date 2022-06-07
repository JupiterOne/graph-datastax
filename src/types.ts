// Providers often supply types with their API libraries.

export interface DataStaxDatabase {
  id: string;
  ownerId: string;
  info: {
    name: string;
    keyspaces: string[];
    datacenters: {
      id: string;
      name: string;
      status: string;
      tier: string;
      cloudProvider: string;
      region: string;
      regionZone: string;
      regionClassification: string;
      capacityUnits: string;
      secureBundleUrl: string;
      secureBundleInternalUrl: string;
      secureBundleMigrationProxyUrl: string;
      secureBundleMigrationProxyInternalUrl: string;
      dateCreated: string;
    }[];
    keyspace: string;
    cloudProvider: string;
    tier: string;
    capacityUnits: string;
    region: string;
  };
  creationTime: string;
  terminationTime: string;
  status: string;
  storage: {
    nodeCount: number;
    replicationFactor: number;
    totalStorage: number;
  };
  metrics: {
    writeRequestsTotalCount: number;
    readRequestsTotalCount: number;
    liveDataSizeBytes: number;
    errorsTotalCount: number;
  };
  cost: {
    costPerMinCents: number;
    costPerHourCents: number;
    costPerDayCents: number;
    costPerMonthCents: number;
    costPerMinMRCents: number;
    costPerHourMRCents: number;
    costPerDayMRCents: number;
    costPerMonthMRCents: number;
    costPerMinParkedCents: number;
    costPerHourParkedCents: number;
    costPerDayParkedCents: number;
    costPerMonthParkedCents: number;
    costPerNetworkGbCents: number;
    costPerWrittenGbCents: number;
    costPerReadGbCents: number;
  };
  availableActions: string[];
  studioUrl: string;
  grafanaUrl: string;
  cqlshUrl: string;
  graphqlUrl: string;
  dataEndpointUrl: string;
  lastUsageTime: string;
  observedStatus: string;
}

export interface DataStaxAccessList {
  organizationId: string;
  databaseId: string;
  addresses: DataStaxIPAddress[];
  configurations: {
    accessListEnabled: boolean;
  };
}

export interface DataStaxIPAddress {
  address: string;
  description: string;
  enabled: boolean;
  lastUpdateDateTime: string;
}

export interface DataStaxUsers {
  OrgID: string;
  OrgName: string;
  Users: DataStaxUser[];
}

export interface DataStaxUser {
  UserID: string;
  Email: string;
  Status: string;
  Roles: DataStaxRole[];
}

export interface DataStaxRole {
  ID: string;
  id: string;
  name: string;
  policy?: {
    description: string;
    resources: string[];
    actions: string[];
    effect: string;
  };
  last_update_date_time?: string;
  last_update_user_id?: string;
}
