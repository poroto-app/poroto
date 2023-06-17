export interface PlannerApi {
    fetchPlan(request: FetchPlanRequest): Promise<FetchPlanResponse>;

    createPlansFromLocation(
        request: CreatePlanFromLocationRequest
    ): Promise<CreatePlanFromLocationResponse>;

    fetchCachedCreatedPlans(
        request: FetchCachedCreatedPlansRequest
    ): Promise<FetchCachedCreatedPlansResponse>;

    matchInterest(
        request: MatchInterestRequest
    ): Promise<MatchInterestResponse>;

    savePlanFromCandidate(
        request: SavePlanFromCandidateRequest
    ): Promise<SavePlanFromCandidateResponse>;
}

export type PlanEntity = {
    id: string;
    title: string;
    tags: {
        content: string;
    }[];
    places: {
        name: string;
        imageUrls: string[];
        location: {
            latitude: number;
            longitude: number;
        };
    }[];
    timeInMinutes: number;
};

export function createPlanFromPlanEntity(entity: PlanEntity) {
    return {
        id: entity.id,
        title: entity.title,
        imageUrls: entity.places.flatMap((place) => place.imageUrls),
        tags: entity.tags,
        places: entity.places.map((place) => ({
            name: place.name,
            imageUrls: place.imageUrls,
            location: place.location,
            tags: [],
        })),
        timeInMinutes: entity.timeInMinutes,
    };
}

export type FetchPlanRequest = {
    planId: string;
};

export type FetchPlanResponse = {
    plan: PlanEntity | null;
};

export type CreatePlanFromLocationRequest = {
    location: {
        latitude: number;
        longitude: number;
    };
    categories?: string[];
    planDuration?: number;
    basedOnCurrentLocation: boolean;
};

export type CreatePlanFromLocationResponse = {
    session: string;
    plans: PlanEntity[];
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
    categories: {
        name: string;
        displayName: string;
        photo: string;
    }[];
};

export type SavePlanFromCandidateRequest = {
    session: string;
    planId: string;
};

export type SavePlanFromCandidateResponse = {
    planId: string;
};
