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

export type AvailablePlacesForPlan = {
  __typename?: 'AvailablePlacesForPlan';
  places: Array<Place>;
};

export type AvailablePlacesForPlanInput = {
  session: Scalars['String'];
};

export type CachedCreatedPlans = {
  __typename?: 'CachedCreatedPlans';
  createdBasedOnCurrentLocation: Scalars['Boolean'];
  plans?: Maybe<Array<Plan>>;
};

export type CachedCreatedPlansInput = {
  session: Scalars['String'];
};

export type ChangePlacesOrderInPlanCandidateInput = {
  currentLatitude?: InputMaybe<Scalars['Float']>;
  currentLongitude?: InputMaybe<Scalars['Float']>;
  placeIds: Array<Scalars['String']>;
  planId: Scalars['String'];
  session: Scalars['String'];
};

export type ChangePlacesOrderInPlanCandidateOutput = {
  __typename?: 'ChangePlacesOrderInPlanCandidateOutput';
  plan: Plan;
};

export type CreatePlanByLocationInput = {
  categoriesDisliked?: InputMaybe<Array<Scalars['String']>>;
  categoriesPreferred?: InputMaybe<Array<Scalars['String']>>;
  createdBasedOnCurrentLocation?: InputMaybe<Scalars['Boolean']>;
  freeTime?: InputMaybe<Scalars['Int']>;
  googlePlaceId?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  session?: InputMaybe<Scalars['String']>;
};

export type CreatePlanByLocationOutput = {
  __typename?: 'CreatePlanByLocationOutput';
  plans: Array<Plan>;
  session: Scalars['String'];
};

export type CreatePlanByPlaceInput = {
  placeId: Scalars['String'];
  session: Scalars['String'];
};

export type CreatePlanByPlaceOutput = {
  __typename?: 'CreatePlanByPlaceOutput';
  plan: Plan;
  session: Scalars['String'];
};

export type FirebaseUserInput = {
  firebaseAuthToken: Scalars['String'];
  firebaseUserId: Scalars['String'];
};

export type GeoLocation = {
  __typename?: 'GeoLocation';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type GooglePlaceReview = {
  __typename?: 'GooglePlaceReview';
  authorName: Scalars['String'];
  authorPhotoUrl?: Maybe<Scalars['String']>;
  authorUrl?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  originalLanguage?: Maybe<Scalars['String']>;
  rating: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  time: Scalars['Int'];
};

export type Image = {
  __typename?: 'Image';
  default: Scalars['String'];
  large?: Maybe<Scalars['String']>;
  small?: Maybe<Scalars['String']>;
};

export enum ImageSize {
  Large = 'LARGE',
  Small = 'SMALL'
}

export type InterestCandidate = {
  __typename?: 'InterestCandidate';
  categories: Array<LocationCategory>;
  session: Scalars['String'];
};

export type LocationCategory = {
  __typename?: 'LocationCategory';
  defaultPhotoUrl: Scalars['String'];
  displayName: Scalars['String'];
  name: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
};

export type MatchInterestsInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePlacesOrderInPlanCandidate: ChangePlacesOrderInPlanCandidateOutput;
  createPlanByLocation: CreatePlanByLocationOutput;
  createPlanByPlace: CreatePlanByPlaceOutput;
  ping: Scalars['String'];
  savePlanFromCandidate: SavePlanFromCandidateOutput;
};


export type MutationChangePlacesOrderInPlanCandidateArgs = {
  input: ChangePlacesOrderInPlanCandidateInput;
};


export type MutationCreatePlanByLocationArgs = {
  input: CreatePlanByLocationInput;
};


export type MutationCreatePlanByPlaceArgs = {
  input: CreatePlanByPlaceInput;
};


export type MutationPingArgs = {
  message: Scalars['String'];
};


export type MutationSavePlanFromCandidateArgs = {
  input: SavePlanFromCandidateInput;
};

export type Place = {
  __typename?: 'Place';
  categories: Array<PlaceCategory>;
  estimatedStayDuration: Scalars['Int'];
  googlePlaceId?: Maybe<Scalars['String']>;
  googleReviews?: Maybe<Array<GooglePlaceReview>>;
  id: Scalars['String'];
  images: Array<Image>;
  location: GeoLocation;
  name: Scalars['String'];
  photos: Array<Scalars['String']>;
};

export type PlaceCategory = {
  __typename?: 'PlaceCategory';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Plan = {
  __typename?: 'Plan';
  authorId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  places: Array<Place>;
  timeInMinutes: Scalars['Int'];
  transitions: Array<Transition>;
};

export type PlansByLocationInput = {
  latitude: Scalars['Float'];
  limit?: InputMaybe<Scalars['Int']>;
  longitude: Scalars['Float'];
  pageKey?: InputMaybe<Scalars['String']>;
};

export type PlansByLocationOutput = {
  __typename?: 'PlansByLocationOutput';
  pageKey?: Maybe<Scalars['String']>;
  plans: Array<Plan>;
};

export type PlansByUserInput = {
  userId: Scalars['String'];
};

export type PlansByUserOutput = {
  __typename?: 'PlansByUserOutput';
  author: User;
  plans: Array<Plan>;
};

export type Query = {
  __typename?: 'Query';
  availablePlacesForPlan: AvailablePlacesForPlan;
  cachedCreatedPlans: CachedCreatedPlans;
  firebaseUser: User;
  matchInterests: InterestCandidate;
  plan?: Maybe<Plan>;
  plans: Array<Plan>;
  plansByLocation: PlansByLocationOutput;
  plansByUser: PlansByUserOutput;
  version: Scalars['String'];
};


export type QueryAvailablePlacesForPlanArgs = {
  input: AvailablePlacesForPlanInput;
};


export type QueryCachedCreatedPlansArgs = {
  input: CachedCreatedPlansInput;
};


export type QueryFirebaseUserArgs = {
  input?: InputMaybe<FirebaseUserInput>;
};


export type QueryMatchInterestsArgs = {
  input?: InputMaybe<MatchInterestsInput>;
};


export type QueryPlanArgs = {
  id: Scalars['String'];
};


export type QueryPlansArgs = {
  pageKey?: InputMaybe<Scalars['String']>;
};


export type QueryPlansByLocationArgs = {
  input: PlansByLocationInput;
};


export type QueryPlansByUserArgs = {
  input: PlansByUserInput;
};

export type SavePlanFromCandidateInput = {
  authToken?: InputMaybe<Scalars['String']>;
  planId: Scalars['String'];
  session: Scalars['String'];
};

export type SavePlanFromCandidateOutput = {
  __typename?: 'SavePlanFromCandidateOutput';
  plan: Plan;
};

export type Transition = {
  __typename?: 'Transition';
  duration: Scalars['Int'];
  from?: Maybe<Place>;
  to: Place;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  photoUrl?: Maybe<Scalars['String']>;
};

export type MatchInterestsQueryVariables = Exact<{
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
}>;


export type MatchInterestsQuery = { __typename?: 'Query', matchInterests: { __typename?: 'InterestCandidate', session: string, categories: Array<{ __typename?: 'LocationCategory', name: string, displayName: string, photo?: string | null, defaultPhotoUrl: string }> } };

export type FetchPlanByIdQueryVariables = Exact<{
  planId: Scalars['String'];
}>;


export type FetchPlanByIdQuery = { __typename?: 'Query', plan?: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId?: string | null, name: string, estimatedStayDuration: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews?: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }> | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> } | null };

export type PlansByLocationQueryVariables = Exact<{
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  limit?: InputMaybe<Scalars['Int']>;
  pageKey?: InputMaybe<Scalars['String']>;
}>;


export type PlansByLocationQuery = { __typename?: 'Query', plansByLocation: { __typename?: 'PlansByLocationOutput', pageKey?: string | null, plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId?: string | null, name: string, estimatedStayDuration: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews?: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }> | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> }> } };

export type PlansByUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type PlansByUserQuery = { __typename?: 'Query', plansByUser: { __typename?: 'PlansByUserOutput', plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, authorId?: string | null, places: Array<{ __typename?: 'Place', id: string, googlePlaceId?: string | null, name: string, estimatedStayDuration: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number } }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> }>, author: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } } };

export type FetchAvailablePlacesForPlanCandidateQueryVariables = Exact<{
  session: Scalars['String'];
}>;


export type FetchAvailablePlacesForPlanCandidateQuery = { __typename?: 'Query', availablePlacesForPlan: { __typename?: 'AvailablePlacesForPlan', places: Array<{ __typename?: 'Place', id: string, googlePlaceId?: string | null, name: string, estimatedStayDuration: number, location: { __typename?: 'GeoLocation', latitude: number, longitude: number }, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }> }> } };

export type ChangePlacesOrderInPlanCandidateMutationVariables = Exact<{
  input: ChangePlacesOrderInPlanCandidateInput;
}>;


export type ChangePlacesOrderInPlanCandidateMutation = { __typename?: 'Mutation', changePlacesOrderInPlanCandidate: { __typename?: 'ChangePlacesOrderInPlanCandidateOutput', plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId?: string | null, name: string, estimatedStayDuration: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number } }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> } } };

export type CreatePlanByLocationMutationVariables = Exact<{
  session?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  googlePlaceId?: InputMaybe<Scalars['String']>;
  categoriesPreferred?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  categoriesDisliked?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  planDuration?: InputMaybe<Scalars['Int']>;
  basedOnCurrentLocation: Scalars['Boolean'];
}>;


export type CreatePlanByLocationMutation = { __typename?: 'Mutation', createPlanByLocation: { __typename?: 'CreatePlanByLocationOutput', session: string, plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId?: string | null, name: string, estimatedStayDuration: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews?: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }> | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> }> } };

export type CreatePlanByPlaceMutationVariables = Exact<{
  sessionId: Scalars['String'];
  placeId: Scalars['String'];
}>;


export type CreatePlanByPlaceMutation = { __typename?: 'Mutation', createPlanByPlace: { __typename?: 'CreatePlanByPlaceOutput', session: string, plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId?: string | null, name: string, estimatedStayDuration: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews?: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }> | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> } } };

export type CachedCreatedPlansQueryVariables = Exact<{
  session: Scalars['String'];
}>;


export type CachedCreatedPlansQuery = { __typename?: 'Query', cachedCreatedPlans: { __typename?: 'CachedCreatedPlans', createdBasedOnCurrentLocation: boolean, plans?: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId?: string | null, name: string, estimatedStayDuration: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews?: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }> | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> }> | null } };

export type FetchPlansQueryVariables = Exact<{
  pageKey?: InputMaybe<Scalars['String']>;
}>;


export type FetchPlansQuery = { __typename?: 'Query', plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId?: string | null, name: string, estimatedStayDuration: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number } }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> }> };

export type SavePlanFromCandidateMutationVariables = Exact<{
  session: Scalars['String'];
  planId: Scalars['String'];
  authToken?: InputMaybe<Scalars['String']>;
}>;


export type SavePlanFromCandidateMutation = { __typename?: 'Mutation', savePlanFromCandidate: { __typename?: 'SavePlanFromCandidateOutput', plan: { __typename?: 'Plan', id: string } } };

export type FirebaseUserQueryVariables = Exact<{
  firebaseUserId: Scalars['String'];
  firebaseToken: Scalars['String'];
}>;


export type FirebaseUserQuery = { __typename?: 'Query', firebaseUser: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } };

export type VersionQueryVariables = Exact<{ [key: string]: never; }>;


export type VersionQuery = { __typename?: 'Query', version: string };


export const MatchInterestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MatchInterests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"matchInterests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"defaultPhotoUrl"}}]}}]}}]}}]} as unknown as DocumentNode<MatchInterestsQuery, MatchInterestsQueryVariables>;
export const FetchPlanByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchPlanById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FetchPlanByIdQuery, FetchPlanByIdQueryVariables>;
export const PlansByLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlansByLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageKey"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plansByLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageKey"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageKey"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PlansByLocationQuery, PlansByLocationQueryVariables>;
export const PlansByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlansByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plansByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}}]}}]}}]} as unknown as DocumentNode<PlansByUserQuery, PlansByUserQueryVariables>;
export const FetchAvailablePlacesForPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchAvailablePlacesForPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"session"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"availablePlacesForPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"session"},"value":{"kind":"Variable","name":{"kind":"Name","value":"session"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}}]}}]}}]}}]} as unknown as DocumentNode<FetchAvailablePlacesForPlanCandidateQuery, FetchAvailablePlacesForPlanCandidateQueryVariables>;
export const ChangePlacesOrderInPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePlacesOrderInPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePlacesOrderInPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePlacesOrderInPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangePlacesOrderInPlanCandidateMutation, ChangePlacesOrderInPlanCandidateMutationVariables>;
export const CreatePlanByLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePlanByLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"session"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"googlePlaceId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoriesPreferred"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoriesDisliked"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planDuration"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"basedOnCurrentLocation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlanByLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"session"},"value":{"kind":"Variable","name":{"kind":"Name","value":"session"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"googlePlaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"googlePlaceId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"categoriesPreferred"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoriesPreferred"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"categoriesDisliked"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoriesDisliked"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"freeTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planDuration"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"createdBasedOnCurrentLocation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"basedOnCurrentLocation"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreatePlanByLocationMutation, CreatePlanByLocationMutationVariables>;
export const CreatePlanByPlaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePlanByPlace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"placeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlanByPlace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"session"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"placeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"placeId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreatePlanByPlaceMutation, CreatePlanByPlaceMutationVariables>;
export const CachedCreatedPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CachedCreatedPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"session"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cachedCreatedPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"session"},"value":{"kind":"Variable","name":{"kind":"Name","value":"session"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdBasedOnCurrentLocation"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CachedCreatedPlansQuery, CachedCreatedPlansQueryVariables>;
export const FetchPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageKey"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FetchPlansQuery, FetchPlansQueryVariables>;
export const SavePlanFromCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SavePlanFromCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"session"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"savePlanFromCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"session"},"value":{"kind":"Variable","name":{"kind":"Name","value":"session"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"planId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"authToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authToken"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<SavePlanFromCandidateMutation, SavePlanFromCandidateMutationVariables>;
export const FirebaseUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FirebaseUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firebaseUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firebaseToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firebaseUserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firebaseUserId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"firebaseAuthToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firebaseToken"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}}]}}]} as unknown as DocumentNode<FirebaseUserQuery, FirebaseUserQueryVariables>;
export const VersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Version"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<VersionQuery, VersionQueryVariables>;