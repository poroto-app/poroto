import {
    CachedCreatedPlansDocument,
    ChangePlacesOrderInPlanCandidateDocument,
    CreatePlanByLocationDocument,
    CreatePlanByPlaceDocument,
    FetchAvailablePlacesForPlanCandidateDocument,
    FetchPlanByIdDocument,
    FetchPlanByIdQuery,
    FetchPlansDocument,
    MatchInterestsDocument,
    PlansByLocationDocument,
    PlansByUserDocument,
    SavePlanFromCandidateDocument,
} from "src/data/graphql/generated";
import { GraphQlRepository } from "src/data/graphql/GraphQlRepository";
import {
    CreatePlanFromLocationRequest,
    CreatePlanFromLocationResponse,
    CreatePlanFromPlaceRequest,
    CreatePlanFromPlaceResponse,
    FetchAvailablePlacesForPlanRequest,
    FetchCachedCreatedPlansRequest,
    FetchCachedCreatedPlansResponse,
    FetchPlanRequest,
    FetchPlanResponse,
    FetchPlansByLocationRequest,
    FetchPlansByLocationResponse,
    FetchPlansByUserRequest,
    FetchPlansByUserResponse,
    MatchInterestRequest,
    MatchInterestResponse,
    PlaceEntity,
    PlanEntity,
    PlannerApi,
    SavePlanFromCandidateRequest,
    SavePlanFromCandidateResponse,
    UpdatePlanCandidatePlacesOrderRequest,
    UpdatePlanCandidatePlacesOrderResponse,
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
            plans: data.plans.map((plan) => fromGraphqlPlanEntity(plan)),
            nextPageKey:
                data.plans.length === 0
                    ? null
                    : data.plans[data.plans.length - 1].id,
        };
    }

    async fetchPlansByUser(
        request: FetchPlansByUserRequest
    ): Promise<FetchPlansByUserResponse> {
        const { data } = await this.client.query({
            query: PlansByUserDocument,
            variables: {
                userId: request.userId,
            },
        });
        return {
            plans: data.plansByUser.plans.map((plan) =>
                fromGraphqlPlanEntity(plan)
            ),
            author: data.plansByUser.author,
        };
    }

    async fetchPlansByLocation(
        request: FetchPlansByLocationRequest
    ): Promise<FetchPlansByLocationResponse> {
        const { data } = await this.client.query({
            query: PlansByLocationDocument,
            variables: {
                latitude: request.location.latitude,
                longitude: request.location.longitude,
                limit: request.limit,
                pageKey: request.pageKey,
            },
        });
        return {
            pageKey: data.plansByLocation.pageKey ?? null,
            plans: data.plansByLocation.plans.map((plan) =>
                fromGraphqlPlanEntity(plan)
            ),
        };
    }
    async fetchAvailablePlacesForPlan(
        request: FetchAvailablePlacesForPlanRequest
    ) {
        const { data } = await this.client.query({
            query: FetchAvailablePlacesForPlanCandidateDocument,
            variables: {
                session: request.session,
            },
        });
        return {
            places: data.availablePlacesForPlan.places.map((place) =>
                fromGraphqlPlaceEntity(place)
            ),
        };
    }

    async createPlansFromLocation(
        request: CreatePlanFromLocationRequest
    ): Promise<CreatePlanFromLocationResponse> {
        const { data } = await this.client.mutate({
            mutation: CreatePlanByLocationDocument,
            variables: {
                session: request.session,
                latitude: request.location.latitude,
                longitude: request.location.longitude,
                googlePlaceId: request.googlePlaceId ?? undefined,
                categoriesPreferred: request.categoriesPreferred,
                categoriesDisliked: request.categoriesDisliked,
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

    async createPlanFromPlace(
        request: CreatePlanFromPlaceRequest
    ): Promise<CreatePlanFromPlaceResponse> {
        const { data } = await this.client.mutate({
            mutation: CreatePlanByPlaceDocument,
            variables: {
                sessionId: request.createPlanSessionId,
                placeId: request.placeId,
            },
        });
        return {
            createPlanSessionId: data.createPlanByPlace.session,
            plan: fromGraphqlPlanEntity(data.createPlanByPlace.plan),
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
            session: data.matchInterests.session,
            categories: data.matchInterests.categories.map((category) => ({
                name: category.name,
                displayName: category.displayName,
                photo: category.photo,
                defaultPhotoUrl: category.defaultPhotoUrl,
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
                authToken: request.authToken,
            },
        });
        return {
            planId: data.savePlanFromCandidate.plan.id,
        };
    }

    async updatePlanCandidatePlacesOrder(
        request: UpdatePlanCandidatePlacesOrderRequest
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
                },
            },
        });
        return {
            plan: fromGraphqlPlanEntity(
                data.changePlacesOrderInPlanCandidate.plan
            ),
        };
    }
}

type GraphQlPlanEntity = FetchPlanByIdQuery["plan"];
type GraphQlPlaceEntity = FetchPlanByIdQuery["plan"]["places"][0];

function fromGraphqlPlanEntity(plan: GraphQlPlanEntity): PlanEntity {
    return {
        id: plan.id,
        title: plan.name,
        places: plan.places.map((place) => fromGraphqlPlaceEntity(place)),
        timeInMinutes: plan.timeInMinutes,
        transitions: plan.transitions.map((transition) => ({
            fromPlaceId: transition.from && transition.from?.id,
            toPlaceId: transition.to.id,
            durationInMinutes: transition.duration,
        })),
    };
}

function fromGraphqlPlaceEntity(place: GraphQlPlaceEntity): PlaceEntity {
    return {
        id: place.id,
        googlePlaceId: place.googlePlaceId ?? null,
        name: place.name,
        images: place.images.map((image) => ({
            default: image.default,
            small: image.small ?? null,
            large: image.large ?? null,
        })),
        location: {
            latitude: place.location.latitude,
            longitude: place.location.longitude,
        },
        estimatedStayDuration: place.estimatedStayDuration,
        googlePlaceReviews:
            place.googleReviews?.map((review) => ({
                rating: review.rating,
                text: review.text,
                time: review.time,
                authorName: review.authorName,
                authorUrl: review.authorUrl,
                authorPhotoUrl: review.authorPhotoUrl,
            })) ?? null,
    };
}
