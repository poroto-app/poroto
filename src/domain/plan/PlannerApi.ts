import { CreatePlanPlaceCategorySet } from "src/domain/models/CreatePlanPlaceCategory";
import { GeoLocation } from "src/domain/models/GeoLocation";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { PlaceEntity } from "src/domain/models/PlaceEntity";
import { PlanEntity } from "src/domain/models/PlanEntity";
import { Transition } from "src/domain/models/Transition";
import { Locale } from "src/locales/type";

export interface PlannerApi {
    // ==============================================================
    // Plan
    // ==============================================================
    fetchPlan(request: FetchPlanRequest): Promise<FetchPlanResponse>;

    fetchPlans(request: FetchPlansRequest): Promise<FetchPlansResponse>;

    fetchPlansByLocation(
        request: FetchPlansByLocationRequest
    ): Promise<FetchPlansByLocationResponse>;

    updateLikeOfPlaceInPlan(
        request: UpdateLikeOfPlaceInPlan
    ): Promise<UpdateLikeOfPlaceInPlanResponse>;

    uploadPlacePhotosInPlan(
        request: UploadPlacePhotosInPlanRequest
    ): Promise<UploadPlacePhotosInPlanResponse>;

    // ==============================================================
    // Plan Candidate
    // ==============================================================
    createPlansFromLocation(
        request: CreatePlanFromLocationRequest
    ): Promise<CreatePlanFromLocationResponse>;

    createPlanFromPlace(
        request: CreatePlanFromPlaceRequest
    ): Promise<CreatePlanFromPlaceResponse>;

    createPlanByCategory(
        request: CreatePlanByCategoryRequest
    ): Promise<CreatePlanByCategoryResponse>;

    createPlanCandidateSetFromSavedPlan(
        request: CreatePlanCandidateSetFromSavedPlanRequest
    ): Promise<CreatePlanCandidateSetFromSavedPlanResponse>;

    fetchCachedCreatedPlans(
        request: FetchCachedCreatedPlansRequest
    ): Promise<FetchCachedCreatedPlansResponse>;

    fetchAvailablePlacesForPlan(
        request: FetchAvailablePlacesForPlanRequest
    ): Promise<FetchAvailablePlacesForPlanResponse>;

    fetchPlacesToAddForPlanOfPlanCandidate(
        request: FetchPlacesToAddForPlanOfPlanCandidateRequest
    ): Promise<FetchPlacesToAddForPlanOfPlanCandidateResponse>;

    fetchPlacesToReplaceForPlanOfPlanCandidate(
        request: FetchPlacesToReplaceForPlanOfPlanCandidateRequest
    ): Promise<FetchPlacesToReplaceForPlanOfPlanCandidateResponse>;

    fetchPlacesForDestinationOfPlanCandidates(
        request: FetchPlacesForDestinationOfPlanCandidatesRequest
    ): Promise<FetchPlacesForDestinationOfPlanCandidatesResponse>;

    addPlaceToPlanOfPlanCandidate(
        request: AddPlaceToPlanOfPlanCandidateRequest
    ): Promise<AddPlaceToPlanOfPlanCandidateResponse>;

    deletePlaceFromPlanOfPlanCandidate(
        request: DeletePlaceFromPlanOfPlanCandidateRequest
    ): Promise<DeletePlaceFromPlanOfPlanCandidateResponse>;

    replacePlaceInPlanOfPlanCandidate(
        request: ReplacePlaceInPlanOfPlanCandidateRequest
    ): Promise<ReplacePlaceInPlanOfPlanCandidateResponse>;

    editPlanTitleOfPlanCandidate(
        request: EditPlanTitleOfPlanCandidateRequest
    ): Promise<EditPlanTitleOfPlanCandidateResponse>;

    fetchNearbyPlaceCategories(
        request: FetchNearbyPlaceCategoriesRequest
    ): Promise<FetchNearbyPlaceCategoriesResponse>;

    savePlanFromCandidate(
        request: SavePlanFromCandidateRequest
    ): Promise<SavePlanFromCandidateResponse>;

    updatePlanCandidatePlacesOrder(
        request: UpdatePlanCandidatePlacesOrderRequest
    ): Promise<UpdatePlanCandidatePlacesOrderResponse>;

    autoReorderPlacesInPlanCandidate(
        request: AutoReorderPlacesInPlanCandidateRequest
    ): Promise<AutoReorderPlacesInPlanCandidateResponse>;

    updateLikeAtPlaceInPlanCandidate(
        request: UpdateLikeAtPlaceInPlanCandidateRequest
    ): Promise<UpdateLikeAtPlaceInPlanCandidateResponse>;

    // ==============================================================
    // Place
    // ==============================================================
    fetchPlacesNearbyPlanLocation(
        request: FetchPlacesNearbyPlanLocationRequest
    ): Promise<FetchPlacesNearbyPlanLocationResponse>;

    // ==============================================================
    // Category
    // ==============================================================
    fetchCreatePlanPlaceCategories(
        request: FetchCreatePlanPlaceCategoriesRequest
    ): Promise<FetchCreatePlanPlaceCategoriesResponse>;
}

export type FetchPlanRequest = {
    planId: string;
    userId: string | null;
    firebaseIdToken: string | null;
};

export type FetchPlanResponse = {
    plan: PlanEntity | null;
    likedPlaceIds: string[];
    nearbyPlans: PlanEntity[];
};

export type FetchPlansRequest = {
    pageKey: string | null;
};

export type FetchPlansResponse = {
    plans: PlanEntity[];
    nextPageKey: string | null;
};

export type FetchPlansByLocationRequest = {
    location: GeoLocation;
    limit?: number;
};

export type FetchPlansByLocationResponse = {
    plans: PlanEntity[];
};

export type UpdateLikeOfPlaceInPlan = {
    userId: string;
    firebaseIdToken: string;
    planId: string;
    placeId: string;
    like: boolean;
};

export type UpdateLikeOfPlaceInPlanResponse = {
    plan: PlanEntity;
    likePlaceIds: string[];
};

export type FetchAvailablePlacesForPlanRequest = {
    session: string;
};

export type FetchAvailablePlacesForPlanResponse = {
    places: PlaceEntity[];
};

export type CreatePlanFromLocationRequest = {
    session?: string;
    location: {
        latitude: number;
        longitude: number;
    };
    googlePlaceId?: string;
    categoriesPreferred?: string[];
    categoriesDisliked?: string[];
    planDuration?: number;
    basedOnCurrentLocation: boolean;
};

export type CreatePlanFromLocationResponse = {
    session: string;
    plans: PlanEntity[];
};

export type CreatePlanFromPlaceRequest = {
    createPlanSessionId: string;
    placeId: string;
};

export type CreatePlanFromPlaceResponse = {
    createPlanSessionId: string;
    plan: PlanEntity;
};

export type CreatePlanByCategoryRequest = {
    categoryId: string;
    location: GeoLocation;
    radiusInKm: number;
};

export type CreatePlanByCategoryResponse = {
    planCandidateSetId: string;
    plans: PlanEntity[];
};

export type CreatePlanCandidateSetFromSavedPlanRequest = {
    userId: string | null;
    firebaseIdToken: string | null;
    planId: string;
};

export type CreatePlanCandidateSetFromSavedPlanResponse = {
    planCandidateSetId: string;
    plans: PlanEntity[];
    likedPlaceIds: string[];
};

export type FetchCachedCreatedPlansRequest = {
    planCandidateId: string;
    userId: string | null;
    firebaseIdToken: string | null;
};

export type FetchCachedCreatedPlansResponse = {
    createdBasedOnCurrentLocation: boolean;
    plans: PlanEntity[] | null;
    likedPlaceIds: string[];
};

export type FetchPlacesToAddForPlanOfPlanCandidateRequest = {
    planCandidateId: string;
    planId: string;
    placeId: string;
};

export type FetchPlacesToAddForPlanOfPlanCandidateResponse = {
    placesRecommend: PlaceEntity[];
    placesGroupedByCategories: {
        category: PlaceCategory;
        places: PlaceEntity[];
    }[];
    transitions: Transition[];
};

export type FetchPlacesToReplaceForPlanOfPlanCandidateRequest = {
    planCandidateId: string;
    planId: string;
    placeId: string;
};

export type FetchPlacesToReplaceForPlanOfPlanCandidateResponse = {
    places: PlaceEntity[];
};

export type FetchPlacesForDestinationOfPlanCandidatesRequest = {
    planCandidateSetId: string;
};

export type FetchPlacesForDestinationOfPlanCandidatesResponse = {
    placesForPlanCandidates: {
        planCandidateId: string;
        places: PlaceEntity[];
    }[];
};

export type AddPlaceToPlanOfPlanCandidateRequest = {
    planCandidateId: string;
    planId: string;
    previousPlaceId: string;
    placeId: string;
};

export type AddPlaceToPlanOfPlanCandidateResponse = {
    plan: PlanEntity;
};

export type DeletePlaceFromPlanOfPlanCandidateRequest = {
    planCandidateId: string;
    planId: string;
    placeId: string;
};

export type DeletePlaceFromPlanOfPlanCandidateResponse = {
    plan: PlanEntity;
};

export type ReplacePlaceInPlanOfPlanCandidateRequest = {
    planCandidateId: string;
    planId: string;
    placeIdToReplace: string;
    placeIdToAdd: string;
};

export type ReplacePlaceInPlanOfPlanCandidateResponse = {
    plan: PlanEntity;
};

export type EditPlanTitleOfPlanCandidateRequest = {
    planCandidateId: string;
    planId: string;
    title: string;
};

export type EditPlanTitleOfPlanCandidateResponse = {
    plan: PlanEntity;
};

export type FetchNearbyPlaceCategoriesRequest = {
    location: {
        latitude: number;
        longitude: number;
    };
};

export type FetchNearbyPlaceCategoriesResponse = {
    session: string;
    categories: {
        name: string;
        displayName: string;
        photo?: string;
        defaultPhotoUrl: string;
        places: PlaceEntity[];
    }[];
};

export type SavePlanFromCandidateRequest = {
    session: string;
    planId: string;
    authToken?: string;
};

export type SavePlanFromCandidateResponse = {
    planId: string;
};

export type UpdatePlanCandidatePlacesOrderRequest = {
    planCandidateSetId: string;
    planId: string;
    placeIds: string[];
    currentLocation?: GeoLocation;
};

export type UpdatePlanCandidatePlacesOrderResponse = {
    plan: PlanEntity | null;
};

export type UpdateLikeAtPlaceInPlanCandidateRequest = {
    planCandidateId: string;
    placeId: string;
    like: boolean;
    userId: string | null;
    firebaseIdToken: string | null;
};

export type UpdateLikeAtPlaceInPlanCandidateResponse = {
    plans: PlanEntity[];
    likedPlaceIds: string[];
};

export type AutoReorderPlacesInPlanCandidateRequest = {
    planCandidateId: string;
    planId: string;
};

export type AutoReorderPlacesInPlanCandidateResponse = {
    PlanCandidateId: string;
    plan: PlanEntity;
};

export type FetchPlacesNearbyPlanLocationRequest = {
    planId: string;
    limit: number | null;
};

export type FetchPlacesNearbyPlanLocationResponse = {
    places: PlaceEntity[];
};

export type UploadPlacePhotosInPlanRequest = {
    planId: string;
    userId: string;
    firebaseIdToken: string;
    photos: {
        placeId: string;
        photoUrl: string;
        width: number;
        height: number;
    }[];
};

export type UploadPlacePhotosInPlanResponse = {
    plan: PlanEntity;
};

export type FetchCreatePlanPlaceCategoriesRequest = {
    locale: Locale;
};

export type FetchCreatePlanPlaceCategoriesResponse = {
    categories: CreatePlanPlaceCategorySet[];
};
