import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddPlaceToPlanCandidateAfterPlaceInput = {
  placeId: Scalars['String']['input'];
  planCandidateId: Scalars['String']['input'];
  planId: Scalars['String']['input'];
  previousPlaceId: Scalars['String']['input'];
};

export type AddPlaceToPlanCandidateAfterPlaceOutput = {
  __typename?: 'AddPlaceToPlanCandidateAfterPlaceOutput';
  plan: Plan;
  planCandidateId: Scalars['String']['output'];
};

export type AutoReorderPlacesInPlanCandidateInput = {
  planCandidateId: Scalars['String']['input'];
  planId: Scalars['String']['input'];
};

export type AutoReorderPlacesInPlanCandidateOutput = {
  __typename?: 'AutoReorderPlacesInPlanCandidateOutput';
  plan: Plan;
  planCandidateId: Scalars['String']['output'];
};

export type AvailablePlacesForPlan = {
  __typename?: 'AvailablePlacesForPlan';
  places: Array<Place>;
};

export type AvailablePlacesForPlanInput = {
  session: Scalars['String']['input'];
};

export type BindPlanCandidateSetToUserInput = {
  firebaseAuthToken: Scalars['String']['input'];
  planCandidateSetIds: Array<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};

export type BindPlanCandidateSetToUserOutput = {
  __typename?: 'BindPlanCandidateSetToUserOutput';
  user: User;
};

export type CategoryGroupedPlaces = {
  __typename?: 'CategoryGroupedPlaces';
  category: PlaceCategory;
  places: Array<Place>;
};

export type ChangePlacesOrderInPlanCandidateInput = {
  currentLatitude?: InputMaybe<Scalars['Float']['input']>;
  currentLongitude?: InputMaybe<Scalars['Float']['input']>;
  placeIds: Array<Scalars['String']['input']>;
  planId: Scalars['String']['input'];
  session: Scalars['String']['input'];
};

export type ChangePlacesOrderInPlanCandidateOutput = {
  __typename?: 'ChangePlacesOrderInPlanCandidateOutput';
  plan: Plan;
};

export type CreatePlanByCategoryInput = {
  categoryId: Scalars['String']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  radiusInKm: Scalars['Float']['input'];
};

export type CreatePlanByCategoryOutput = {
  __typename?: 'CreatePlanByCategoryOutput';
  planCandidateSetId: Scalars['String']['output'];
  plans: Array<Plan>;
};

export type CreatePlanByGooglePlaceIdInput = {
  categoriesDisliked?: InputMaybe<Array<Scalars['String']['input']>>;
  categoriesPreferred?: InputMaybe<Array<Scalars['String']['input']>>;
  freeTime?: InputMaybe<Scalars['Int']['input']>;
  googlePlaceId: Scalars['String']['input'];
  planCandidateId?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePlanByGooglePlaceIdOutput = {
  __typename?: 'CreatePlanByGooglePlaceIdOutput';
  planCandidate: PlanCandidate;
};

export type CreatePlanByLocationInput = {
  categoriesDisliked?: InputMaybe<Array<Scalars['String']['input']>>;
  categoriesPreferred?: InputMaybe<Array<Scalars['String']['input']>>;
  createdBasedOnCurrentLocation?: InputMaybe<Scalars['Boolean']['input']>;
  freeTime?: InputMaybe<Scalars['Int']['input']>;
  googlePlaceId?: InputMaybe<Scalars['String']['input']>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  session?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePlanByLocationOutput = {
  __typename?: 'CreatePlanByLocationOutput';
  plans: Array<Plan>;
  session: Scalars['String']['output'];
};

export type CreatePlanByPlaceInput = {
  placeId: Scalars['String']['input'];
  session: Scalars['String']['input'];
};

export type CreatePlanByPlaceOutput = {
  __typename?: 'CreatePlanByPlaceOutput';
  plan: Plan;
  session: Scalars['String']['output'];
};

export type CreatePlanCandidateSetFromSavedPlanInput = {
  firebaseAuthToken?: InputMaybe<Scalars['String']['input']>;
  savedPlanId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePlanCandidateSetFromSavedPlanOutput = {
  __typename?: 'CreatePlanCandidateSetFromSavedPlanOutput';
  planCandidate: PlanCandidate;
};

export type CreatePlanPlaceCategory = {
  __typename?: 'CreatePlanPlaceCategory';
  displayNameEn: Scalars['String']['output'];
  displayNameJa: Scalars['String']['output'];
  id: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
};

export type CreatePlanPlaceCategorySet = {
  __typename?: 'CreatePlanPlaceCategorySet';
  categories: Array<CreatePlanPlaceCategory>;
  displayNameEn: Scalars['String']['output'];
  displayNameJa: Scalars['String']['output'];
};

export type DeletePlaceFromPlanCandidateInput = {
  placeId: Scalars['String']['input'];
  planCandidateId: Scalars['String']['input'];
  planId: Scalars['String']['input'];
};

export type DeletePlaceFromPlanCandidateOutput = {
  __typename?: 'DeletePlaceFromPlanCandidateOutput';
  plan: Plan;
  planCandidateId: Scalars['String']['output'];
};

export type DestinationCandidatePlacesForPlanCandidateInput = {
  planCandidateSetId: Scalars['ID']['input'];
};

export type DestinationCandidatePlacesForPlanCandidateOutput = {
  __typename?: 'DestinationCandidatePlacesForPlanCandidateOutput';
  placesForPlanCandidates: Array<Maybe<PlacesForPlanCandidate>>;
};

export type EditPlanTitleOfPlanCandidateInput = {
  planCandidateId: Scalars['String']['input'];
  planId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type EditPlanTitleOfPlanCandidateOutput = {
  __typename?: 'EditPlanTitleOfPlanCandidateOutput';
  plan: Plan;
  planCandidateId: Scalars['String']['output'];
};

export type FirebaseUserInput = {
  firebaseAuthToken: Scalars['String']['input'];
  firebaseUserId: Scalars['String']['input'];
};

export type GeoLocation = {
  __typename?: 'GeoLocation';
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type GooglePlaceReview = {
  __typename?: 'GooglePlaceReview';
  authorName: Scalars['String']['output'];
  authorPhotoUrl?: Maybe<Scalars['String']['output']>;
  authorUrl?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  rating: Scalars['Int']['output'];
  text?: Maybe<Scalars['String']['output']>;
  time: Scalars['Int']['output'];
};

export type Image = {
  __typename?: 'Image';
  author?: Maybe<User>;
  default: Scalars['String']['output'];
  google: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  large?: Maybe<Scalars['String']['output']>;
  small?: Maybe<Scalars['String']['output']>;
};

export enum ImageSize {
  Large = 'LARGE',
  Small = 'SMALL'
}

export type LikePlacesInput = {
  firebaseAuthToken: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type LikeToPlaceInPlanCandidateInput = {
  firebaseAuthToken?: InputMaybe<Scalars['String']['input']>;
  like: Scalars['Boolean']['input'];
  placeId: Scalars['String']['input'];
  planCandidateId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type LikeToPlaceInPlanCandidateOutput = {
  __typename?: 'LikeToPlaceInPlanCandidateOutput';
  planCandidate: PlanCandidate;
};

export type LikeToPlaceInPlanInput = {
  firebaseAuthToken: Scalars['String']['input'];
  like: Scalars['Boolean']['input'];
  placeId: Scalars['String']['input'];
  planId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type LikeToPlaceInPlanOutput = {
  __typename?: 'LikeToPlaceInPlanOutput';
  likedPlaceIds: Array<Scalars['String']['output']>;
  plan: Plan;
};

export type LocationCategory = {
  __typename?: 'LocationCategory';
  defaultPhotoUrl: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  photo?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPlaceToPlanCandidateAfterPlace: AddPlaceToPlanCandidateAfterPlaceOutput;
  autoReorderPlacesInPlanCandidate: AutoReorderPlacesInPlanCandidateOutput;
  bindPlanCandidateSetToUser: BindPlanCandidateSetToUserOutput;
  changePlacesOrderInPlanCandidate: ChangePlacesOrderInPlanCandidateOutput;
  createPlanByCategory: CreatePlanByCategoryOutput;
  createPlanByLocation: CreatePlanByLocationOutput;
  createPlanByPlace: CreatePlanByPlaceOutput;
  createPlanCandidateSetFromSavedPlan: CreatePlanCandidateSetFromSavedPlanOutput;
  deletePlaceFromPlanCandidate: DeletePlaceFromPlanCandidateOutput;
  editPlanTitleOfPlanCandidate: EditPlanTitleOfPlanCandidateOutput;
  likeToPlaceInPlan: LikeToPlaceInPlanOutput;
  likeToPlaceInPlanCandidate: LikeToPlaceInPlanCandidateOutput;
  ping: Scalars['String']['output'];
  replacePlaceOfPlanCandidate: ReplacePlaceOfPlanCandidateOutput;
  savePlanFromCandidate: SavePlanFromCandidateOutput;
  updatePlanCollageImage: UpdatePlanCollageImageOutput;
  updateUserProfile: UpdateUserProfileOutput;
  uploadPlacePhotoInPlan: UploadPlacePhotoInPlanOutput;
};


export type MutationAddPlaceToPlanCandidateAfterPlaceArgs = {
  input?: InputMaybe<AddPlaceToPlanCandidateAfterPlaceInput>;
};


export type MutationAutoReorderPlacesInPlanCandidateArgs = {
  input: AutoReorderPlacesInPlanCandidateInput;
};


export type MutationBindPlanCandidateSetToUserArgs = {
  input: BindPlanCandidateSetToUserInput;
};


export type MutationChangePlacesOrderInPlanCandidateArgs = {
  input: ChangePlacesOrderInPlanCandidateInput;
};


export type MutationCreatePlanByCategoryArgs = {
  input: CreatePlanByCategoryInput;
};


export type MutationCreatePlanByLocationArgs = {
  input: CreatePlanByLocationInput;
};


export type MutationCreatePlanByPlaceArgs = {
  input: CreatePlanByPlaceInput;
};


export type MutationCreatePlanCandidateSetFromSavedPlanArgs = {
  input: CreatePlanCandidateSetFromSavedPlanInput;
};


export type MutationDeletePlaceFromPlanCandidateArgs = {
  input: DeletePlaceFromPlanCandidateInput;
};


export type MutationEditPlanTitleOfPlanCandidateArgs = {
  input: EditPlanTitleOfPlanCandidateInput;
};


export type MutationLikeToPlaceInPlanArgs = {
  input: LikeToPlaceInPlanInput;
};


export type MutationLikeToPlaceInPlanCandidateArgs = {
  input: LikeToPlaceInPlanCandidateInput;
};


export type MutationPingArgs = {
  message: Scalars['String']['input'];
};


export type MutationReplacePlaceOfPlanCandidateArgs = {
  input: ReplacePlaceOfPlanCandidateInput;
};


export type MutationSavePlanFromCandidateArgs = {
  input: SavePlanFromCandidateInput;
};


export type MutationUpdatePlanCollageImageArgs = {
  input: UpdatePlanCollageImageInput;
};


export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
};


export type MutationUploadPlacePhotoInPlanArgs = {
  firebaseAuthToken: Scalars['String']['input'];
  inputs: Array<UploadPlacePhotoInPlanInput>;
  planId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type NearbyLocationCategory = {
  __typename?: 'NearbyLocationCategory';
  defaultPhotoUrl: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  places: Array<Place>;
};

export type NearbyPlaceCategoriesInput = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type NearbyPlaceCategoryOutput = {
  __typename?: 'NearbyPlaceCategoryOutput';
  categories: Array<NearbyLocationCategory>;
  planCandidateId: Scalars['ID']['output'];
};

export type Place = {
  __typename?: 'Place';
  address?: Maybe<Scalars['String']['output']>;
  categories: Array<PlaceCategory>;
  estimatedStayDuration: Scalars['Int']['output'];
  googlePlaceId: Scalars['String']['output'];
  googleReviews: Array<GooglePlaceReview>;
  id: Scalars['String']['output'];
  images: Array<Image>;
  likeCount: Scalars['Int']['output'];
  location: GeoLocation;
  name: Scalars['String']['output'];
  priceRange?: Maybe<PriceRange>;
};

export type PlaceCategory = {
  __typename?: 'PlaceCategory';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type PlacesForPlanCandidate = {
  __typename?: 'PlacesForPlanCandidate';
  places: Array<Place>;
  planCandidateId: Scalars['ID']['output'];
};

export type PlacesNearPlanInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  planId: Scalars['ID']['input'];
};

export type PlacesNearPlanOutput = {
  __typename?: 'PlacesNearPlanOutput';
  places: Array<Place>;
};

export type PlacesRecommendationOutput = {
  __typename?: 'PlacesRecommendationOutput';
  places: Array<Place>;
};

export type PlacesToAddForPlanCandidateInput = {
  placeId?: InputMaybe<Scalars['ID']['input']>;
  planCandidateId: Scalars['ID']['input'];
  planId: Scalars['ID']['input'];
};

export type PlacesToAddForPlanCandidateOutput = {
  __typename?: 'PlacesToAddForPlanCandidateOutput';
  places: Array<Place>;
  placesGroupedByCategory: Array<CategoryGroupedPlaces>;
  transitions: Array<Transition>;
};

export type PlacesToReplaceForPlanCandidateInput = {
  placeId: Scalars['ID']['input'];
  planCandidateId: Scalars['ID']['input'];
  planId: Scalars['ID']['input'];
};

export type PlacesToReplaceForPlanCandidateOutput = {
  __typename?: 'PlacesToReplaceForPlanCandidateOutput';
  places: Array<Place>;
};

export type Plan = {
  __typename?: 'Plan';
  author?: Maybe<User>;
  collage: PlanCollage;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nearbyPlans: Array<Plan>;
  places: Array<Place>;
  timeInMinutes: Scalars['Int']['output'];
  transitions: Array<Transition>;
};

export type PlanCandidate = {
  __typename?: 'PlanCandidate';
  createdBasedOnCurrentLocation: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  likedPlaceIds: Array<Scalars['String']['output']>;
  plans: Array<Plan>;
};

export type PlanCandidateInput = {
  firebaseAuthToken?: InputMaybe<Scalars['String']['input']>;
  planCandidateId: Scalars['ID']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type PlanCandidateOutput = {
  __typename?: 'PlanCandidateOutput';
  planCandidate?: Maybe<PlanCandidate>;
};

export type PlanCollage = {
  __typename?: 'PlanCollage';
  images: Array<PlanCollageImage>;
};

export type PlanCollageImage = {
  __typename?: 'PlanCollageImage';
  image?: Maybe<Image>;
  placeId: Scalars['String']['output'];
};

export type PlanInput = {
  planID: Scalars['ID']['input'];
};

export type PlanOutput = {
  __typename?: 'PlanOutput';
  plan?: Maybe<Plan>;
};

export type PlansByLocationInput = {
  latitude: Scalars['Float']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  longitude: Scalars['Float']['input'];
};

export type PlansByLocationOutput = {
  __typename?: 'PlansByLocationOutput';
  pageKey?: Maybe<Scalars['String']['output']>;
  plans: Array<Plan>;
};

export type PlansByUserInput = {
  userId: Scalars['String']['input'];
};

export type PlansByUserOutput = {
  __typename?: 'PlansByUserOutput';
  author: User;
  plans: Array<Plan>;
};

export type PlansInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  pageToken?: InputMaybe<Scalars['String']['input']>;
};

export type PlansOutput = {
  __typename?: 'PlansOutput';
  nextPageToken?: Maybe<Scalars['String']['output']>;
  plans: Array<Plan>;
};

export type PriceRange = {
  __typename?: 'PriceRange';
  googlePriceLevel: Scalars['Int']['output'];
  priceRangeMax: Scalars['Int']['output'];
  priceRangeMin: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  availablePlacesForPlan: AvailablePlacesForPlan;
  destinationCandidatePlacesForPlanCandidate: DestinationCandidatePlacesForPlanCandidateOutput;
  firebaseUser: User;
  likePlaces: Array<Place>;
  nearbyPlaceCategories: NearbyPlaceCategoryOutput;
  placeCategories: Array<CreatePlanPlaceCategorySet>;
  placesNearPlan: PlacesNearPlanOutput;
  placesRecommendation: PlacesRecommendationOutput;
  placesToAddForPlanCandidate: PlacesToAddForPlanCandidateOutput;
  placesToReplaceForPlanCandidate: PlacesToReplaceForPlanCandidateOutput;
  plan: PlanOutput;
  planCandidate: PlanCandidateOutput;
  plans: PlansOutput;
  plansByLocation: PlansByLocationOutput;
  plansByUser: PlansByUserOutput;
  version: Scalars['String']['output'];
};


export type QueryAvailablePlacesForPlanArgs = {
  input: AvailablePlacesForPlanInput;
};


export type QueryDestinationCandidatePlacesForPlanCandidateArgs = {
  input: DestinationCandidatePlacesForPlanCandidateInput;
};


export type QueryFirebaseUserArgs = {
  input?: InputMaybe<FirebaseUserInput>;
};


export type QueryLikePlacesArgs = {
  input?: InputMaybe<LikePlacesInput>;
};


export type QueryNearbyPlaceCategoriesArgs = {
  input: NearbyPlaceCategoriesInput;
};


export type QueryPlacesNearPlanArgs = {
  input: PlacesNearPlanInput;
};


export type QueryPlacesToAddForPlanCandidateArgs = {
  input: PlacesToAddForPlanCandidateInput;
};


export type QueryPlacesToReplaceForPlanCandidateArgs = {
  input: PlacesToReplaceForPlanCandidateInput;
};


export type QueryPlanArgs = {
  input: PlanInput;
};


export type QueryPlanCandidateArgs = {
  input: PlanCandidateInput;
};


export type QueryPlansArgs = {
  input?: InputMaybe<PlansInput>;
};


export type QueryPlansByLocationArgs = {
  input: PlansByLocationInput;
};


export type QueryPlansByUserArgs = {
  input: PlansByUserInput;
};

export type ReplacePlaceOfPlanCandidateInput = {
  placeIdToRemove: Scalars['String']['input'];
  placeIdToReplace: Scalars['String']['input'];
  planCandidateId: Scalars['String']['input'];
  planId: Scalars['String']['input'];
};

export type ReplacePlaceOfPlanCandidateOutput = {
  __typename?: 'ReplacePlaceOfPlanCandidateOutput';
  plan: Plan;
  planCandidateId: Scalars['String']['output'];
};

export type SavePlanFromCandidateInput = {
  authToken?: InputMaybe<Scalars['String']['input']>;
  planId: Scalars['String']['input'];
  session: Scalars['String']['input'];
};

export type SavePlanFromCandidateOutput = {
  __typename?: 'SavePlanFromCandidateOutput';
  plan: Plan;
};

export type Transition = {
  __typename?: 'Transition';
  duration: Scalars['Int']['output'];
  from?: Maybe<Place>;
  to: Place;
};

export type UpdatePlanCollageImageInput = {
  firebaseAuthToken: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  placeId: Scalars['String']['input'];
  planId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type UpdatePlanCollageImageOutput = {
  __typename?: 'UpdatePlanCollageImageOutput';
  plan: Plan;
};

export type UpdateUserProfileInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  profileImageUrl?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};

export type UpdateUserProfileOutput = {
  __typename?: 'UpdateUserProfileOutput';
  user: User;
};

export type UploadPlacePhotoInPlanInput = {
  height: Scalars['Int']['input'];
  photoUrl: Scalars['String']['input'];
  placeId: Scalars['String']['input'];
  width: Scalars['Int']['input'];
};

export type UploadPlacePhotoInPlanOutput = {
  __typename?: 'UploadPlacePhotoInPlanOutput';
  plan: Plan;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  likedPlaces: Array<Place>;
  name: Scalars['String']['output'];
  photoUrl?: Maybe<Scalars['String']['output']>;
  plans: Array<Plan>;
};

export type PlaceFullFragmentFragment = { __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null };

export type PlacePreviewFragmentFragment = { __typename?: 'Place', id: string, name: string, address?: string | null, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }> };

export type PlanFullFragmentFragment = { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null };

export type PlanPreviewFragmentFragment = { __typename?: 'Plan', id: string, name: string, places: Array<{ __typename?: 'Place', id: string, name: string, address?: string | null, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }> }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null };

export type PlanCandidateFullFragmentFragment = { __typename?: 'PlanCandidate', id: string, likedPlaceIds: Array<string>, createdBasedOnCurrentLocation: boolean, plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null }> };

export type UserFullFragmentFragment = { __typename?: 'User', id: string, name: string, photoUrl?: string | null };

export type PlaceRecommendationsQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaceRecommendationsQuery = { __typename?: 'Query', placesRecommendation: { __typename?: 'PlacesRecommendationOutput', places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }> } };

export type PlacesNearbyPlanQueryVariables = Exact<{
  input: PlacesNearPlanInput;
}>;


export type PlacesNearbyPlanQuery = { __typename?: 'Query', placesNearPlan: { __typename?: 'PlacesNearPlanOutput', places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }> } };

export type UpdateLikePlaceInPlanMutationVariables = Exact<{
  input: LikeToPlaceInPlanInput;
}>;


export type UpdateLikePlaceInPlanMutation = { __typename?: 'Mutation', likeToPlaceInPlan: { __typename?: 'LikeToPlaceInPlanOutput', likedPlaceIds: Array<string>, plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null } } };

export type UploadPlacePhotoInPlanMutationVariables = Exact<{
  inputs: Array<UploadPlacePhotoInPlanInput> | UploadPlacePhotoInPlanInput;
  planId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  firebaseAuthToken: Scalars['String']['input'];
}>;


export type UploadPlacePhotoInPlanMutation = { __typename?: 'Mutation', uploadPlacePhotoInPlan: { __typename?: 'UploadPlacePhotoInPlanOutput', plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null } } };

export type FetchPlansQueryVariables = Exact<{
  input: PlansInput;
}>;


export type FetchPlansQuery = { __typename?: 'Query', plans: { __typename?: 'PlansOutput', nextPageToken?: string | null, plans: Array<{ __typename?: 'Plan', id: string, name: string, places: Array<{ __typename?: 'Place', id: string, name: string, address?: string | null, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }> }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null }> } };

export type FetchPlanByIdQueryVariables = Exact<{
  input: PlanInput;
}>;


export type FetchPlanByIdQuery = { __typename?: 'Query', plan: { __typename?: 'PlanOutput', plan?: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, nearbyPlans: Array<{ __typename?: 'Plan', id: string, name: string, places: Array<{ __typename?: 'Place', id: string, name: string, address?: string | null, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }> }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null }>, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null } | null } };

export type FetchPlanByIdWithUserQueryVariables = Exact<{
  planInput: PlanInput;
  likePlacesInput: LikePlacesInput;
}>;


export type FetchPlanByIdWithUserQuery = { __typename?: 'Query', plan: { __typename?: 'PlanOutput', plan?: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, nearbyPlans: Array<{ __typename?: 'Plan', id: string, name: string, places: Array<{ __typename?: 'Place', id: string, name: string, address?: string | null, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }> }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null }>, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null } | null }, likePlaces: Array<{ __typename?: 'Place', id: string }> };

export type PlansByLocationQueryVariables = Exact<{
  input: PlansByLocationInput;
}>;


export type PlansByLocationQuery = { __typename?: 'Query', plansByLocation: { __typename?: 'PlansByLocationOutput', plans: Array<{ __typename?: 'Plan', id: string, name: string, places: Array<{ __typename?: 'Place', id: string, name: string, address?: string | null, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }> }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null }> } };

export type AddPlaceToPlanCandidateMutationVariables = Exact<{
  input: AddPlaceToPlanCandidateAfterPlaceInput;
}>;


export type AddPlaceToPlanCandidateMutation = { __typename?: 'Mutation', addPlaceToPlanCandidateAfterPlace: { __typename?: 'AddPlaceToPlanCandidateAfterPlaceOutput', planCandidateId: string, plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> } } };

export type AutoReorderPlacesInPlanCandidateMutationVariables = Exact<{
  input: AutoReorderPlacesInPlanCandidateInput;
}>;


export type AutoReorderPlacesInPlanCandidateMutation = { __typename?: 'Mutation', autoReorderPlacesInPlanCandidate: { __typename?: 'AutoReorderPlacesInPlanCandidateOutput', planCandidateId: string, plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null } } };

export type CreatePlanByCategoryMutationVariables = Exact<{
  input: CreatePlanByCategoryInput;
}>;


export type CreatePlanByCategoryMutation = { __typename?: 'Mutation', createPlanByCategory: { __typename?: 'CreatePlanByCategoryOutput', planCandidateSetId: string, plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null }> } };

export type CreatePlanByLocationMutationVariables = Exact<{
  input: CreatePlanByLocationInput;
}>;


export type CreatePlanByLocationMutation = { __typename?: 'Mutation', createPlanByLocation: { __typename?: 'CreatePlanByLocationOutput', session: string, plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null }> } };

export type CreatePlanByPlaceMutationVariables = Exact<{
  sessionId: Scalars['String']['input'];
  placeId: Scalars['String']['input'];
}>;


export type CreatePlanByPlaceMutation = { __typename?: 'Mutation', createPlanByPlace: { __typename?: 'CreatePlanByPlaceOutput', session: string, plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null } } };

export type CreatePlanCandidateSetFromSavedPlanMutationVariables = Exact<{
  input: CreatePlanCandidateSetFromSavedPlanInput;
}>;


export type CreatePlanCandidateSetFromSavedPlanMutation = { __typename?: 'Mutation', createPlanCandidateSetFromSavedPlan: { __typename?: 'CreatePlanCandidateSetFromSavedPlanOutput', planCandidate: { __typename?: 'PlanCandidate', id: string, likedPlaceIds: Array<string>, createdBasedOnCurrentLocation: boolean, plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null }> } } };

export type DeletePlaceFromPlanCandidateMutationVariables = Exact<{
  input: DeletePlaceFromPlanCandidateInput;
}>;


export type DeletePlaceFromPlanCandidateMutation = { __typename?: 'Mutation', deletePlaceFromPlanCandidate: { __typename?: 'DeletePlaceFromPlanCandidateOutput', planCandidateId: string, plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null } } };

export type EditPlanTitleOfPlanCandidateMutationVariables = Exact<{
  input: EditPlanTitleOfPlanCandidateInput;
}>;


export type EditPlanTitleOfPlanCandidateMutation = { __typename?: 'Mutation', editPlanTitleOfPlanCandidate: { __typename?: 'EditPlanTitleOfPlanCandidateOutput', planCandidateId: string, plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null } } };

export type ReplacePlaceOfPlanCandidateMutationVariables = Exact<{
  input: ReplacePlaceOfPlanCandidateInput;
}>;


export type ReplacePlaceOfPlanCandidateMutation = { __typename?: 'Mutation', replacePlaceOfPlanCandidate: { __typename?: 'ReplacePlaceOfPlanCandidateOutput', planCandidateId: string, plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null } } };

export type SavePlanFromCandidateMutationVariables = Exact<{
  session: Scalars['String']['input'];
  planId: Scalars['String']['input'];
  authToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type SavePlanFromCandidateMutation = { __typename?: 'Mutation', savePlanFromCandidate: { __typename?: 'SavePlanFromCandidateOutput', plan: { __typename?: 'Plan', id: string } } };

export type UpdateLikeAtPlaceInPlanCandidateMutationVariables = Exact<{
  input: LikeToPlaceInPlanCandidateInput;
}>;


export type UpdateLikeAtPlaceInPlanCandidateMutation = { __typename?: 'Mutation', likeToPlaceInPlanCandidate: { __typename?: 'LikeToPlaceInPlanCandidateOutput', planCandidate: { __typename?: 'PlanCandidate', id: string, likedPlaceIds: Array<string>, createdBasedOnCurrentLocation: boolean, plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null }> } } };

export type ChangePlacesOrderInPlanCandidateMutationVariables = Exact<{
  input: ChangePlacesOrderInPlanCandidateInput;
}>;


export type ChangePlacesOrderInPlanCandidateMutation = { __typename?: 'Mutation', changePlacesOrderInPlanCandidate: { __typename?: 'ChangePlacesOrderInPlanCandidateOutput', plan: { __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null } } };

export type FetchAvailablePlacesForPlanCandidateQueryVariables = Exact<{
  session: Scalars['String']['input'];
}>;


export type FetchAvailablePlacesForPlanCandidateQuery = { __typename?: 'Query', availablePlacesForPlan: { __typename?: 'AvailablePlacesForPlan', places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }> } };

export type NearbyPlaceCategoriesQueryVariables = Exact<{
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
}>;


export type NearbyPlaceCategoriesQuery = { __typename?: 'Query', nearbyPlaceCategories: { __typename?: 'NearbyPlaceCategoryOutput', planCandidateId: string, categories: Array<{ __typename?: 'NearbyLocationCategory', id: string, displayName: string, defaultPhotoUrl: string, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }> }> } };

export type PlaceCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaceCategoriesQuery = { __typename?: 'Query', placeCategories: Array<{ __typename?: 'CreatePlanPlaceCategorySet', displayNameJa: string, displayNameEn: string, categories: Array<{ __typename?: 'CreatePlanPlaceCategory', id: string, displayNameJa: string, displayNameEn: string, imageUrl: string }> }> };

export type DestinationCandidatePlacesForPlanCandidateQueryVariables = Exact<{
  input: DestinationCandidatePlacesForPlanCandidateInput;
}>;


export type DestinationCandidatePlacesForPlanCandidateQuery = { __typename?: 'Query', destinationCandidatePlacesForPlanCandidate: { __typename?: 'DestinationCandidatePlacesForPlanCandidateOutput', placesForPlanCandidates: Array<{ __typename?: 'PlacesForPlanCandidate', planCandidateId: string, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }> } | null> } };

export type PlacesToAddForPlanOfPlanCandidateQueryVariables = Exact<{
  input: PlacesToAddForPlanCandidateInput;
}>;


export type PlacesToAddForPlanOfPlanCandidateQuery = { __typename?: 'Query', placesToAddForPlanCandidate: { __typename?: 'PlacesToAddForPlanCandidateOutput', places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, placesGroupedByCategory: Array<{ __typename?: 'CategoryGroupedPlaces', category: { __typename?: 'PlaceCategory', id: string, name: string }, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }> }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }> } };

export type PlacesToReplaceForPlanOfPlanCandidateQueryVariables = Exact<{
  input: PlacesToReplaceForPlanCandidateInput;
}>;


export type PlacesToReplaceForPlanOfPlanCandidateQuery = { __typename?: 'Query', placesToReplaceForPlanCandidate: { __typename?: 'PlacesToReplaceForPlanCandidateOutput', places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }> } };

export type PlanCandidateQueryVariables = Exact<{
  input: PlanCandidateInput;
}>;


export type PlanCandidateQuery = { __typename?: 'Query', planCandidate: { __typename?: 'PlanCandidateOutput', planCandidate?: { __typename?: 'PlanCandidate', createdBasedOnCurrentLocation: boolean, likedPlaceIds: Array<string>, plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null }> } | null } };

export type BindPlanCandidateSetToUserMutationVariables = Exact<{
  input: BindPlanCandidateSetToUserInput;
}>;


export type BindPlanCandidateSetToUserMutation = { __typename?: 'Mutation', bindPlanCandidateSetToUser: { __typename?: 'BindPlanCandidateSetToUserOutput', user: { __typename?: 'User', id: string } } };

export type UpdateUserProfileMutationVariables = Exact<{
  input: UpdateUserProfileInput;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile: { __typename?: 'UpdateUserProfileOutput', user: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } } };

export type UserQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  userIdString: Scalars['String']['input'];
  firebaseToken: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', plansByUser: { __typename?: 'PlansByUserOutput', author: { __typename?: 'User', id: string, name: string, photoUrl?: string | null }, plans: Array<{ __typename?: 'Plan', id: string, name: string, places: Array<{ __typename?: 'Place', id: string, name: string, address?: string | null, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }> }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null }> }, likePlaces: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }> };

export type FirebaseUserQueryVariables = Exact<{
  firebaseUserId: Scalars['String']['input'];
  firebaseToken: Scalars['String']['input'];
}>;


export type FirebaseUserQuery = { __typename?: 'Query', firebaseUser: { __typename?: 'User', id: string, name: string, photoUrl?: string | null, plans: Array<{ __typename?: 'Plan', id: string, name: string, timeInMinutes: number, places: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }>, transitions: Array<{ __typename?: 'Transition', duration: number, from?: { __typename?: 'Place', id: string } | null, to: { __typename?: 'Place', id: string } }>, author?: { __typename?: 'User', id: string, name: string, photoUrl?: string | null } | null }>, likedPlaces: Array<{ __typename?: 'Place', id: string, googlePlaceId: string, name: string, address?: string | null, estimatedStayDuration: number, likeCount: number, images: Array<{ __typename?: 'Image', default: string, small?: string | null, large?: string | null, google: boolean }>, location: { __typename?: 'GeoLocation', longitude: number, latitude: number }, categories: Array<{ __typename?: 'PlaceCategory', id: string, name: string }>, priceRange?: { __typename?: 'PriceRange', priceRangeMin: number, priceRangeMax: number, googlePriceLevel: number } | null }> } };

export type VersionQueryVariables = Exact<{ [key: string]: never; }>;


export type VersionQuery = { __typename?: 'Query', version: string };

export const PlacePreviewFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlacePreviewFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<PlacePreviewFragmentFragment, unknown>;
export const UserFullFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}}]} as unknown as DocumentNode<UserFullFragmentFragment, unknown>;
export const PlanPreviewFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanPreviewFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlacePreviewFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlacePreviewFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}}]} as unknown as DocumentNode<PlanPreviewFragmentFragment, unknown>;
export const PlaceFullFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<PlaceFullFragmentFragment, unknown>;
export const PlanFullFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}}]} as unknown as DocumentNode<PlanFullFragmentFragment, unknown>;
export const PlanCandidateFullFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanCandidateFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanCandidate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedPlaceIds"}},{"kind":"Field","name":{"kind":"Name","value":"createdBasedOnCurrentLocation"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<PlanCandidateFullFragmentFragment, unknown>;
export const PlaceRecommendationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlaceRecommendations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placesRecommendation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<PlaceRecommendationsQuery, PlaceRecommendationsQueryVariables>;
export const PlacesNearbyPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlacesNearbyPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlacesNearPlanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placesNearPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<PlacesNearbyPlanQuery, PlacesNearbyPlanQueryVariables>;
export const UpdateLikePlaceInPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLikePlaceInPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LikeToPlaceInPlanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeToPlaceInPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedPlaceIds"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<UpdateLikePlaceInPlanMutation, UpdateLikePlaceInPlanMutationVariables>;
export const UploadPlacePhotoInPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadPlacePhotoInPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadPlacePhotoInPlanInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firebaseAuthToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadPlacePhotoInPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inputs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}}},{"kind":"Argument","name":{"kind":"Name","value":"planId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"firebaseAuthToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firebaseAuthToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<UploadPlacePhotoInPlanMutation, UploadPlacePhotoInPlanMutationVariables>;
export const FetchPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlansInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nextPageToken"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanPreviewFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlacePreviewFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanPreviewFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlacePreviewFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<FetchPlansQuery, FetchPlansQueryVariables>;
export const FetchPlanByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchPlanById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}},{"kind":"Field","name":{"kind":"Name","value":"nearbyPlans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanPreviewFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlacePreviewFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanPreviewFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlacePreviewFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<FetchPlanByIdQuery, FetchPlanByIdQueryVariables>;
export const FetchPlanByIdWithUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchPlanByIdWithUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlanInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"likePlacesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LikePlacesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}},{"kind":"Field","name":{"kind":"Name","value":"nearbyPlans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanPreviewFragment"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"likePlaces"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"likePlacesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlacePreviewFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanPreviewFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlacePreviewFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<FetchPlanByIdWithUserQuery, FetchPlanByIdWithUserQueryVariables>;
export const PlansByLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlansByLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlansByLocationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plansByLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanPreviewFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlacePreviewFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanPreviewFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlacePreviewFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<PlansByLocationQuery, PlansByLocationQueryVariables>;
export const AddPlaceToPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPlaceToPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddPlaceToPlanCandidateAfterPlaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPlaceToPlanCandidateAfterPlace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidateId"}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<AddPlaceToPlanCandidateMutation, AddPlaceToPlanCandidateMutationVariables>;
export const AutoReorderPlacesInPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AutoReorderPlacesInPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AutoReorderPlacesInPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autoReorderPlacesInPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidateId"}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<AutoReorderPlacesInPlanCandidateMutation, AutoReorderPlacesInPlanCandidateMutationVariables>;
export const CreatePlanByCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePlanByCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePlanByCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlanByCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidateSetId"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<CreatePlanByCategoryMutation, CreatePlanByCategoryMutationVariables>;
export const CreatePlanByLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePlanByLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePlanByLocationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlanByLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<CreatePlanByLocationMutation, CreatePlanByLocationMutationVariables>;
export const CreatePlanByPlaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePlanByPlace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"placeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlanByPlace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"session"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"placeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"placeId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<CreatePlanByPlaceMutation, CreatePlanByPlaceMutationVariables>;
export const CreatePlanCandidateSetFromSavedPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePlanCandidateSetFromSavedPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePlanCandidateSetFromSavedPlanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlanCandidateSetFromSavedPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanCandidateFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanCandidateFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanCandidate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedPlaceIds"}},{"kind":"Field","name":{"kind":"Name","value":"createdBasedOnCurrentLocation"}}]}}]} as unknown as DocumentNode<CreatePlanCandidateSetFromSavedPlanMutation, CreatePlanCandidateSetFromSavedPlanMutationVariables>;
export const DeletePlaceFromPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePlaceFromPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeletePlaceFromPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePlaceFromPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidateId"}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<DeletePlaceFromPlanCandidateMutation, DeletePlaceFromPlanCandidateMutationVariables>;
export const EditPlanTitleOfPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditPlanTitleOfPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditPlanTitleOfPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editPlanTitleOfPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidateId"}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<EditPlanTitleOfPlanCandidateMutation, EditPlanTitleOfPlanCandidateMutationVariables>;
export const ReplacePlaceOfPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReplacePlaceOfPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReplacePlaceOfPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"replacePlaceOfPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidateId"}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<ReplacePlaceOfPlanCandidateMutation, ReplacePlaceOfPlanCandidateMutationVariables>;
export const SavePlanFromCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SavePlanFromCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"session"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"savePlanFromCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"session"},"value":{"kind":"Variable","name":{"kind":"Name","value":"session"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"planId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"authToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authToken"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<SavePlanFromCandidateMutation, SavePlanFromCandidateMutationVariables>;
export const UpdateLikeAtPlaceInPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLikeAtPlaceInPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LikeToPlaceInPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeToPlaceInPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanCandidateFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanCandidateFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanCandidate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedPlaceIds"}},{"kind":"Field","name":{"kind":"Name","value":"createdBasedOnCurrentLocation"}}]}}]} as unknown as DocumentNode<UpdateLikeAtPlaceInPlanCandidateMutation, UpdateLikeAtPlaceInPlanCandidateMutationVariables>;
export const ChangePlacesOrderInPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePlacesOrderInPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePlacesOrderInPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePlacesOrderInPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<ChangePlacesOrderInPlanCandidateMutation, ChangePlacesOrderInPlanCandidateMutationVariables>;
export const FetchAvailablePlacesForPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchAvailablePlacesForPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"session"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"availablePlacesForPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"session"},"value":{"kind":"Variable","name":{"kind":"Name","value":"session"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<FetchAvailablePlacesForPlanCandidateQuery, FetchAvailablePlacesForPlanCandidateQueryVariables>;
export const NearbyPlaceCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NearbyPlaceCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nearbyPlaceCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidateId"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"defaultPhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<NearbyPlaceCategoriesQuery, NearbyPlaceCategoriesQueryVariables>;
export const PlaceCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlaceCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placeCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayNameJa"}},{"kind":"Field","name":{"kind":"Name","value":"displayNameEn"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayNameJa"}},{"kind":"Field","name":{"kind":"Name","value":"displayNameEn"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<PlaceCategoriesQuery, PlaceCategoriesQueryVariables>;
export const DestinationCandidatePlacesForPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DestinationCandidatePlacesForPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DestinationCandidatePlacesForPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"destinationCandidatePlacesForPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placesForPlanCandidates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidateId"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<DestinationCandidatePlacesForPlanCandidateQuery, DestinationCandidatePlacesForPlanCandidateQueryVariables>;
export const PlacesToAddForPlanOfPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlacesToAddForPlanOfPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlacesToAddForPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placesToAddForPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"placesGroupedByCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<PlacesToAddForPlanOfPlanCandidateQuery, PlacesToAddForPlanOfPlanCandidateQueryVariables>;
export const PlacesToReplaceForPlanOfPlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlacesToReplaceForPlanOfPlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlacesToReplaceForPlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placesToReplaceForPlanCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<PlacesToReplaceForPlanOfPlanCandidateQuery, PlacesToReplaceForPlanOfPlanCandidateQueryVariables>;
export const PlanCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlanCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlanCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCandidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBasedOnCurrentLocation"}},{"kind":"Field","name":{"kind":"Name","value":"likedPlaceIds"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<PlanCandidateQuery, PlanCandidateQueryVariables>;
export const BindPlanCandidateSetToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BindPlanCandidateSetToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BindPlanCandidateSetToUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bindPlanCandidateSetToUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<BindPlanCandidateSetToUserMutation, BindPlanCandidateSetToUserMutationVariables>;
export const UpdateUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}}]} as unknown as DocumentNode<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIdString"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firebaseToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plansByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIdString"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanPreviewFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"likePlaces"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"firebaseAuthToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firebaseToken"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlacePreviewFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanPreviewFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlacePreviewFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const FirebaseUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FirebaseUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firebaseUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firebaseToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firebaseUserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firebaseUserId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"firebaseAuthToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firebaseToken"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"googlePlaceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"google"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimatedStayDuration"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRangeMin"}},{"kind":"Field","name":{"kind":"Name","value":"priceRangeMax"}},{"kind":"Field","name":{"kind":"Name","value":"googlePriceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFullFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFullFragment"}}]}}]}}]} as unknown as DocumentNode<FirebaseUserQuery, FirebaseUserQueryVariables>;
export const VersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Version"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<VersionQuery, VersionQueryVariables>;