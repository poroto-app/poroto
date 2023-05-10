export interface PlannerApi {
    createPlansFromLocation(
        request: CreatePlanFromLocationRequest
    ): Promise<CreatePlanFromLocationResponse>;

    matchInterest(
        request: MatchInterestRequest
    ): Promise<MatchInterestResponse>;
}

export type CreatePlanFromLocationRequest = {
    location: {
        latitude: number;
        longitude: number;
    };
};

export type CreatePlanFromLocationResponse = {
    plans: {
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
    }[];
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
