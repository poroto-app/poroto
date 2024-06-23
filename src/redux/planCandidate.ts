import { getAnalytics, logEvent } from "@firebase/analytics";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { createPlaceFromPlaceEntity } from "src/domain/factory/Place";
import { createPlanFromPlanEntity } from "src/domain/factory/Plan";
import { LocationCategory } from "src/domain/models/LocationCategory";
import { LocationCategoryWithPlace } from "src/domain/models/LocationCategoryWithPlace";
import { Place } from "src/domain/models/Place";
import { Plan } from "src/domain/models/Plan";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { PlannerApi } from "src/domain/plan/PlannerApi";
import { RootState } from "src/redux/redux";
import { AnalyticsEvents } from "src/view/constants/analytics";
import {GeoLocation} from "src/domain/models/GeoLocation";

export type PlanCandidateState = {
    createPlanSession: string | null;
    planIdPreview: string | null;
    likedPlaceIds: string[] | null;
    createdBasedOnCurrentLocation: boolean | null;
    plansCreated: Plan[] | null;
    placesAvailableForPlan: Place[] | null;

    categoryCandidates: LocationCategoryWithPlace[] | null;
    categoriesAccepted: LocationCategory[] | null;
    categoriesRejected: LocationCategory[] | null;
    // 直前に発火したリクエストの結果と、新しく行ったリクエストの結果を区別できるようにするために利用する
    fetchLocationCategoryRequestId: string | null;

    createPlanFromLocationRequestStatus: RequestStatus | null;
    createPlanFromPlaceRequestStatus: RequestStatus | null;
    createPlanByCategoryRequestStatus: RequestStatus | null;
    createPlanFromSavedPlanRequestStatus: RequestStatus | null;
    savePlanFromCandidateRequestStatus: RequestStatus | null;
    updatePlacesOrderInPlanCandidateRequestStatus: RequestStatus | null;
    updateLikeAtPlaceInPlanCandidateRequestStatus: RequestStatus | null;
    autoReorderPlacesInPlanCandidateRequestStatus: RequestStatus | null;
    fetchCachedCreatedPlansRequestStatus: RequestStatus | null;
    fetchAvailablePlacesForPlanRequestStatus: RequestStatus | null;
    fetchNearbyPlaceCategoriesRequestStatus: RequestStatus | null;
};

const initialState: PlanCandidateState = {
    createPlanSession: null,
    createdBasedOnCurrentLocation: null,
    likedPlaceIds: null,
    plansCreated: null,
    placesAvailableForPlan: null,
    planIdPreview: null,

    categoryCandidates: null,
    categoriesAccepted: null,
    categoriesRejected: null,
    fetchLocationCategoryRequestId: null,

    createPlanFromLocationRequestStatus: null,
    createPlanFromPlaceRequestStatus: null,
    createPlanByCategoryRequestStatus: null,
    createPlanFromSavedPlanRequestStatus: null,
    savePlanFromCandidateRequestStatus: null,
    updatePlacesOrderInPlanCandidateRequestStatus: null,
    updateLikeAtPlaceInPlanCandidateRequestStatus: null,
    autoReorderPlacesInPlanCandidateRequestStatus: null,
    fetchCachedCreatedPlansRequestStatus: null,
    fetchAvailablePlacesForPlanRequestStatus: null,
    fetchNearbyPlaceCategoriesRequestStatus: null,
};

type CreatePlanFromCurrentLocationProps = {
    location: {
        latitude: number;
        longitude: number;
    };
    googlePlaceId?: string;
};
export const createPlanFromLocation = createAsyncThunk(
    "planCandidate/createPlanFromCurrentLocation",
    async (
        { location, googlePlaceId }: CreatePlanFromCurrentLocationProps,
        { dispatch, getState }
    ) => {
        logEvent(getAnalytics(), AnalyticsEvents.CreatePlan.Create);

        const plannerApi: PlannerApi = new PlannerGraphQlApi();

        const { createPlanSession, categoriesAccepted, categoriesRejected } = (
            getState() as RootState
        ).planCandidate;

        const { currentLocation } = (getState() as RootState).location;
        const isCurrentLocation =
            currentLocation?.latitude === location.latitude &&
            currentLocation?.longitude === location.longitude;

        const response = await plannerApi.createPlansFromLocation({
            session: createPlanSession,
            location: location,
            googlePlaceId,
            categoriesPreferred: (categoriesAccepted ?? []).map(
                (category) => category.name
            ),
            categoriesDisliked: (categoriesRejected ?? []).map(
                (category) => category.name
            ),
            basedOnCurrentLocation: isCurrentLocation,
        });

        const session = response.session;
        const plans: Plan[] = response.plans.map((planEntity) =>
            createPlanFromPlanEntity(planEntity)
        );
        dispatch(
            setCreatedPlans({
                session,
                plans,
                createdBasedOnCurrentLocation: isCurrentLocation,
            })
        );
    }
);

type CreatePlanFromPlaceProps = {
    placeId: string;
    createPlanSessionId: string;
};
export const createPlanFromPlace = createAsyncThunk(
    "planCandidate/createPlanFromPlace",
    async ({ placeId, createPlanSessionId }: CreatePlanFromPlaceProps) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const { plan } = await plannerApi.createPlanFromPlace({
            placeId,
            createPlanSessionId,
        });
        return {
            plan: createPlanFromPlanEntity(plan),
        };
    }
);

type CreatePlanByCategoryProps = {
    categoryId: string,
    location: GeoLocation,
    rangeInKm: number,
};
export const createPlanByCategory = createAsyncThunk(
  'planCandidate/createPlanByCategory',
  async ({categoryId, location, rangeInKm}: CreatePlanByCategoryProps) => {
    logEvent(getAnalytics(), AnalyticsEvents.CreatePlan.Create, {
        categoryId,
    });

    const plannerApi: PlannerApi = new PlannerGraphQlApi();
    const response = await plannerApi.createPlanByCategory({
        categoryId,
        location,
        rangeInKm,
    });

    return {
        planCandidateSetId: response.planCandidateSetId,
        plans: response.plans.map((plan) => createPlanFromPlanEntity(plan)),
    };
  }
)

type CreatePlanFromSavedPlanProps = {
    userId: string | null;
    firebaseIdToken: string | null;
    planId: string;
};
export const createPlanFromSavedPlan = createAsyncThunk(
    "planCandidate/createPlanFromSavedPlan",
    async ({
        userId,
        firebaseIdToken,
        planId,
    }: CreatePlanFromSavedPlanProps) => {
        logEvent(getAnalytics(), AnalyticsEvents.CreatePlan.FromSavedPlan);

        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const { plans, planCandidateSetId, likedPlaceIds } =
            await plannerApi.createPlanCandidateSetFromSavedPlan({
                userId,
                firebaseIdToken,
                planId,
            });

        return {
            planCandidateSetId,
            plans: plans.map((p) => createPlanFromPlanEntity(p)),
            likedPlaceIds,
        };
    }
);

type FetchCachedCreatedPlansProps = {
    session: string;
    userId: string | null;
    firebaseIdToken: string | null;
};
export const fetchCachedCreatedPlans = createAsyncThunk(
    "planCandidate/fetchCachedCreatedPlans",
    async ({
        session,
        userId,
        firebaseIdToken,
    }: FetchCachedCreatedPlansProps) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.fetchCachedCreatedPlans({
            planCandidateId: session,
            userId,
            firebaseIdToken,
        });
        if (response.plans === null) {
            return {
                session,
                plans: null,
                createdBasedOnCurrentLocation: null,
                likedPlaceIds: response.likedPlaceIds,
            };
        }

        const plans: Plan[] = response.plans.map((p) =>
            createPlanFromPlanEntity(p)
        );
        return {
            session,
            plans,
            createdBasedOnCurrentLocation:
                response.createdBasedOnCurrentLocation,
            likedPlaceIds: response.likedPlaceIds,
        };
    }
);

type FetchAvailablePlacesForPlanProps = { session: string };
export const fetchAvailablePlacesForPlan = createAsyncThunk(
    "planCandidate/fetchAvailablePlacesForPlan",
    async ({ session }: FetchAvailablePlacesForPlanProps) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.fetchAvailablePlacesForPlan({
            session,
        });
        return {
            places: response.places.map((place) =>
                createPlaceFromPlaceEntity(place)
            ),
        };
    }
);

type FetchNearbyPlaceCategoriesProps = {
    requestId: string;
    location: {
        latitude: number;
        longitude: number;
    };
};
export const fetchNearbyPlaceCategories = createAsyncThunk(
    "planCandidate/fetchNearbyPlaceCategories",
    async ({ location, requestId }: FetchNearbyPlaceCategoriesProps) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.fetchNearbyPlaceCategories({
            location,
        });
        const categriesWithPlace: LocationCategoryWithPlace[] =
            response.categories.map((category) => ({
                name: category.name,
                displayName: category.displayName,
                thumbnail: category.photo,
                defaultThumbnailUrl: category.defaultPhotoUrl,
                places: category.places.map((place) =>
                    createPlaceFromPlaceEntity(place)
                ),
            }));
        return {
            requestId,
            planCandidateId: response.session,
            categories: categriesWithPlace,
        };
    }
);

type SavePlanFromCandidateProps = {
    session: string;
    planId: string;
    authToken?: string;
};
export const savePlanFromCandidate = createAsyncThunk(
    "planCandidate/savePlanFromCandidate",
    async ({ session, planId, authToken }: SavePlanFromCandidateProps) => {
        logEvent(getAnalytics(), AnalyticsEvents.SavePlan);
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.savePlanFromCandidate({
            session,
            planId,
            authToken,
        });

        // TODO: プランの内容を全件取得する
        // TODO: プラン作成のReduxとプラン閲覧のReduxを分ける
        // TODO: プラン閲覧のReduxにプランのIDとプランの内容を保存する
        return response.planId;
    }
);

type UpdatePlacesOrderInPlanCandidateProps = {
    planCandidateSetId: string;
    planId: string;
    placeIds: string[];
};
export const updatePlacesOrderInPlanCandidate = createAsyncThunk(
    "planCandidate/updatePlacesOrderInPlanCandidate",
    async (
        {
            planCandidateSetId,
            planId,
            placeIds,
        }: UpdatePlacesOrderInPlanCandidateProps,
        { dispatch }
    ) => {
        // Previewの内容は先に書き換える
        dispatch(reorderPlacesInPreview({ placeIds }));

        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.updatePlanCandidatePlacesOrder({
            planCandidateSetId,
            planId,
            placeIds,
        });
        return {
            plan: createPlanFromPlanEntity(response.plan),
        };
    }
);

type UpdateLikeAtPlaceInPlanCandidateProps = {
    planCandidateId: string;
    placeId: string;
    like: boolean;
    userId: string | null;
    firebaseIdToken: string | null;
};
export const updateLikeAtPlaceInPlanCandidate = createAsyncThunk(
    "planCandidate/updateLikeAtPlaceInPlanCandidate",
    async ({
        planCandidateId,
        placeId,
        like,
        userId,
        firebaseIdToken,
    }: UpdateLikeAtPlaceInPlanCandidateProps) => {
        logEvent(getAnalytics(), AnalyticsEvents.EditPlan.Like, {
            like,
        });
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const { plans, likedPlaceIds } =
            await plannerApi.updateLikeAtPlaceInPlanCandidate({
                planCandidateId,
                placeId,
                like,
                userId,
                firebaseIdToken,
            });
        return {
            likedPlaceIds,
            plans: plans.map((plan) => createPlanFromPlanEntity(plan)),
        };
    }
);

type AutoReorderPlacesInPlanCandidateProps = {
    planCandidateId: string;
    planId: string;
};
export const autoReorderPlacesInPlanCandidate = createAsyncThunk(
    "planCandidate/autoReorderPlacesInPlanCandidate",
    async ({
        planCandidateId,
        planId,
    }: AutoReorderPlacesInPlanCandidateProps) => {
        logEvent(getAnalytics(), AnalyticsEvents.EditPlan.AutoReorder);
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.autoReorderPlacesInPlanCandidate({
            planCandidateId,
            planId,
        });
        return {
            plan: createPlanFromPlanEntity(response.plan),
        };
    }
);

export const slice = createSlice({
    name: "planCandidate",
    initialState,
    reducers: {
        setCreatedPlans: (
            state,
            {
                payload,
            }: PayloadAction<{
                session: string | null;
                plans: Plan[] | null;
                createdBasedOnCurrentLocation: boolean;
            }>
        ) => {
            state.createPlanSession = payload.session;
            state.plansCreated = payload.plans;
            state.createdBasedOnCurrentLocation =
                payload.createdBasedOnCurrentLocation;
            state.likedPlaceIds = [];
        },
        updatePreviewPlanId: (
            state,
            { payload }: PayloadAction<{ planId: string }>
        ) => {
            // TODO: updatePreviewPlanId みたいな名前にする
            if (!state.plansCreated) return;
            state.planIdPreview = payload.planId;
        },

        updatePlanOfPlanCandidate: (
            state,
            { payload }: PayloadAction<{ plan: Plan }>
        ) => {
            if (!state.plansCreated) return;
            const planIndexToUpdate = state.plansCreated.findIndex(
                (plan) => plan.id === payload.plan.id
            );
            if (planIndexToUpdate < 0) return;

            state.plansCreated[planIndexToUpdate] = payload.plan;
        },

        pushAcceptedCategory: (
            state,
            { payload }: PayloadAction<{ category: LocationCategory }>
        ) => {
            if (!state.categoriesAccepted) state.categoriesAccepted = [];
            state.categoriesAccepted.push(payload.category);
            state.categoryCandidates = state.categoryCandidates.filter(
                (category) => category.name != payload.category.name
            );
        },
        pushRejectedCategory: (
            state,
            { payload }: PayloadAction<{ category: LocationCategory }>
        ) => {
            if (!state.categoriesRejected) state.categoriesRejected = [];
            state.categoriesRejected.push(payload.category);
            state.categoryCandidates = state.categoryCandidates.filter(
                (category) => category.name != payload.category.name
            );
        },

        resetInterest: (state) => {
            state.categoryCandidates = null;
            state.categoriesRejected = null;
            state.categoriesAccepted = null;
            state.fetchLocationCategoryRequestId = null;
        },

        resetPlanCandidates: (state) => {
            state.createPlanSession = null;
            state.createdBasedOnCurrentLocation = null;
            state.plansCreated = null;
            state.placesAvailableForPlan = null;
            state.likedPlaceIds = null;

            state.planIdPreview = null;

            state.categoryCandidates = null;
            state.categoriesRejected = null;
            state.categoriesAccepted = null;

            state.savePlanFromCandidateRequestStatus = null;
            state.updatePlacesOrderInPlanCandidateRequestStatus = null;
        },

        resetCreatePlanFromLocationRequestStatus: (state) => {
            state.createPlanFromLocationRequestStatus = null;
        },

        resetCreatePlanFromPlaceRequestStatus: (state) => {
            state.createPlanFromPlaceRequestStatus = null;
        },

        resetCreatePlanFromSavedPlanRequestStatus: (state) => {
            state.createPlanFromSavedPlanRequestStatus = null;
        },

        resetAutoReorderPlacesInPlanCandidateRequestStatus: (state) => {
            state.autoReorderPlacesInPlanCandidateRequestStatus = null;
        },

        reorderPlacesInPreview: (
            state,
            { payload }: PayloadAction<{ placeIds: string[] }>
        ) => {
            if (!state.planIdPreview || !state.plansCreated) return;

            const planIndexToUpdate = state.plansCreated.findIndex(
                (plan) => plan.id === state.planIdPreview
            );
            if (planIndexToUpdate < 0) return;

            const isContainsAllPlacesIds = state.plansCreated[
                planIndexToUpdate
            ].places.some((place) => !payload.placeIds.includes(place.id));
            if (isContainsAllPlacesIds) return;

            state.plansCreated[planIndexToUpdate].places = payload.placeIds.map(
                (placeId) =>
                    state.plansCreated[planIndexToUpdate].places.find(
                        (place) => place.id === placeId
                    )
            );
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Plan From Location
            .addCase(createPlanFromLocation.pending, (state) => {
                state.createPlanFromLocationRequestStatus =
                    RequestStatuses.PENDING;
            })
            .addCase(createPlanFromLocation.fulfilled, (state) => {
                state.createPlanFromLocationRequestStatus =
                    RequestStatuses.FULFILLED;
            })
            .addCase(createPlanFromLocation.rejected, (state) => {
                state.createPlanFromLocationRequestStatus =
                    RequestStatuses.REJECTED;
            })
            // Create Plan From Place
            .addCase(createPlanFromPlace.pending, (state, action) => {
                state.createPlanFromPlaceRequestStatus =
                    RequestStatuses.PENDING;
            })
            .addCase(
                createPlanFromPlace.fulfilled,
                (state, { payload: { plan } }) => {
                    state.createPlanFromPlaceRequestStatus =
                        RequestStatuses.FULFILLED;
                    if (!state.plansCreated) {
                        state.plansCreated = [];
                    }
                    state.plansCreated.push(plan);
                }
            )
            .addCase(createPlanFromPlace.rejected, (state, action) => {
                state.createPlanFromPlaceRequestStatus =
                    RequestStatuses.REJECTED;
            })
            // Create Plan By Category
            .addCase(createPlanByCategory.pending, (state, action) => {
                state.createPlanByCategoryRequestStatus = RequestStatuses.PENDING;
            })
            .addCase(createPlanByCategory.fulfilled, (state, {payload}) => {
                state.createPlanByCategoryRequestStatus = RequestStatuses.FULFILLED;
                state.createPlanSession = payload.planCandidateSetId;
                state.plansCreated = payload.plans;
            })
            .addCase(createPlanByCategory.rejected, (state, action) => {
                state.createPlanByCategoryRequestStatus = RequestStatuses.REJECTED;
            })
            // Create Plan From Saved Plan
            .addCase(createPlanFromSavedPlan.pending, (state) => {
                state.createPlanFromSavedPlanRequestStatus =
                    RequestStatuses.PENDING;
            })
            .addCase(
                createPlanFromSavedPlan.fulfilled,
                (state, { payload }) => {
                    state.createPlanFromSavedPlanRequestStatus =
                        RequestStatuses.FULFILLED;

                    state.createPlanSession = payload.planCandidateSetId;
                    state.plansCreated = payload.plans;
                    state.likedPlaceIds = payload.likedPlaceIds;
                }
            )
            .addCase(createPlanFromSavedPlan.rejected, (state) => {
                state.createPlanFromSavedPlanRequestStatus =
                    RequestStatuses.REJECTED;
            })
            // Save Plan From Candidate
            .addCase(savePlanFromCandidate.pending, (state) => {
                state.savePlanFromCandidateRequestStatus =
                    RequestStatuses.PENDING;
            })
            .addCase(savePlanFromCandidate.rejected, (state) => {
                state.savePlanFromCandidateRequestStatus =
                    RequestStatuses.REJECTED;
            })
            .addCase(savePlanFromCandidate.fulfilled, (state) => {
                state.savePlanFromCandidateRequestStatus =
                    RequestStatuses.FULFILLED;
            })
            // Update Places Order In Plan Candidate
            .addCase(updatePlacesOrderInPlanCandidate.pending, (state) => {
                state.updatePlacesOrderInPlanCandidateRequestStatus =
                    RequestStatuses.PENDING;
            })
            .addCase(updatePlacesOrderInPlanCandidate.rejected, (state) => {
                state.updatePlacesOrderInPlanCandidateRequestStatus =
                    RequestStatuses.REJECTED;
            })
            .addCase(
                updatePlacesOrderInPlanCandidate.fulfilled,
                (state, { payload }) => {
                    state.updatePlacesOrderInPlanCandidateRequestStatus =
                        RequestStatuses.FULFILLED;

                    if (state.plansCreated === null) return;

                    const planIndexToUpdate = state.plansCreated.findIndex(
                        (plan) => plan.id === payload.plan.id
                    );
                    if (planIndexToUpdate < 0) return;

                    state.plansCreated[planIndexToUpdate] = payload.plan;
                }
            )
            .addCase(autoReorderPlacesInPlanCandidate.pending, (state) => {
                state.autoReorderPlacesInPlanCandidateRequestStatus =
                    RequestStatuses.PENDING;
            })
            .addCase(autoReorderPlacesInPlanCandidate.rejected, (state) => {
                state.autoReorderPlacesInPlanCandidateRequestStatus =
                    RequestStatuses.REJECTED;
            })
            .addCase(
                autoReorderPlacesInPlanCandidate.fulfilled,
                (state, { payload }) => {
                    state.autoReorderPlacesInPlanCandidateRequestStatus =
                        RequestStatuses.FULFILLED;

                    if (state.plansCreated === null) return;

                    const planIndexToUpdate = state.plansCreated.findIndex(
                        (plan) => plan.id === payload.plan.id
                    );
                    if (planIndexToUpdate < 0) return;

                    state.plansCreated[planIndexToUpdate] = payload.plan;
                }
            )
            // Update Like At Place In Plan Candidate
            .addCase(
                updateLikeAtPlaceInPlanCandidate.pending,
                (state, action) => {
                    state.updateLikeAtPlaceInPlanCandidateRequestStatus =
                        RequestStatuses.PENDING;
                }
            )
            .addCase(
                updateLikeAtPlaceInPlanCandidate.fulfilled,
                (state, { payload: { plans, likedPlaceIds } }) => {
                    state.updateLikeAtPlaceInPlanCandidateRequestStatus =
                        RequestStatuses.FULFILLED;
                    state.plansCreated = plans;
                    state.likedPlaceIds = likedPlaceIds;
                }
            )
            .addCase(
                updateLikeAtPlaceInPlanCandidate.rejected,
                (state, action) => {
                    state.updateLikeAtPlaceInPlanCandidateRequestStatus =
                        RequestStatuses.REJECTED;
                }
            )
            // Fetch Cached Created Plans
            .addCase(fetchCachedCreatedPlans.pending, (state, action) => {
                state.fetchCachedCreatedPlansRequestStatus =
                    RequestStatuses.PENDING;
            })
            .addCase(
                fetchCachedCreatedPlans.fulfilled,
                (state, { payload }) => {
                    if (!payload) return;
                    state.createPlanSession = payload.session;
                    state.plansCreated = payload.plans;
                    state.likedPlaceIds = payload.likedPlaceIds;
                    state.createdBasedOnCurrentLocation =
                        payload.createdBasedOnCurrentLocation;

                    state.fetchCachedCreatedPlansRequestStatus =
                        RequestStatuses.FULFILLED;
                }
            )
            .addCase(fetchCachedCreatedPlans.rejected, (state, action) => {
                state.fetchCachedCreatedPlansRequestStatus =
                    RequestStatuses.REJECTED;
            })
            // Fetch Available Places For Plan
            .addCase(fetchAvailablePlacesForPlan.pending, (state, action) => {
                state.fetchAvailablePlacesForPlanRequestStatus =
                    RequestStatuses.PENDING;
            })
            .addCase(
                fetchAvailablePlacesForPlan.fulfilled,
                (state, { payload: { places } }) => {
                    state.fetchAvailablePlacesForPlanRequestStatus =
                        RequestStatuses.FULFILLED;
                    state.placesAvailableForPlan = places;
                }
            )
            .addCase(fetchAvailablePlacesForPlan.rejected, (state, action) => {
                state.fetchAvailablePlacesForPlanRequestStatus =
                    RequestStatuses.REJECTED;
            })
            // Fetch Nearby Place Categories
            .addCase(fetchNearbyPlaceCategories.pending, (state) => {
                state.fetchNearbyPlaceCategoriesRequestStatus =
                    RequestStatuses.PENDING;
            })
            .addCase(
                fetchNearbyPlaceCategories.fulfilled,
                (state, { payload }) => {
                    state.fetchNearbyPlaceCategoriesRequestStatus =
                        RequestStatuses.FULFILLED;

                    state.categoryCandidates = payload.categories;
                    state.categoriesAccepted = [];
                    state.categoriesRejected = [];
                    state.fetchLocationCategoryRequestId = payload.requestId;

                    state.createPlanSession = payload.planCandidateId;
                }
            )
            .addCase(fetchNearbyPlaceCategories.rejected, (state) => {
                state.fetchNearbyPlaceCategoriesRequestStatus =
                    RequestStatuses.REJECTED;
            });
    },
});

export const {
    updatePreviewPlanId,

    setCreatedPlans,
    updatePlanOfPlanCandidate,

    pushAcceptedCategory,
    pushRejectedCategory,

    resetInterest,
    resetPlanCandidates,
    resetCreatePlanFromLocationRequestStatus,
    resetCreatePlanFromPlaceRequestStatus,
    resetCreatePlanFromSavedPlanRequestStatus,
    resetAutoReorderPlacesInPlanCandidateRequestStatus,
} = slice.actions;

const { reorderPlacesInPreview } = slice.actions;

export const reduxPlanCandidateSelector = () => {
    const planCandidateState = useSelector(
        (state: RootState) => state.planCandidate
    );

    const planCandidatePreview = planCandidateState.plansCreated?.find(
        (plan) => plan.id === planCandidateState.planIdPreview
    );

    return {
        ...planCandidateState,
        preview: planCandidatePreview,
    };
};

export const planCandidateReducer = slice.reducer;
