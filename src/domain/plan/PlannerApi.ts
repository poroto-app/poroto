import { GeoLocation } from "src/domain/models/GeoLocation";
import { Place } from "src/domain/models/Place";
import { Plan } from "src/domain/models/Plan";

export interface PlannerApi {
    fetchPlan(request: FetchPlanRequest): Promise<FetchPlanResponse>;

    fetchPlans(request: FetchPlansRequest): Promise<FetchPlansResponse>;

    fetchPlansByLocation(
        request: FetchPlansByLocationRequest
    ): Promise<FetchPlansByLocationResponse>;

    createPlansFromLocation(
        request: CreatePlanFromLocationRequest
    ): Promise<CreatePlanFromLocationResponse>;

    createPlanFromPlace(
        request: CreatePlanFromPlaceRequest
    ): Promise<CreatePlanFromPlaceResponse>;

    fetchCachedCreatedPlans(
        request: FetchCachedCreatedPlansRequest
    ): Promise<FetchCachedCreatedPlansResponse>;

    fetchAvailablePlacesForPlan(
        request: FetchAvailablePlacesForPlanRequest
    ): Promise<FetchAvailablePlacesForPlanResponse>;

    matchInterest(
        request: MatchInterestRequest
    ): Promise<MatchInterestResponse>;

    savePlanFromCandidate(
        request: SavePlanFromCandidateRequest
    ): Promise<SavePlanFromCandidateResponse>;

    updatePlanCandidatePlacesOrder(
        request: UpdatePlanCandidatePlacesOrderRequest
    ): Promise<UpdatePlanCandidatePlacesOrderResponse>;
}

export type PlanEntity = {
    id: string;
    title: string;
    tags: {
        content: string;
    }[];
    places: PlaceEntity[];
    timeInMinutes: number;
    transitions: {
        fromPlaceId?: string;
        toPlaceId: string;
        durationInMinutes: number;
    }[];
};

export type PlaceEntity = {
    id: string;
    name: string;
    imageUrls: string[];
    location: {
        latitude: number;
        longitude: number;
    };
    estimatedStayDuration: number;
};

export function createPlanFromPlanEntity(entity: PlanEntity): Plan {
    return {
        id: entity.id,
        title: entity.title,
        tags: entity.tags,
        places: entity.places.map((place) => createPlaceFromPlaceEntity(place)),
        timeInMinutes: entity.timeInMinutes,
        transitions: entity.transitions.map((transition) => ({
            fromPlaceId: transition.fromPlaceId,
            toPlaceId: transition.toPlaceId,
            durationInMinutes: transition.durationInMinutes,
        })),
    };
}

export function createPlaceFromPlaceEntity(entity: PlaceEntity): Place {
    return {
        id: entity.id,
        name: entity.name,
        imageUrls: entity.imageUrls,
        location: entity.location,
        tags: [],
        estimatedStayDuration: entity.estimatedStayDuration,
    };
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

export type FetchCachedCreatedPlansRequest = {
    session: string;
};

export type FetchCachedCreatedPlansResponse = {
    createdBasedOnCurrentLocation: boolean;
    plans: PlanEntity[] | null;
};

export type MatchInterestRequest = {
    location: {
        latitude: number;
        longitude: number;
    };
};

export type MatchInterestResponse = {
    session: string;
    categories: {
        name: string;
        displayName: string;
        photo?: string;
        defaultPhotoUrl: string;
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
