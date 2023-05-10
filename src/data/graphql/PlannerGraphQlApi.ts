import { GraphQlRepository } from "src/data/graphql/GraphQlRepository";
import {
    CreatePlanFromLocationRequest,
    CreatePlanFromLocationResponse,
    MatchInterestRequest,
    MatchInterestResponse,
    PlannerApi,
} from "src/domain/plan/PlannerApi";
import {
    CreatePlanByLocationDocument,
    MatchInterestsDocument,
} from "src/data/graphql/generated";

export class PlannerGraphQlApi extends GraphQlRepository implements PlannerApi {
    async createPlansFromLocation(
        request: CreatePlanFromLocationRequest
    ): Promise<CreatePlanFromLocationResponse> {
        const { data } = await this.client.mutate({
            mutation: CreatePlanByLocationDocument,
            variables: {
                latitude: request.location.latitude,
                longitude: request.location.longitude,
            },
        });
        return {
            plans: data.createPlanByLocation.map((plan) => ({
                id: plan.id,
                title: plan.name,
                tags: [], // TODO: APIから取得する,
                places: plan.places.map((place) => ({
                    name: place.name,
                    imageUrls: place.photos,
                    location: {
                        latitude: place.location.latitude,
                        longitude: place.location.longitude,
                    },
                })),
                timeInMinutes: plan.timeInMinutes,
            })),
        };
    }

    async matchInterest(
        request: MatchInterestRequest
    ): Promise<MatchInterestResponse> {
        const { data } = await this.client.query({
            query: MatchInterestsDocument,
            variables: {
                latitude: request.location.latitude,
                longitude: request.location.longitude,
            },
        });
        return {
            categories: data.matchInterests.categories.map((category) => ({
                name: category.name,
                displayName: category.displayName,
                photo: category.photo,
            })),
        };
    }
}
