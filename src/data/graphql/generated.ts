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

export type CachedCreatedPlans = {
  __typename?: 'CachedCreatedPlans';
  createdBasedOnCurrentLocation: Scalars['Boolean'];
  plans?: Maybe<Array<Plan>>;
};

export type CachedCreatedPlansInput = {
  session: Scalars['String'];
};

export type CreatePlanByLocationInput = {
  categories?: InputMaybe<Array<Scalars['String']>>;
  createdBasedOnCurrentLocation?: InputMaybe<Scalars['Boolean']>;
  freeTime?: InputMaybe<Scalars['Int']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type CreatePlanByLocationOutput = {
  __typename?: 'CreatePlanByLocationOutput';
  plans: Array<Plan>;
  session: Scalars['String'];
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
  createPlanByLocation: CreatePlanByLocationOutput;
  ping: Scalars['String'];
};


export type MutationCreatePlanByLocationArgs = {
  input: CreatePlanByLocationInput;
};


export type MutationPingArgs = {
  message: Scalars['String'];
};

export type Place = {
  __typename?: 'Place';
  estimatedStayDuration: Scalars['Int'];
  location: GeoLocation;
  name: Scalars['String'];
  photos?: Maybe<Array<Scalars['String']>>;
};

export type Plan = {
  __typename?: 'Plan';
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  places: Array<Place>;
  timeInMinutes: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  cachedCreatedPlans: CachedCreatedPlans;
  matchInterests: InterestCandidate;
  version: Scalars['String'];
};


export type QueryCachedCreatedPlansArgs = {
  input: CachedCreatedPlansInput;
};


export type QueryMatchInterestsArgs = {
  input?: InputMaybe<MatchInterestsInput>;
};

export type CachedCreatedPlansQueryVariables = Exact<{
  session: Scalars['String'];
}>;


export type CachedCreatedPlansQuery = { __typename?: 'Query', cachedCreatedPlans: { __typename?: 'CachedCreatedPlans', createdBasedOnCurrentLocation: boolean, plans?: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', name: string, photos?: Array<string> | null, location: { __typename?: 'GeoLocation', longitude: number, latitude: number } }> }> | null } };

export type CreatePlanByLocationMutationVariables = Exact<{
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  categories?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  planDuration?: InputMaybe<Scalars['Int']>;
}>;


export type CreatePlanByLocationMutation = { __typename?: 'Mutation', createPlanByLocation: { __typename?: 'CreatePlanByLocationOutput', session: string, plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', name: string, photos?: Array<string> | null, location: { __typename?: 'GeoLocation', longitude: number, latitude: number } }> }> } };

export type MatchInterestsQueryVariables = Exact<{
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
}>;


export type MatchInterestsQuery = { __typename?: 'Query', matchInterests: { __typename?: 'InterestCandidate', categories: Array<{ __typename?: 'LocationCategory', name: string, displayName: string, photo: string }> } };

export type VersionQueryVariables = Exact<{ [key: string]: never; }>;


export type VersionQuery = { __typename?: 'Query', version: string };


export const CachedCreatedPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CachedCreatedPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"session"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cachedCreatedPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"session"},"value":{"kind":"Variable","name":{"kind":"Name","value":"session"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdBasedOnCurrentLocation"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}}]}}]}}]}}]} as unknown as DocumentNode<CachedCreatedPlansQuery, CachedCreatedPlansQueryVariables>;
export const CreatePlanByLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePlanByLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categories"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planDuration"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlanByLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"categories"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categories"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"freeTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planDuration"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePlanByLocationMutation, CreatePlanByLocationMutationVariables>;
export const MatchInterestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MatchInterests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"matchInterests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]}}]}}]} as unknown as DocumentNode<MatchInterestsQuery, MatchInterestsQueryVariables>;
export const VersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Version"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<VersionQuery, VersionQueryVariables>;