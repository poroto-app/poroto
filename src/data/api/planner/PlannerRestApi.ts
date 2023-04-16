import axios, {AxiosResponse} from "axios";
import {
    CreatePlanFromLocationRequest,
    CreatePlanFromLocationResponse,
    MatchInterestRequest,
    MatchInterestResponse,
    PlannerApi
} from "src/domain/plan/PlannerApi";

// TODO: DELETE
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

    async matchInterest(request: MatchInterestRequest): Promise<MatchInterestResponse> {
        return {
            categories: [
                {
                    name: "spa",
                    displayName: "温泉",
                    photo: "https://images.pexels.com/photos/347137/pexels-photo-347137.jpeg",
                },
                {
                    name: "cafe",
                    displayName: "カフェ",
                    photo: "https://images.pexels.com/photos/1402407/pexels-photo-1402407.jpeg"
                }
            ]
        };
    }
}
