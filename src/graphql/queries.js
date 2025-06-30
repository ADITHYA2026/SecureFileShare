/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFileMeta = /* GraphQL */ `
  query GetFileMeta($id: ID!) {
    getFileMeta(id: $id) {
      id
      filename
      fileKey
      expiry
      password
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listFileMetas = /* GraphQL */ `
  query ListFileMetas(
    $filter: ModelFileMetaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFileMetas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        filename
        fileKey
        expiry
        password
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncFileMetas = /* GraphQL */ `
  query SyncFileMetas(
    $filter: ModelFileMetaFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFileMetas(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        filename
        fileKey
        expiry
        password
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
