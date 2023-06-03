export interface PlannerApi {
    createPlansFromLocation(
        request: CreatePlanFromLocationRequest
    ): Promise<CreatePlanFromLocationResponse>;

    fetchCachedCreatedPlans(
        request: FetchCachedCreatedPlansRequest
    ): Promise<FetchCachedCreatedPlansResponse>;

    matchInterest(
        request: MatchInterestRequest
    ): Promise<MatchInterestResponse>;
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

export function createPlanFromPlanEntity(entities: PlanEntity[]) {
    return entities.map((plan) => ({
        id: plan.id,
        title: plan.title,
        imageUrls: plan.places.flatMap((place) => place.imageUrls),
        tags: plan.tags,
        places: plan.places.map((place) => ({
            name: place.name,
            imageUrls: place.imageUrls,
            location: place.location,
            tags: [],
        })),
        timeInMinutes: plan.timeInMinutes,
    }));
}

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
