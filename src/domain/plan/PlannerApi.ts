import { GeoLocation } from "src/domain/models/GeoLocation";
import { PlaceEntity } from "src/domain/models/PlaceEntity";
import { PlanCandidateEntity } from "src/domain/models/PlanCandidateEntity";
import { PlanEntity } from "src/domain/models/PlanEntity";
import { UserEntity } from "src/domain/user/UserApi";

export interface PlannerApi {
    // ==============================================================
    // Plan
    // ==============================================================
    fetchPlan(request: FetchPlanRequest): Promise<FetchPlanResponse>;

    fetchPlans(request: FetchPlansRequest): Promise<FetchPlansResponse>;

    fetchPlansByUser(
        request: FetchPlansByUserRequest
    ): Promise<FetchPlansByUserResponse>;

    fetchPlansByLocation(
        request: FetchPlansByLocationRequest
    ): Promise<FetchPlansByLocationResponse>;

    // ==============================================================
    // Plan Candidate
    // ==============================================================
    createPlansFromLocation(
        request: CreatePlanFromLocationRequest
    ): Promise<CreatePlanFromLocationResponse>;

    createPlanCandidateByGooglePlaceId(
        request: CreatePlanCandidateByGooglePlaceIdRequest
    ): Promise<CreatePlanCandidateByGooglePlaceIdResponse>;

    createPlanFromPlace(
        request: CreatePlanFromPlaceRequest
    ): Promise<CreatePlanFromPlaceResponse>;

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

    updateLikeAtPlaceInPlanCandidate(
        request: UpdateLikeAtPlaceInPlanCandidateRequest
    ): Promise<UpdateLikeAtPlaceInPlanCandidateResponse>;
}

export type FetchPlanRequest = {
    planId: string;
};

export type FetchPlanResponse = {
    plan: PlanEntity | null;
};

export type FetchPlansRequest = {
    pageKey: string | null;
};

export type FetchPlansResponse = {
    plans: PlanEntity[];
    nextPageKey: string | null;
};

export type FetchPlansByUserRequest = {
    userId: string;
};

export type FetchPlansByUserResponse = {
    author: UserEntity;
    plans: PlanEntity[];
};

export type FetchPlansByLocationRequest = {
    location: GeoLocation;
    limit?: number;
    pageKey: string | null;
};

export type FetchPlansByLocationResponse = {
    pageKey: string | null;
    plans: PlanEntity[];
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

export type CreatePlanCandidateByGooglePlaceIdRequest = {
    planCandidateId?: string;
    googlePlaceId: string;
    categoriesPreferred?: string[];
    categoriesDisliked?: string[];
    planDuration?: number;
};

export type CreatePlanCandidateByGooglePlaceIdResponse = {
    planCandidate: PlanCandidateEntity;
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

export type FetchCachedCreatedPlansRequest = {
    planCandidateId: string;
};

export type FetchCachedCreatedPlansResponse = {
    createdBasedOnCurrentLocation: boolean;
    plans: PlanEntity[] | null;
    likedPlaceIds: string[];
};

export type FetchPlacesToAddForPlanOfPlanCandidateRequest = {
    planCandidateId: string;
    planId: string;
};

export type FetchPlacesToAddForPlanOfPlanCandidateResponse = {
    places: PlaceEntity[];
};

export type FetchPlacesToReplaceForPlanOfPlanCandidateRequest = {
    planCandidateId: string;
    planId: string;
    placeId: string;
};

export type FetchPlacesToReplaceForPlanOfPlanCandidateResponse = {
    places: PlaceEntity[];
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
    session: string;
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
};

export type UpdateLikeAtPlaceInPlanCandidateResponse = {
    plans: PlanEntity[];
    likedPlaceIds: string[];
};
