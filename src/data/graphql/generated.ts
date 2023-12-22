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

export type AddPlaceToPlanCandidateAfterPlaceInput = {
  placeId: Scalars['String'];
  planCandidateId: Scalars['String'];
  planId: Scalars['String'];
  previousPlaceId: Scalars['String'];
};

export type AddPlaceToPlanCandidateAfterPlaceOutput = {
  __typename?: 'AddPlaceToPlanCandidateAfterPlaceOutput';
  plan: Plan;
  planCandidateId: Scalars['String'];
};

export type AutoReorderPlacesInPlanCandidateInput = {
  planCandidateId: Scalars['String'];
  planId: Scalars['String'];
};

export type AutoReorderPlacesInPlanCandidateOutput = {
  __typename?: 'AutoReorderPlacesInPlanCandidateOutput';
  plan: Plan;
  planCandidateId: Scalars['String'];
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
  likedPlaceIds: Array<Scalars['ID']>;
  plans: Array<Plan>;
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

export type CreatePlanByGooglePlaceIdInput = {
  categoriesDisliked?: InputMaybe<Array<Scalars['String']>>;
  categoriesPreferred?: InputMaybe<Array<Scalars['String']>>;
  freeTime?: InputMaybe<Scalars['Int']>;
  googlePlaceId: Scalars['String'];
  planCandidateId?: InputMaybe<Scalars['String']>;
};

export type CreatePlanByGooglePlaceIdOutput = {
  __typename?: 'CreatePlanByGooglePlaceIdOutput';
  planCandidate: PlanCandidate;
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

export type DeletePlaceFromPlanCandidateInput = {
  placeId: Scalars['String'];
  planCandidateId: Scalars['String'];
  planId: Scalars['String'];
};

export type DeletePlaceFromPlanCandidateOutput = {
  __typename?: 'DeletePlaceFromPlanCandidateOutput';
  plan: Plan;
  planCandidateId: Scalars['String'];
};

export type EditPlanTitleOfPlanCandidateInput = {
  planCandidateId: Scalars['String'];
  planId: Scalars['String'];
  title: Scalars['String'];
};

export type EditPlanTitleOfPlanCandidateOutput = {
  __typename?: 'EditPlanTitleOfPlanCandidateOutput';
  plan: Plan;
  planCandidateId: Scalars['String'];
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

export type LikeToPlaceInPlanCandidateInput = {
  like: Scalars['Boolean'];
  placeId: Scalars['String'];
  planCandidateId: Scalars['String'];
};

export type LikeToPlaceInPlanCandidateOutput = {
  __typename?: 'LikeToPlaceInPlanCandidateOutput';
  planCandidate: PlanCandidate;
};

export type LocationCategory = {
  __typename?: 'LocationCategory';
  defaultPhotoUrl: Scalars['String'];
  displayName: Scalars['String'];
  name: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPlaceToPlanCandidateAfterPlace: AddPlaceToPlanCandidateAfterPlaceOutput;
  autoReorderPlacesInPlanCandidate: AutoReorderPlacesInPlanCandidateOutput;
  changePlacesOrderInPlanCandidate: ChangePlacesOrderInPlanCandidateOutput;
  createPlanByGooglePlaceId: CreatePlanByGooglePlaceIdOutput;
  createPlanByLocation: CreatePlanByLocationOutput;
  createPlanByPlace: CreatePlanByPlaceOutput;
  deletePlaceFromPlanCandidate: DeletePlaceFromPlanCandidateOutput;
  editPlanTitleOfPlanCandidate: EditPlanTitleOfPlanCandidateOutput;
  likeToPlaceInPlanCandidate: LikeToPlaceInPlanCandidateOutput;
  ping: Scalars['String'];
  replacePlaceOfPlanCandidate: ReplacePlaceOfPlanCandidateOutput;
  savePlanFromCandidate: SavePlanFromCandidateOutput;
};


export type MutationAddPlaceToPlanCandidateAfterPlaceArgs = {
  input?: InputMaybe<AddPlaceToPlanCandidateAfterPlaceInput>;
};


export type MutationAutoReorderPlacesInPlanCandidateArgs = {
  input: AutoReorderPlacesInPlanCandidateInput;
};


export type MutationChangePlacesOrderInPlanCandidateArgs = {
  input: ChangePlacesOrderInPlanCandidateInput;
};


export type MutationCreatePlanByGooglePlaceIdArgs = {
  input: CreatePlanByGooglePlaceIdInput;
};


export type MutationCreatePlanByLocationArgs = {
  input: CreatePlanByLocationInput;
};


export type MutationCreatePlanByPlaceArgs = {
  input: CreatePlanByPlaceInput;
};


export type MutationDeletePlaceFromPlanCandidateArgs = {
  input: DeletePlaceFromPlanCandidateInput;
};


export type MutationEditPlanTitleOfPlanCandidateArgs = {
  input: EditPlanTitleOfPlanCandidateInput;
};


export type MutationLikeToPlaceInPlanCandidateArgs = {
  input: LikeToPlaceInPlanCandidateInput;
};


export type MutationPingArgs = {
  message: Scalars['String'];
};


export type MutationReplacePlaceOfPlanCandidateArgs = {
  input: ReplacePlaceOfPlanCandidateInput;
};


export type MutationSavePlanFromCandidateArgs = {
  input: SavePlanFromCandidateInput;
};

export type NearbyLocationCategory = {
  __typename?: 'NearbyLocationCategory';
  defaultPhotoUrl: Scalars['String'];
  displayName: Scalars['String'];
  id: Scalars['String'];
  places: Array<Place>;
};

export type NearbyPlaceCategoriesInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type NearbyPlaceCategoryOutput = {
  __typename?: 'NearbyPlaceCategoryOutput';
  categories: Array<NearbyLocationCategory>;
  planCandidateId: Scalars['ID'];
};

export type Place = {
  __typename?: 'Place';
  categories: Array<PlaceCategory>;
  estimatedStayDuration: Scalars['Int'];
  googlePlaceId: Scalars['String'];
  googleReviews: Array<GooglePlaceReview>;
  id: Scalars['String'];
  images: Array<Image>;
  likeCount: Scalars['Int'];
  location: GeoLocation;
  name: Scalars['String'];
  priceRange?: Maybe<PriceRange>;
};

export type PlaceCategory = {
  __typename?: 'PlaceCategory';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type PlacesToAddForPlanCandidateInput = {
  planCandidateId: Scalars['ID'];
  planId: Scalars['ID'];
};

export type PlacesToAddForPlanCandidateOutput = {
  __typename?: 'PlacesToAddForPlanCandidateOutput';
  places: Array<Place>;
};

export type PlacesToReplaceForPlanCandidateInput = {
  placeId: Scalars['ID'];
  planCandidateId: Scalars['ID'];
  planId: Scalars['ID'];
};

export type PlacesToReplaceForPlanCandidateOutput = {
  __typename?: 'PlacesToReplaceForPlanCandidateOutput';
  places: Array<Place>;
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

export type PlanCandidate = {
  __typename?: 'PlanCandidate';
  createdBasedOnCurrentLocation: Scalars['Boolean'];
  id: Scalars['String'];
  likedPlaceIds: Array<Scalars['String']>;
  plans: Array<Plan>;
};

export type PlanCandidateInput = {
  planCandidateId: Scalars['ID'];
};

export type PlanCandidateOutput = {
  __typename?: 'PlanCandidateOutput';
  planCandidate?: Maybe<PlanCandidate>;
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

export type PriceRange = {
  __typename?: 'PriceRange';
  googlePriceLevel: Scalars['Int'];
  priceRangeMax: Scalars['Int'];
  priceRangeMin: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  availablePlacesForPlan: AvailablePlacesForPlan;
  cachedCreatedPlans: CachedCreatedPlans;
  firebaseUser: User;
  nearbyPlaceCategories: NearbyPlaceCategoryOutput;
  placesToAddForPlanCandidate: PlacesToAddForPlanCandidateOutput;
  placesToReplaceForPlanCandidate: PlacesToReplaceForPlanCandidateOutput;
  plan?: Maybe<Plan>;
  planCandidate: PlanCandidateOutput;
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


export type QueryNearbyPlaceCategoriesArgs = {
  input: NearbyPlaceCategoriesInput;
};


export type QueryPlacesToAddForPlanCandidateArgs = {
  input: PlacesToAddForPlanCandidateInput;
};


export type QueryPlacesToReplaceForPlanCandidateArgs = {
  input: PlacesToReplaceForPlanCandidateInput;
};


export type QueryPlanArgs = {
  id: Scalars['String'];
};


export type QueryPlanCandidateArgs = {
  input: PlanCandidateInput;
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

export type ReplacePlaceOfPlanCandidateInput = {
  placeIdToRemove: Scalars['String'];
  placeIdToReplace: Scalars['String'];
  planCandidateId: Scalars['String'];
  planId: Scalars['String'];
};

export type ReplacePlaceOfPlanCandidateOutput = {
  __typename?: 'ReplacePlaceOfPlanCandidateOutput';
  plan: Plan;
  planCandidateId: Scalars['String'];
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

export type PlaceFullFragmentFragment = { __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null };

export type PlanFullFragmentFragment = { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, authorId?: string | null, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> };

export type PlanCandidateFullFragmentFragment = { __typename?: 'PlanCandidate', id: string, likedPlaceIds: Array<string>, plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, authorId?: string | null, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> }> };

export type FetchPlansQueryVariables = Exact<{
  pageKey?: InputMaybe<Scalars['String']>;
}>;


export type FetchPlansQuery = { __typename?: 'Query', plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> }> };

export type FetchPlanByIdQueryVariables = Exact<{
  planId: Scalars['String'];
}>;


export type FetchPlanByIdQuery = { __typename?: 'Query', plan?: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> } | null };

export type PlansByLocationQueryVariables = Exact<{
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  limit?: InputMaybe<Scalars['Int']>;
  pageKey?: InputMaybe<Scalars['String']>;
}>;


export type PlansByLocationQuery = { __typename?: 'Query', plansByLocation: { __typename?: 'PlansByLocationOutput', pageKey?: string | null, plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> }> } };

export type PlansByUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type PlansByUserQuery = { __typename?: 'Query', plansByUser: { __typename?: 'PlansByUserOutput', plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, authorId?: string | null, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> }>, author: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } } };

export type AddPlaceToPlanCandidateMutationVariables = Exact<{
  input: AddPlaceToPlanCandidateAfterPlaceInput;
}>;


export type AddPlaceToPlanCandidateMutation = { __typename?: 'Mutation', addPlaceToPlanCandidateAfterPlace: { __typename?: 'AddPlaceToPlanCandidateAfterPlaceOutput', planCandidateId: string, plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> } } };

export type CreatePlanByLocationMutationVariables = Exact<{
  input: CreatePlanByLocationInput;
}>;


export type CreatePlanByLocationMutation = { __typename?: 'Mutation', createPlanByLocation: { __typename?: 'CreatePlanByLocationOutput', session: string, plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, authorId?: string | null, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> }> } };

export type CreatePlanByPlaceMutationVariables = Exact<{
  sessionId: Scalars['String'];
  placeId: Scalars['String'];
}>;


export type CreatePlanByPlaceMutation = { __typename?: 'Mutation', createPlanByPlace: { __typename?: 'CreatePlanByPlaceOutput', session: string, plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, authorId?: string | null, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> } } };

export type DeletePlaceFromPlanCandidateMutationVariables = Exact<{
  input: DeletePlaceFromPlanCandidateInput;
}>;


export type DeletePlaceFromPlanCandidateMutation = { __typename?: 'Mutation', deletePlaceFromPlanCandidate: { __typename?: 'DeletePlaceFromPlanCandidateOutput', planCandidateId: string, plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, authorId?: string | null, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> } } };

export type EditPlanTitleOfPlanCandidateMutationVariables = Exact<{
  input: EditPlanTitleOfPlanCandidateInput;
}>;


export type EditPlanTitleOfPlanCandidateMutation = { __typename?: 'Mutation', editPlanTitleOfPlanCandidate: { __typename?: 'EditPlanTitleOfPlanCandidateOutput', planCandidateId: string, plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, authorId?: string | null, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> } } };

export type ReplacePlaceOfPlanCandidateMutationVariables = Exact<{
  input: ReplacePlaceOfPlanCandidateInput;
}>;


export type ReplacePlaceOfPlanCandidateMutation = { __typename?: 'Mutation', replacePlaceOfPlanCandidate: { __typename?: 'ReplacePlaceOfPlanCandidateOutput', planCandidateId: string, plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, authorId?: string | null, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> } } };

export type SavePlanFromCandidateMutationVariables = Exact<{
  session: Scalars['String'];
  planId: Scalars['String'];
  authToken?: InputMaybe<Scalars['String']>;
}>;


export type SavePlanFromCandidateMutation = { __typename?: 'Mutation', savePlanFromCandidate: { __typename?: 'SavePlanFromCandidateOutput', plan: { __typename?: 'Plan', id: string } } };

export type UpdateLikeAtPlaceInPlanCandidateMutationVariables = Exact<{
  input: LikeToPlaceInPlanCandidateInput;
}>;


export type UpdateLikeAtPlaceInPlanCandidateMutation = { __typename?: 'Mutation', likeToPlaceInPlanCandidate: { __typename?: 'LikeToPlaceInPlanCandidateOutput', planCandidate: { __typename?: 'PlanCandidate', id: string, likedPlaceIds: Array<string>, plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, authorId?: string | null, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> }> } } };

export type ChangePlacesOrderInPlanCandidateMutationVariables = Exact<{
  input: ChangePlacesOrderInPlanCandidateInput;
}>;


export type ChangePlacesOrderInPlanCandidateMutation = { __typename?: 'Mutation', changePlacesOrderInPlanCandidate: { __typename?: 'ChangePlacesOrderInPlanCandidateOutput', plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, authorId?: string | null, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> } } };

export type FetchAvailablePlacesForPlanCandidateQueryVariables = Exact<{
  session: Scalars['String'];
}>;


export type FetchAvailablePlacesForPlanCandidateQuery = { __typename?: 'Query', availablePlacesForPlan: { __typename?: 'AvailablePlacesForPlan', places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }> } };

export type NearbyPlaceCategoriesQueryVariables = Exact<{
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
}>;


export type NearbyPlaceCategoriesQuery = { __typename?: 'Query', nearbyPlaceCategories: { __typename?: 'NearbyPlaceCategoryOutput', planCandidateId: string, categories: Array<{ __typename?: 'NearbyLocationCategory', id: string, displayName: string, defaultPhotoUrl: string, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }> }> } };

export type PlacesToAddForPlanOfPlanCandidateQueryVariables = Exact<{
  input: PlacesToAddForPlanCandidateInput;
}>;


export type PlacesToAddForPlanOfPlanCandidateQuery = { __typename?: 'Query', placesToAddForPlanCandidate: { __typename?: 'PlacesToAddForPlanCandidateOutput', places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }> } };

export type PlacesToReplaceForPlanOfPlanCandidateQueryVariables = Exact<{
  input: PlacesToReplaceForPlanCandidateInput;
}>;


export type PlacesToReplaceForPlanOfPlanCandidateQuery = { __typename?: 'Query', placesToReplaceForPlanCandidate: { __typename?: 'PlacesToReplaceForPlanCandidateOutput', places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }> } };

export type CachedCreatedPlansQueryVariables = Exact<{
  session: Scalars['String'];
}>;


export type CachedCreatedPlansQuery = { __typename?: 'Query', cachedCreatedPlans: { __typename?: 'CachedCreatedPlans', createdBasedOnCurrentLocation: boolean, likedPlaceIds: Array<string>, plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, authorId?: string | null, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, googleReviews: Array<{ __typename?: 'GooglePlaceReview', rating: number, text?: string | null, authorName: string, authorPhotoUrl?: string | null, authorUrl?: string | null, time: number }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> }> } };

export type FirebaseUserQueryVariables = Exact<{
  firebaseUserId: Scalars['String'];
  firebaseToken: Scalars['String'];
}>;


export type FirebaseUserQuery = { __typename?: 'Query', firebaseUser: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } };

export type VersionQueryVariables = Exact<{ [key: string]: never; }>;


export type VersionQuery = { __typename?: 'Query', version: string };

export const PlaceFullFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<PlaceFullFragmentFragment, unknown>;
export const PlanFullFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<PlanFullFragmentFragment, unknown>;
export const PlanCandidateFullFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanCandidateFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanCandidate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedPlaceIds"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]} as unknown as DocumentNode<PlanCandidateFullFragmentFragment, unknown>;
export const FetchPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageKey"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<FetchPlansQuery, FetchPlansQueryVariables>;
export const FetchPlanByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchPlanById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<FetchPlanByIdQuery, FetchPlanByIdQueryVariables>;
export const PlansByLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlansByLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageKey"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plansByLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageKey"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageKey"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<PlansByLocationQuery, PlansByLocationQueryVariables>;
export const PlansByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlansByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plansByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<PlansByUserQuery, PlansByUserQueryVariables>;
export const AddPlaceToPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPlaceToPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddPlaceToPlanCandidateAfterPlaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPlaceToPlanCandidateAfterPlace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidateId"}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<AddPlaceToPlanCandidateMutation, AddPlaceToPlanCandidateMutationVariables>;
export const CreatePlanByLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePlanByLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePlanByLocationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlanByLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]} as unknown as DocumentNode<CreatePlanByLocationMutation, CreatePlanByLocationMutationVariables>;
export const CreatePlanByPlaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePlanByPlace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"placeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlanByPlace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"session"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"placeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"placeId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]} as unknown as DocumentNode<CreatePlanByPlaceMutation, CreatePlanByPlaceMutationVariables>;
export const DeletePlaceFromPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePlaceFromPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeletePlaceFromPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePlaceFromPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidateId"}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]} as unknown as DocumentNode<DeletePlaceFromPlanCandidateMutation, DeletePlaceFromPlanCandidateMutationVariables>;
export const EditPlanTitleOfPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditPlanTitleOfPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditPlanTitleOfPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editPlanTitleOfPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidateId"}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]} as unknown as DocumentNode<EditPlanTitleOfPlanCandidateMutation, EditPlanTitleOfPlanCandidateMutationVariables>;
export const ReplacePlaceOfPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReplacePlaceOfPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReplacePlaceOfPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"replacePlaceOfPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidateId"}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]} as unknown as DocumentNode<ReplacePlaceOfPlanCandidateMutation, ReplacePlaceOfPlanCandidateMutationVariables>;
export const SavePlanFromCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SavePlanFromCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"session"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"savePlanFromCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"session"},"value":{"kind":"Variable","name":{"kind":"Name","value":"session"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"planId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"authToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authToken"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<SavePlanFromCandidateMutation, SavePlanFromCandidateMutationVariables>;
export const UpdateLikeAtPlaceInPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLikeAtPlaceInPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LikeToPlaceInPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeToPlaceInPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanCandidateFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanCandidateFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanCandidate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedPlaceIds"}}]}}]} as unknown as DocumentNode<UpdateLikeAtPlaceInPlanCandidateMutation, UpdateLikeAtPlaceInPlanCandidateMutationVariables>;
export const ChangePlacesOrderInPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePlacesOrderInPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePlacesOrderInPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePlacesOrderInPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]} as unknown as DocumentNode<ChangePlacesOrderInPlanCandidateMutation, ChangePlacesOrderInPlanCandidateMutationVariables>;
export const FetchAvailablePlacesForPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchAvailablePlacesForPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"session"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"availablePlacesForPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"session"},"value":{"kind":"Variable","name":{"kind":"Name","value":"session"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<FetchAvailablePlacesForPlanCandidateQuery, FetchAvailablePlacesForPlanCandidateQueryVariables>;
export const NearbyPlaceCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NearbyPlaceCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nearbyPlaceCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidateId"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"defaultPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<NearbyPlaceCategoriesQuery, NearbyPlaceCategoriesQueryVariables>;
export const PlacesToAddForPlanOfPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlacesToAddForPlanOfPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlacesToAddForPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placesToAddForPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<PlacesToAddForPlanOfPlanCandidateQuery, PlacesToAddForPlanOfPlanCandidateQueryVariables>;
export const PlacesToReplaceForPlanOfPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlacesToReplaceForPlanOfPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlacesToReplaceForPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placesToReplaceForPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<PlacesToReplaceForPlanOfPlanCandidateQuery, PlacesToReplaceForPlanOfPlanCandidateQueryVariables>;
export const CachedCreatedPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CachedCreatedPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"session"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cachedCreatedPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"session"},"value":{"kind":"Variable","name":{"kind":"Name","value":"session"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdBasedOnCurrentLocation"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedPlaceIds"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"googleReviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorUrl"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]} as unknown as DocumentNode<CachedCreatedPlansQuery, CachedCreatedPlansQueryVariables>;
export const FirebaseUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FirebaseUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firebaseUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firebaseToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firebaseUserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firebaseUserId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"firebaseAuthToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firebaseToken"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}}]}}]} as unknown as DocumentNode<FirebaseUserQuery, FirebaseUserQueryVariables>;
export const VersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Version"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<VersionQuery, VersionQueryVariables>;