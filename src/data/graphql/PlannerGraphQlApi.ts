import { GraphQlRepository } from "src/data/graphql/GraphQlRepository";
import {
    AddPlaceToPlanCandidateDocument,
    AutoReorderPlacesInPlanCandidateDocument,
    ChangePlacesOrderInPlanCandidateDocument,
    CreatePlanByCategoryDocument,
    CreatePlanByLocationDocument,
    CreatePlanByPlaceDocument,
    CreatePlanCandidateSetFromSavedPlanDocument,
    DeletePlaceFromPlanCandidateDocument,
    DestinationCandidatePlacesForPlanCandidateDocument,
    EditPlanTitleOfPlanCandidateDocument,
    FetchAvailablePlacesForPlanCandidateDocument,
    FetchPlanByIdDocument,
    FetchPlanByIdWithUserDocument,
    FetchPlansDocument,
    NearbyPlaceCategoriesDocument,
    PlaceCategoriesDocument,
    PlaceFullFragmentFragment,
    PlacePreviewFragmentFragment,
    PlacesNearbyPlanDocument,
    PlacesToAddForPlanOfPlanCandidateDocument,
    PlacesToReplaceForPlanOfPlanCandidateDocument,
    PlanCandidateDocument,
    PlanFullFragmentFragment,
    PlanPreviewFragmentFragment,
    PlansByLocationDocument,
    ReplacePlaceOfPlanCandidateDocument,
    SavePlanFromCandidateDocument,
    UpdateLikeAtPlaceInPlanCandidateDocument,
    UpdateLikePlaceInPlanDocument,
    UploadPlacePhotoInPlanDocument,
    UserFullFragmentFragment,
} from "src/data/graphql/generated";
import { CreatePlanPlaceCategory } from "src/domain/models/CreatePlanPlaceCategory";
import { PlaceEntity } from "src/domain/models/PlaceEntity";
import { PlanEntity } from "src/domain/models/PlanEntity";
import { UserEntity } from "src/domain/models/UserEntity";
import {
    AddPlaceToPlanOfPlanCandidateRequest,
    AutoReorderPlacesInPlanCandidateRequest,
    AutoReorderPlacesInPlanCandidateResponse,
    CreatePlanByCategoryRequest,
    CreatePlanByCategoryResponse,
    CreatePlanCandidateSetFromSavedPlanRequest,
    CreatePlanCandidateSetFromSavedPlanResponse,
    CreatePlanFromLocationRequest,
    CreatePlanFromLocationResponse,
    CreatePlanFromPlaceRequest,
    CreatePlanFromPlaceResponse,
    DeletePlaceFromPlanOfPlanCandidateRequest,
    EditPlanTitleOfPlanCandidateRequest,
    FetchAvailablePlacesForPlanRequest,
    FetchCachedCreatedPlansRequest,
    FetchCachedCreatedPlansResponse,
    FetchCreatePlanPlaceCategoriesRequest,
    FetchCreatePlanPlaceCategoriesResponse,
    FetchNearbyPlaceCategoriesRequest,
    FetchNearbyPlaceCategoriesResponse,
    FetchPlacesForDestinationOfPlanCandidatesRequest,
    FetchPlacesForDestinationOfPlanCandidatesResponse,
    FetchPlacesNearbyPlanLocationRequest,
    FetchPlacesNearbyPlanLocationResponse,
    FetchPlacesToAddForPlanOfPlanCandidateRequest,
    FetchPlacesToAddForPlanOfPlanCandidateResponse,
    FetchPlacesToReplaceForPlanOfPlanCandidateRequest,
    FetchPlacesToReplaceForPlanOfPlanCandidateResponse,
    FetchPlanRequest,
    FetchPlanResponse,
    FetchPlansByLocationRequest,
    FetchPlansByLocationResponse,
    PlannerApi,
    ReplacePlaceInPlanOfPlanCandidateRequest,
    SavePlanFromCandidateRequest,
    SavePlanFromCandidateResponse,
    UpdateLikeAtPlaceInPlanCandidateRequest,
    UpdateLikeAtPlaceInPlanCandidateResponse,
    UpdateLikeOfPlaceInPlan,
    UpdateLikeOfPlaceInPlanResponse,
    UpdatePlanCandidatePlacesOrderRequest,
    UpdatePlanCandidatePlacesOrderResponse,
    UploadPlacePhotosInPlanRequest,
    UploadPlacePhotosInPlanResponse,
} from "src/domain/plan/PlannerApi";
import { hasValue } from "src/domain/util/null";
import { Locales } from "src/locales/type";

export class PlannerGraphQlApi extends GraphQlRepository implements PlannerApi {
    // ==============================================================
    // Plan
    // ==============================================================
    async fetchPlan(request: FetchPlanRequest): Promise<FetchPlanResponse> {
        if (!request.userId || !request.firebaseIdToken) {
            const { data } = await this.client.query({
                query: FetchPlanByIdDocument,
                variables: {
                    input: {
                        planID: request.planId,
                    },
                },
            });
            return {
                plan:
                    data.plan !== null
                        ? fromGraphqlPlanEntity(data.plan.plan)
                        : null,
                nearbyPlans:
                    data.plan != null
                        ? data.plan.plan.nearbyPlans.map((plan) =>
                              fromGraphqlPlanPreviewEntity(plan)
                          )
                        : [],
                likedPlaceIds: [],
            };
        }

        const { data } = await this.client.query({
            query: FetchPlanByIdWithUserDocument,
            variables: {
                planInput: {
                    planID: request.planId,
                },
                likePlacesInput: {
                    userId: request.userId,
                    firebaseAuthToken: request.firebaseIdToken,
                },
            },
        });

        return {
            plan:
                data.plan !== null
                    ? fromGraphqlPlanEntity(data.plan.plan)
                    : null,
            nearbyPlans:
                data.plan != null
                    ? data.plan.plan.nearbyPlans.map((plan) =>
                          fromGraphqlPlanPreviewEntity(plan)
                      )
                    : [],
            likedPlaceIds: data.likePlaces.map((place) => place.id),
        };
    }

    async fetchPlans(request: { pageKey: string | null }) {
        const { data } = await this.client.query({
            query: FetchPlansDocument,
            variables: {
                input: {
                    pageToken: request.pageKey,
                },
            },
        });
        return {
            plans: data.plans.plans.map((plan) =>
                fromGraphqlPlanPreviewEntity(plan)
            ),
            nextPageKey: data.plans.nextPageToken ?? null,
        };
    }

    async fetchPlansByLocation(
        request: FetchPlansByLocationRequest
    ): Promise<FetchPlansByLocationResponse> {
        const { data } = await this.client.query({
            query: PlansByLocationDocument,
            variables: {
                input: {
                    latitude: request.location.latitude,
                    longitude: request.location.longitude,
                    limit: request.limit,
                },
            },
        });
        return {
            plans: data.plansByLocation.plans.map((plan) =>
                fromGraphqlPlanPreviewEntity(plan)
            ),
        };
    }

    async updateLikeOfPlaceInPlan(
        request: UpdateLikeOfPlaceInPlan
    ): Promise<UpdateLikeOfPlaceInPlanResponse> {
        const { data } = await this.client.mutate({
            mutation: UpdateLikePlaceInPlanDocument,
            variables: {
                input: {
                    planId: request.planId,
                    placeId: request.placeId,
                    like: request.like,
                    userId: request.userId,
                    firebaseAuthToken: request.firebaseIdToken,
                },
            },
        });
        return {
            plan: fromGraphqlPlanEntity(data.likeToPlaceInPlan.plan),
            likePlaceIds: data.likeToPlaceInPlan.likedPlaceIds,
        };
    }

    async uploadPlacePhotosInPlan(
        request: UploadPlacePhotosInPlanRequest
    ): Promise<UploadPlacePhotosInPlanResponse> {
        const { data } = await this.client.mutate({
            mutation: UploadPlacePhotoInPlanDocument,
            variables: {
                planId: request.planId,
                userId: request.userId,
                firebaseAuthToken: request.firebaseIdToken,
                inputs: request.photos.map((photo) => {
                    return {
                        placeId: photo.placeId,
                        photoUrl: photo.photoUrl,
                        width: photo.width,
                        height: photo.height,
                    };
                }),
            },
        });
        return {
            plan: fromGraphqlPlanEntity(data.uploadPlacePhotoInPlan.plan),
        };
    }

    // ==============================================================
    // Plan Candidate
    // ==============================================================
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

    async createPlanByCategory(
        request: CreatePlanByCategoryRequest
    ): Promise<CreatePlanByCategoryResponse> {
        const { data } = await this.client.mutate({
            mutation: CreatePlanByCategoryDocument,
            variables: {
                input: {
                    categoryId: request.categoryId,
                    latitude: request.location.latitude,
                    longitude: request.location.longitude,
                    radiusInKm: request.radiusInKm,
                },
            },
        });

        return {
            planCandidateSetId: data.createPlanByCategory.planCandidateSetId,
            plans: data.createPlanByCategory.plans.map((plan) =>
                fromGraphqlPlanEntity(plan)
            ),
        };
    }

    async createPlanCandidateSetFromSavedPlan(
        request: CreatePlanCandidateSetFromSavedPlanRequest
    ): Promise<CreatePlanCandidateSetFromSavedPlanResponse> {
        const { data } = await this.client.mutate({
            mutation: CreatePlanCandidateSetFromSavedPlanDocument,
            variables: {
                input: {
                    userId: request.userId,
                    firebaseAuthToken: request.firebaseIdToken,
                    savedPlanId: request.planId,
                },
            },
        });
        return {
            planCandidateSetId:
                data.createPlanCandidateSetFromSavedPlan.planCandidate.id,
            likedPlaceIds:
                data.createPlanCandidateSetFromSavedPlan.planCandidate
                    .likedPlaceIds,
            plans: data.createPlanCandidateSetFromSavedPlan.planCandidate.plans.map(
                (plan) => fromGraphqlPlanEntity(plan)
            ),
        };
    }

    async fetchCachedCreatedPlans(
        request: FetchCachedCreatedPlansRequest
    ): Promise<FetchCachedCreatedPlansResponse> {
        const { data } = await this.client.query({
            query: PlanCandidateDocument,
            variables: {
                input: {
                    planCandidateId: request.planCandidateId,
                    userId: request.userId,
                    firebaseAuthToken: request.firebaseIdToken,
                },
            },
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
    ): Promise<FetchPlacesToAddForPlanOfPlanCandidateResponse> {
        const { data } = await this.client.query({
            query: PlacesToAddForPlanOfPlanCandidateDocument,
            variables: {
                input: {
                    planCandidateId: request.planCandidateId,
                    planId: request.planId,
                    placeId: request.placeId,
                },
            },
        });
        return {
            placesRecommend: data.placesToAddForPlanCandidate.places.map(
                (place) => fromGraphqlPlaceEntity(place)
            ),
            placesGroupedByCategories:
                data.placesToAddForPlanCandidate.placesGroupedByCategory.map(
                    (category) => ({
                        category: {
                            id: category.category.id,
                            displayName: category.category.name,
                        },
                        places: category.places.map((place) =>
                            fromGraphqlPlaceEntity(place)
                        ),
                    })
                ),
            transitions: data.placesToAddForPlanCandidate.transitions.map(
                (t) => ({
                    fromPlaceId: t.from?.id,
                    toPlaceId: t.to.id,
                    durationInMinutes: t.duration,
                })
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

    async fetchPlacesForDestinationOfPlanCandidates(
        request: FetchPlacesForDestinationOfPlanCandidatesRequest
    ): Promise<FetchPlacesForDestinationOfPlanCandidatesResponse> {
        const { data } = await this.client.query({
            query: DestinationCandidatePlacesForPlanCandidateDocument,
            variables: {
                input: {
                    planCandidateSetId: request.planCandidateSetId,
                },
            },
        });

        return {
            placesForPlanCandidates:
                data.destinationCandidatePlacesForPlanCandidate.placesForPlanCandidates.map(
                    (placeForPlanCandidate) => ({
                        planCandidateId: placeForPlanCandidate.planCandidateId,
                        places: placeForPlanCandidate.places.map((place) =>
                            fromGraphqlPlaceEntity(place)
                        ),
                    })
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
                    session: request.planCandidateSetId,
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
                    userId: request.userId,
                    firebaseAuthToken: request.firebaseIdToken,
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

    async autoReorderPlacesInPlanCandidate(
        request: AutoReorderPlacesInPlanCandidateRequest
    ): Promise<AutoReorderPlacesInPlanCandidateResponse> {
        const { data } = await this.client.mutate({
            mutation: AutoReorderPlacesInPlanCandidateDocument,
            variables: {
                input: {
                    planCandidateId: request.planCandidateId,
                    planId: request.planId,
                },
            },
        });
        return {
            PlanCandidateId:
                data.autoReorderPlacesInPlanCandidate.planCandidateId,
            plan: fromGraphqlPlanEntity(
                data.autoReorderPlacesInPlanCandidate.plan
            ),
        };
    }

    async fetchPlacesNearbyPlanLocation(
        request: FetchPlacesNearbyPlanLocationRequest
    ): Promise<FetchPlacesNearbyPlanLocationResponse> {
        const { data } = await this.client.query({
            query: PlacesNearbyPlanDocument,
            variables: {
                input: {
                    planId: request.planId,
                    limit: request.limit,
                },
            },
        });

        return {
            places: data.placesNearPlan.places.map((place) =>
                fromGraphqlPlaceEntity(place)
            ),
        };
    }

    async fetchCreatePlanPlaceCategories(
        request: FetchCreatePlanPlaceCategoriesRequest
    ): Promise<FetchCreatePlanPlaceCategoriesResponse> {
        const { data } = await this.client.query({
            query: PlaceCategoriesDocument,
        });
        return {
            categories: data.placeCategories.map((category) => ({
                displayName:
                    request.locale === Locales.Ja
                        ? category.displayNameJa
                        : category.displayNameEn,
                categories: category.categories.map(
                    (c) =>
                        ({
                            id: c.id,
                            displayName:
                                request.locale === Locales.Ja
                                    ? c.displayNameJa
                                    : c.displayNameEn,
                            imageUrl: c.imageUrl,
                        }) as CreatePlanPlaceCategory
                ),
            })),
        };
    }
}

type GraphQlPlanEntity = PlanFullFragmentFragment;
type GraphQlPlaceEntity = PlaceFullFragmentFragment;

export function fromGraphqlPlanEntity(plan: GraphQlPlanEntity): PlanEntity {
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
        author: plan.author ? fromGraphQlUserEntity(plan.author) : null,
    };
}

export function fromGraphqlPlanPreviewEntity(
    plan: PlanPreviewFragmentFragment
): PlanEntity {
    return {
        id: plan.id,
        title: plan.name,
        places: plan.places.map((place) =>
            fromGraphqlPlacePreviewEntity(place)
        ),
        timeInMinutes: 0,
        transitions: [],
        author: plan.author ? fromGraphQlUserEntity(plan.author) : null,
    };
}

export function fromGraphqlPlaceEntity(place: GraphQlPlaceEntity): PlaceEntity {
    return {
        id: place.id,
        googlePlaceId: place.googlePlaceId ?? null,
        name: place.name,
        images: place.images.map((image) => ({
            default: image.default,
            small: image.small ?? null,
            large: image.large ?? null,
            isGooglePhotos: image.google,
        })),
        address: hasValue(place.address) ? place.address : null,
        location: {
            latitude: place.location.latitude,
            longitude: place.location.longitude,
        },
        estimatedStayDuration: place.estimatedStayDuration,
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

function fromGraphqlPlacePreviewEntity(
    place: PlacePreviewFragmentFragment
): PlaceEntity {
    return {
        id: place.id,
        googlePlaceId: null,
        name: place.name,
        images: place.images.map((image) => ({
            default: image.default,
            small: image.small ?? null,
            large: image.large ?? null,
            isGooglePhotos: image.google,
        })),
        address: hasValue(place.address) ? place.address : null,
        location: {
            latitude: 0,
            longitude: 0,
        },
        estimatedStayDuration: 0,
        categories:
            place.categories?.map((category) => ({
                id: category.id,
                displayName: category.name,
            })) ?? [],
        priceRange: null,
        likeCount: place.likeCount,
    };
}

export function fromGraphQlUserEntity(
    userEntity: UserFullFragmentFragment
): UserEntity {
    return {
        id: userEntity.id,
        name: userEntity.name,
        photoUrl: userEntity.photoUrl ?? null,
    };
}
