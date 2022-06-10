import fetch, { Response } from 'node-fetch';
import { retry } from '@lifeomic/attempt';
import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from './config';
import {
  DataStaxDatabase,
  DataStaxAccessList,
  DataStaxUsers,
  DataStaxRole,
  DataStaxUser,
} from './types';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

export class APIClient {
  constructor(readonly config: IntegrationConfig) {}

  private perPage = 100;
  private baseUri = `https://api.astra.datastax.com`;
  private withBaseUri = (path: string) => `${this.baseUri}${path}`;

  private checkStatus = (response: Response) => {
    if (response.ok) {
      return response;
    } else {
      throw new IntegrationProviderAPIError(response);
    }
  };

  private async request(
    uri: string,
    method: 'GET' | 'HEAD' = 'GET',
  ): Promise<any> {
    try {
      // Handle rate-limiting
      const response = await retry(
        async () => {
          const res: Response = await fetch(uri, {
            method,
            headers: {
              Authorization: `Bearer ${this.config.token}`,
            },
          });
          return this.checkStatus(res);
        },
        {
          delay: 5000,
          maxAttempts: 10,
          handleError: (err, context) => {
            if (
              err.statusCode !== 429 ||
              ([500, 502, 503].includes(err.statusCode) &&
                context.attemptNum > 1)
            )
              context.abort();
          },
        },
      );
      return response.json();
    } catch (err) {
      throw new IntegrationProviderAPIError({
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  private async paginatedRequest<T>(
    uri: string,
    method: 'GET' | 'HEAD' = 'GET',
    iteratee: ResourceIteratee<T>,
    iterateeKey: string,
  ): Promise<void> {
    try {
      let nextUri = null;
      do {
        const response = await this.request(nextUri || uri, method);
        nextUri =
          response.length > 0
            ? `${uri}&starting_after=${
                response[response.length - 1][iterateeKey]
              }`
            : response['@pagination']?.next;
        for (const item of response) {
          await iteratee(item);
        }
      } while (nextUri);
    } catch (err) {
      throw new IntegrationProviderAPIError({
        cause: new Error(err.message),
        endpoint: uri,
        status: err.statusCode,
        statusText: err.message,
      });
    }
  }

  public async verifyAuthentication(): Promise<void> {
    const uri = this.withBaseUri('/v2/access-lists');
    try {
      await this.request(uri);
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        cause: err,
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  /**
   * Iterates each database resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateDatabases(
    iteratee: ResourceIteratee<DataStaxDatabase>,
  ): Promise<void> {
    await this.paginatedRequest<DataStaxDatabase>(
      this.withBaseUri(`/v2/databases?limit=${this.perPage}`),
      'GET',
      iteratee,
      'id',
    );
  }

  /**
   * Iterates each access list resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateAccessLists(
    iteratee: ResourceIteratee<DataStaxAccessList>,
  ): Promise<void> {
    const accessLists: DataStaxAccessList[] = await this.request(
      this.withBaseUri(`/v2/access-lists`),
      'GET',
    );
    for (const accessList of accessLists) {
      await iteratee(accessList);
    }
  }

  /**
   * Iterates each user resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateUsers(
    iteratee: ResourceIteratee<DataStaxUser>,
  ): Promise<void> {
    const users: DataStaxUsers = await this.request(
      this.withBaseUri(`/v2/organizations/users`),
      'GET',
    );
    for (const user of users.Users) {
      await iteratee(user);
    }
  }

  /**
   * Iterates each role resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateRoles(
    iteratee: ResourceIteratee<DataStaxRole>,
  ): Promise<void> {
    const roles: DataStaxRole[] = await this.request(
      this.withBaseUri(`/v2/organizations/roles`),
      'GET',
    );
    for (const role of roles) {
      await iteratee(role);
    }
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
