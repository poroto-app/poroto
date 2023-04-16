export interface PlannerApi {
    createPlansFromLocation(request: CreatePlanFromLocationRequest): Promise<CreatePlanFromLocationResponse>
}

export type CreatePlanFromLocationRequest = {
    location: {
        latitude: number,
        longitude: number,
    }
}

export type CreatePlanFromLocationResponse = {
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
    }[]
}
