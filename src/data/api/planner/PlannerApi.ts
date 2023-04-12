import axios, {AxiosResponse} from "axios";

export class PlannerApi {
    async createPlansFromLocation(request: CreatePlanFromLocationRequest): Promise<CreatePlanFromLocationResponse> {
        const response: AxiosResponse<{
            plans: {
                name: string,
                places: {
                    name: string,
                    photos: string[],
                    location: {
                        latitude: number,
                        longitude: number,
                    }
                }[]
            }[]
        }> = await axios.post(`${process.env.PLANNER_API_ENDPOINT}/plans`, request);

        return {
            plans: response.data.plans.map((plan, i) => ({
                id: i.toString(),
                title: plan.name,
                tags: [],
                places: plan.places.map((place) => ({
                    name: place.name,
                    imageUrls: place.photos,
                    location: place.location,
                })),
            }))
        };
    }
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