import {
    CachedCreatedPlansDocument, ChangePlacesOrderInPlanCandidateDocument,
    CreatePlanByLocationDocument,
    FetchPlanByIdDocument,
    FetchPlansDocument,
    MatchInterestsDocument,
    Plan,
    SavePlanFromCandidateDocument,
} from "src/data/graphql/generated";
import { GraphQlRepository } from "src/data/graphql/GraphQlRepository";
import {
    CreatePlanFromLocationRequest,
    CreatePlanFromLocationResponse,
    FetchCachedCreatedPlansRequest,
    FetchCachedCreatedPlansResponse,
    FetchPlanRequest,
    FetchPlanResponse,
    MatchInterestRequest,
    MatchInterestResponse,
    PlanEntity,
    PlannerApi,
    SavePlanFromCandidateRequest,
    SavePlanFromCandidateResponse, UpdatePlanCandidatePlacesOrderRequest, UpdatePlanCandidatePlacesOrderResponse,
} from "src/domain/plan/PlannerApi";

export class PlannerGraphQlApi extends GraphQlRepository implements PlannerApi {
    async fetchPlan(request: FetchPlanRequest): Promise<FetchPlanResponse> {
        const { data } = await this.client.query({
            query: FetchPlanByIdDocument,
            variables: { planId: request.planId },
        });
        return {
            plan: data.plan !== null ? fromGraphqlPlanEntity(data.plan) : null,
        };
    }

    async fetchPlans(request: { pageKey: string | null }) {
        const { data } = await this.client.query({
            query: FetchPlansDocument,
            variables: {
                pageKey: request.pageKey,
            },
        });
        return {
            plans: data.plans.map((plan) => ({
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
            nextPageKey:
                data.plans.length === 0
                    ? null
                    : data.plans[data.plans.length - 1].id,
        };
    }

    async createPlansFromLocation(
        request: CreatePlanFromLocationRequest
    ): Promise<CreatePlanFromLocationResponse> {
        const { data } = await this.client.mutate({
            mutation: CreatePlanByLocationDocument,
            variables: {
                latitude: request.location.latitude,
                longitude: request.location.longitude,
                categories: request.categories,
                planDuration: request.planDuration ?? undefined,
                basedOnCurrentLocation: request.basedOnCurrentLocation,
            },
        });
        return {
            session: data.createPlanByLocation.session,
            plans: data.createPlanByLocation.plans.map((plan) =>
                fromGraphqlPlanEntity(plan)
            ),
        };
    }

    async fetchCachedCreatedPlans(
        request: FetchCachedCreatedPlansRequest
    ): Promise<FetchCachedCreatedPlansResponse> {
        const { data } = await this.client.query({
            query: CachedCreatedPlansDocument,
            variables: { session: request.session },
        });

        if (!data.cachedCreatedPlans.plans)
            return { plans: null, createdBasedOnCurrentLocation: false };

        return {
            createdBasedOnCurrentLocation:
                data.cachedCreatedPlans.createdBasedOnCurrentLocation,
            plans: data.cachedCreatedPlans.plans.map((plan) =>
                fromGraphqlPlanEntity(plan)
            ),
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

    async savePlanFromCandidate(
        request: SavePlanFromCandidateRequest
    ): Promise<SavePlanFromCandidateResponse> {
        const { data } = await this.client.mutate({
            mutation: SavePlanFromCandidateDocument,
            variables: {
                session: request.session,
                planId: request.planId,
            },
        });
        return {
            planId: data.savePlanFromCandidate.plan.id,
        };
    }

    async updatePlanCandidatePlacesOrder(
        request: UpdatePlanCandidatePlacesOrderRequest,
    ): Promise<UpdatePlanCandidatePlacesOrderResponse> {
        const { data } = await this.client.mutate({
            mutation: ChangePlacesOrderInPlanCandidateDocument,
            variables: {
                input: {
                    session: request.session,
                    planId: request.planId,
                    placeIds: request.placeIds,
                    currentLatitude: request.currentLocation?.latitude,
                    currentLongitude: request.currentLocation?.longitude,
                }
            },
        });
        return {
            plan: fromGraphqlPlanEntity(data.changePlacesOrderInPlanCandidate.plan),
        };
    }
}

function fromGraphqlPlanEntity(plan: Plan): PlanEntity {
    return {
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
    };
}
