import {
    AddPlaceToPlanCandidateDocument,
    ChangePlacesOrderInPlanCandidateDocument,
    CreatePlanByLocationDocument,
    CreatePlanByPlaceDocument,
    CreatePlanCandidateByGooglePlaceIdDocument,
    DeletePlaceFromPlanCandidateDocument,
    EditPlanTitleOfPlanCandidateDocument,
    FetchAvailablePlacesForPlanCandidateDocument,
    FetchPlanByIdDocument,
    FetchPlanByIdQuery,
    FetchPlansDocument,
    NearbyPlaceCategoriesDocument,
    PlacesToAddForPlanOfPlanCandidateDocument,
    PlacesToReplaceForPlanOfPlanCandidateDocument,
    PlanCandidateDocument,
    PlanCandidateFullFragmentFragment,
    PlansByLocationDocument,
    PlansByUserDocument,
    ReplacePlaceOfPlanCandidateDocument,
    SavePlanFromCandidateDocument,
    UpdateLikeAtPlaceInPlanCandidateDocument,
} from "src/data/graphql/generated";
import { GraphQlRepository } from "src/data/graphql/GraphQlRepository";
import { PlaceEntity } from "src/domain/models/PlaceEntity";
import { PlanCandidateEntity } from "src/domain/models/PlanCandidateEntity";
import { PlanEntity } from "src/domain/models/PlanEntity";
import {
    AddPlaceToPlanOfPlanCandidateRequest,
    CreatePlanCandidateByGooglePlaceIdRequest,
    CreatePlanCandidateByGooglePlaceIdResponse,
    CreatePlanFromLocationRequest,
    CreatePlanFromLocationResponse,
    CreatePlanFromPlaceRequest,
    CreatePlanFromPlaceResponse,
    DeletePlaceFromPlanOfPlanCandidateRequest,
    EditPlanTitleOfPlanCandidateRequest,
    FetchAvailablePlacesForPlanRequest,
    FetchCachedCreatedPlansRequest,
    FetchCachedCreatedPlansResponse,
    FetchNearbyPlaceCategoriesRequest,
    FetchNearbyPlaceCategoriesResponse,
    FetchPlacesToAddForPlanOfPlanCandidateRequest,
    FetchPlacesToReplaceForPlanOfPlanCandidateRequest,
    FetchPlacesToReplaceForPlanOfPlanCandidateResponse,
    FetchPlanRequest,
    FetchPlanResponse,
    FetchPlansByLocationRequest,
    FetchPlansByLocationResponse,
    FetchPlansByUserRequest,
    FetchPlansByUserResponse,
    PlannerApi,
    ReplacePlaceInPlanOfPlanCandidateRequest,
    SavePlanFromCandidateRequest,
    SavePlanFromCandidateResponse,
    UpdateLikeAtPlaceInPlanCandidateRequest,
    UpdateLikeAtPlaceInPlanCandidateResponse,
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

    // ==========================================
    // Plan Candidate
    // ==========================================

    async createPlansFromLocation(
        request: CreatePlanFromLocationRequest
    ): Promise<CreatePlanFromLocationResponse> {
        const { data } = await this.client.mutate({
            mutation: CreatePlanByLocationDocument,
            variables: {
                input: {
                    session: request.session,
                    latitude: request.location.latitude,
                    longitude: request.location.longitude,
                    googlePlaceId: request.googlePlaceId ?? undefined,
                    categoriesPreferred: request.categoriesPreferred,
                    categoriesDisliked: request.categoriesDisliked,
                    createdBasedOnCurrentLocation:
                        request.basedOnCurrentLocation,
                    freeTime: request.planDuration ?? undefined,
                },
            },
        });
        return {
            session: data.createPlanByLocation.session,
            plans: data.createPlanByLocation.plans.map((plan) =>
                fromGraphqlPlanEntity(plan)
            ),
        };
    }

    async createPlanCandidateByGooglePlaceId(
        request: CreatePlanCandidateByGooglePlaceIdRequest
    ): Promise<CreatePlanCandidateByGooglePlaceIdResponse> {
        const { data } = await this.client.mutate({
            mutation: CreatePlanCandidateByGooglePlaceIdDocument,
            variables: {
                input: {
                    planCandidateId: request.planCandidateId,
                    googlePlaceId: request.googlePlaceId,
                    categoriesPreferred: request.categoriesPreferred,
                    categoriesDisliked: request.categoriesDisliked,
                    freeTime: request.planDuration ?? undefined,
                },
            },
        });
        return {
            planCandidate: fromGraphqlPlanCandidateEntity(
                data.createPlanByGooglePlaceId.planCandidate
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
            query: PlanCandidateDocument,
            variables: { planCandidateId: request.planCandidateId },
        });

        // TODO: PlanCandidate として return する
        if (!data.planCandidate) {
            return {
                plans: null,
                createdBasedOnCurrentLocation: false,
                likedPlaceIds: [],
            };
        }

        return {
            createdBasedOnCurrentLocation:
                data.planCandidate.planCandidate.createdBasedOnCurrentLocation,
            plans: data.planCandidate.planCandidate.plans.map((plan) =>
                fromGraphqlPlanEntity(plan)
            ),
            likedPlaceIds: data.planCandidate.planCandidate.likedPlaceIds,
        };
    }

    async fetchPlacesToAddForPlanOfPlanCandidate(
        request: FetchPlacesToAddForPlanOfPlanCandidateRequest
    ) {
        const { data } = await this.client.query({
            query: PlacesToAddForPlanOfPlanCandidateDocument,
            variables: {
                input: {
                    planCandidateId: request.planCandidateId,
                    planId: request.planId,
                },
            },
        });
        return {
            places: data.placesToAddForPlanCandidate.places.map((place) =>
                fromGraphqlPlaceEntity(place)
            ),
        };
    }

    async fetchPlacesToReplaceForPlanOfPlanCandidate(
        request: FetchPlacesToReplaceForPlanOfPlanCandidateRequest
    ): Promise<FetchPlacesToReplaceForPlanOfPlanCandidateResponse> {
        const { data } = await this.client.query({
            query: PlacesToReplaceForPlanOfPlanCandidateDocument,
            variables: {
                input: {
                    planCandidateId: request.planCandidateId,
                    planId: request.planId,
                    placeId: request.placeId,
                },
            },
        });
        return {
            places: data.placesToReplaceForPlanCandidate.places.map((place) =>
                fromGraphqlPlaceEntity(place)
            ),
        };
    }

    async addPlaceToPlanOfPlanCandidate(
        request: AddPlaceToPlanOfPlanCandidateRequest
    ) {
        const { data } = await this.client.mutate({
            mutation: AddPlaceToPlanCandidateDocument,
            variables: {
                input: {
                    planCandidateId: request.planCandidateId,
                    planId: request.planId,
                    previousPlaceId: request.previousPlaceId,
                    placeId: request.placeId,
                },
            },
        });
        return {
            plan: fromGraphqlPlanEntity(
                data.addPlaceToPlanCandidateAfterPlace.plan
            ),
        };
    }

    async deletePlaceFromPlanOfPlanCandidate(
        request: DeletePlaceFromPlanOfPlanCandidateRequest
    ) {
        const { data } = await this.client.mutate({
            mutation: DeletePlaceFromPlanCandidateDocument,
            variables: {
                input: {
                    planCandidateId: request.planCandidateId,
                    planId: request.planId,
                    placeId: request.placeId,
                },
            },
        });
        return {
            plan: fromGraphqlPlanEntity(data.deletePlaceFromPlanCandidate.plan),
        };
    }

    async replacePlaceInPlanOfPlanCandidate(
        request: ReplacePlaceInPlanOfPlanCandidateRequest
    ) {
        const { data } = await this.client.mutate({
            mutation: ReplacePlaceOfPlanCandidateDocument,
            variables: {
                input: {
                    planCandidateId: request.planCandidateId,
                    planId: request.planId,
                    placeIdToRemove: request.placeIdToReplace,
                    placeIdToReplace: request.placeIdToAdd,
                },
            },
        });

        return {
            plan: fromGraphqlPlanEntity(data.replacePlaceOfPlanCandidate.plan),
        };
    }

    async editPlanTitleOfPlanCandidate(
        request: EditPlanTitleOfPlanCandidateRequest
    ) {
        const { data } = await this.client.mutate({
            mutation: EditPlanTitleOfPlanCandidateDocument,
            variables: {
                input: {
                    planCandidateId: request.planCandidateId,
                    planId: request.planId,
                    title: request.title,
                },
            },
        });

        return {
            plan: fromGraphqlPlanEntity(data.editPlanTitleOfPlanCandidate.plan),
        };
    }

    async fetchNearbyPlaceCategories(
        request: FetchNearbyPlaceCategoriesRequest
    ): Promise<FetchNearbyPlaceCategoriesResponse> {
        const { data } = await this.client.query({
            query: NearbyPlaceCategoriesDocument,
            variables: {
                latitude: request.location.latitude,
                longitude: request.location.longitude,
            },
        });

        return {
            session: data.nearbyPlaceCategories.planCandidateId,
            categories: data.nearbyPlaceCategories.categories.map(
                (category) => ({
                    name: category.id,
                    displayName: category.displayName,
                    defaultPhotoUrl: category.defaultPhotoUrl,
                    places: category.places.map((place) =>
                        fromGraphqlPlaceEntity(place)
                    ),
                })
            ),
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

    async updateLikeAtPlaceInPlanCandidate(
        request: UpdateLikeAtPlaceInPlanCandidateRequest
    ): Promise<UpdateLikeAtPlaceInPlanCandidateResponse> {
        const { data } = await this.client.mutate({
            mutation: UpdateLikeAtPlaceInPlanCandidateDocument,
            variables: {
                input: {
                    planCandidateId: request.planCandidateId,
                    placeId: request.placeId,
                    like: request.like,
                },
            },
        });

        return {
            plans: data.likeToPlaceInPlanCandidate.planCandidate.plans.map(
                (plan) => fromGraphqlPlanEntity(plan)
            ),
            likedPlaceIds:
                data.likeToPlaceInPlanCandidate.planCandidate.likedPlaceIds,
        };
    }
}

type GraphQlPlanEntity = FetchPlanByIdQuery["plan"];
type GraphQlPlaceEntity = FetchPlanByIdQuery["plan"]["places"][0];

function fromGraphqlPlanCandidateEntity(
    planCandidate: PlanCandidateFullFragmentFragment
): PlanCandidateEntity {
    return {
        id: planCandidate.id,
        plans: planCandidate.plans.map((plan) => fromGraphqlPlanEntity(plan)),
        likedPlaceIds: planCandidate.likedPlaceIds,
        createdBasedONCurrentLocation:
            planCandidate.createdBasedOnCurrentLocation,
    };
}

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
        categories:
            place.categories?.map((category) => ({
                id: category.id,
                displayName: category.name,
            })) ?? [],
        priceRange: place.priceRange
            ? {
                  priceRangeMin: place.priceRange.priceRangeMin,
                  priceRangeMax: place.priceRange.priceRangeMax,
                  googlePriceLevel: place.priceRange.googlePriceLevel,
              }
            : null,
        likeCount: place.likeCount,
    };
}
