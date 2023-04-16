import axios, {AxiosResponse} from "axios";
import {CreatePlanFromLocationRequest, CreatePlanFromLocationResponse, PlannerApi} from "src/domain/plan/PlannerApi";

export class PlannerRestApi implements PlannerApi {
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
