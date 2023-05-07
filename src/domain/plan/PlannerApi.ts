export interface PlannerApi {
    createPlansFromLocation(request: CreatePlanFromLocationRequest): Promise<CreatePlanFromLocationResponse>

    fetchCachedCreatedPlans(request: FetchCachedCreatedPlansRequest): Promise<FetchCachedCreatedPlansResponse>

    matchInterest(request: MatchInterestRequest): Promise<MatchInterestResponse>
}

export type CreatePlanFromLocationRequest = {
    location: {
        latitude: number,
        longitude: number,
    }
}

export type CreatePlanFromLocationResponse = {
    session: string,
    plans: {
        id: string,
        title: string
        tags: {
            content: string,
        }[],
        places: {
            name: string,
            imageUrls: string[],
            location: {
                latitude: number,
                longitude: number,
            }
        }[]
        timeInMinutes: number,
    }[]
}

export type FetchCachedCreatedPlansRequest = {
    session: string
}

export type FetchCachedCreatedPlansResponse = {
    plans: {
        id: string,
        title: string
        tags: {
            content: string,
        }[],
        places: {
            name: string,
            imageUrls: string[],
            location: {
                latitude: number,
                longitude: number,
            }
        }[]
        timeInMinutes: number,
    }[] | null
}

export type MatchInterestRequest = {
    location: {
        latitude: number,
        longitude: number,
    }
}

export type MatchInterestResponse = {
    categories: {
        name: string
        displayName: string
        photo: string
    }[]
}