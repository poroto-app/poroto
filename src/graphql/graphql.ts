import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreatePlanByLocationInput = {
  categories?: InputMaybe<Array<Scalars['String']>>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type GeoLocation = {
  __typename?: 'GeoLocation';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type InterestCandidate = {
  __typename?: 'InterestCandidate';
  categories: Array<LocationCategory>;
};

export type LocationCategory = {
  __typename?: 'LocationCategory';
  displayName: Scalars['String'];
  name: Scalars['String'];
  photo: Scalars['String'];
};

export type MatchInterestsInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPlanByLocation: Array<Plan>;
  ping: Scalars['String'];
};


export type MutationCreatePlanByLocationArgs = {
  input?: InputMaybe<CreatePlanByLocationInput>;
};


export type MutationPingArgs = {
  message: Scalars['String'];
};

export type Place = {
  __typename?: 'Place';
  location: GeoLocation;
  name: Scalars['String'];
  photos?: Maybe<Array<Scalars['String']>>;
};

export type Plan = {
  __typename?: 'Plan';
  name: Scalars['String'];
  places: Array<Place>;
};

export type Query = {
  __typename?: 'Query';
  matchInterests: InterestCandidate;
  version: Scalars['String'];
};


export type QueryMatchInterestsArgs = {
  input?: InputMaybe<MatchInterestsInput>;
};

export type VersionQueryVariables = Exact<{ [key: string]: never; }>;


export type VersionQuery = { __typename?: 'Query', version: string };


export const VersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Version"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<VersionQuery, VersionQueryVariables>;