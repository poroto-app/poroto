import { getAnalytics, logEvent } from "@firebase/analytics";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { LocationCategory } from "src/domain/models/LocationCategory";
import { Place } from "src/domain/models/Place";
import { Plan } from "src/domain/models/Plan";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import {
    createPlaceFromPlaceEntity,
    createPlanFromPlanEntity,
    PlannerApi,
} from "src/domain/plan/PlannerApi";
import { RootState } from "src/redux/redux";

export type PlanCandidateState = {
    createPlanSession: string | null;
    createdBasedOnCurrentLocation: boolean | null;
    plansCreated: Plan[] | null;
    placesAvailableForPlan: Place[] | null;

    // TODO: 取得中か存在しないのかを見分けられるようにする
    //  （画面に大きく依存するもののため、専用のsliceを作成する）
    preview: Plan | null;

    categoryCandidates: LocationCategory[] | null;
    categoriesAccepted: LocationCategory[] | null;
    categoriesRejected: LocationCategory[] | null;
    // 直前に発火したリクエストの結果と、新しく行ったリクエストの結果を区別できるようにするために利用する
    fetchLocationCategoryRequestId: string | null;

    timeForPlan: number | null;

    createPlanFromLocationRequestStatus: RequestStatus | null;
    createPlanFromPlaceRequestStatus: RequestStatus | null;
    savePlanFromCandidateRequestStatus: RequestStatus | null;
    updatePlacesOrderInPlanCandidateRequestStatus: RequestStatus | null;
    fetchAvailablePlacesForPlanRequestStatus: RequestStatus | null;
    matchInterestRequestStatus: RequestStatus | null;
};

const initialState: PlanCandidateState = {
    createPlanSession: null,
    createdBasedOnCurrentLocation: null,
    plansCreated: null,
    placesAvailableForPlan: null,
    preview: null,

    categoryCandidates: null,
    categoriesAccepted: null,
    categoriesRejected: null,
    fetchLocationCategoryRequestId: null,

    timeForPlan: null,

    createPlanFromLocationRequestStatus: null,
    createPlanFromPlaceRequestStatus: null,
    savePlanFromCandidateRequestStatus: null,
    updatePlacesOrderInPlanCandidateRequestStatus: null,
    fetchAvailablePlacesForPlanRequestStatus: null,
    matchInterestRequestStatus: null,
};

type CreatePlanFromCurrentLocationProps = {
    location: {
        latitude: number;
        longitude: number;
    };
};
export const createPlanFromLocation = createAsyncThunk(
    "planCandidate/createPlanFromCurrentLocation",
    async (
        { location }: CreatePlanFromCurrentLocationProps,
        { dispatch, getState }
    ) => {
        logEvent(getAnalytics(), "create_plan");

        const plannerApi: PlannerApi = new PlannerGraphQlApi();

        const {
            createPlanSession,
            categoriesAccepted,
            categoriesRejected,
            timeForPlan,
        } = (getState() as RootState).planCandidate;

        const { currentLocation } = (getState() as RootState).location;
        const isCurrentLocation =
            currentLocation?.latitude === location.latitude &&
            currentLocation?.longitude === location.longitude;

        const response = await plannerApi.createPlansFromLocation({
            session: createPlanSession,
            location: location,
            categoriesPreferred: (categoriesAccepted ?? []).map(
                (category) => category.name
            ),
            categoriesDisliked: (categoriesRejected ?? []).map(
                (category) => category.name
            ),
            planDuration: timeForPlan,
            basedOnCurrentLocation: isCurrentLocation,
        });

        const session = response.session;
        const plans: Plan[] = response.plans.map(createPlanFromPlanEntity);
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

type FetchCachedCreatedPlansProps = { session: string };
export const fetchCachedCreatedPlans = createAsyncThunk(
    "planCandidate/fetchCachedCreatedPlans",
    async (
        { session }: FetchCachedCreatedPlansProps,
        { dispatch, getState }
    ) => {
        // すでに取得している場合はスキップ
        const { createPlanSession } = (getState() as RootState).planCandidate;
        if (createPlanSession && session === createPlanSession) return null;

        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.fetchCachedCreatedPlans({ session });
        if (response.plans === null) {
            dispatch(
                setCreatedPlans({
                    session,
                    plans: null,
                    createdBasedOnCurrentLocation: null,
                })
            );
            return;
        }

        const plans: Plan[] = response.plans.map(createPlanFromPlanEntity);
        dispatch(
            setCreatedPlans({
                session,
                plans,
                createdBasedOnCurrentLocation:
                    response.createdBasedOnCurrentLocation,
            })
        );
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

type MatchInterestProps = {
    requestId: string;
    location: {
        latitude: number;
        longitude: number;
    };
};
export const matchInterest = createAsyncThunk(
    "planCandidate/matchInterest",
    async ({ location, requestId }: MatchInterestProps) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.matchInterest({ location });
        return {
            requestId,
            createPlanSession: response.session,
            categories: response.categories.map((category) => ({
                name: category.name,
                displayName: category.displayName,
                thumbnail: category.photo,
                defaultThumbnailUrl: category.defaultPhotoUrl,
            })),
        };
    }
);

type SavePlanFromCandidateProps = {
    session: string;
    planId: string;
};
export const savePlanFromCandidate = createAsyncThunk(
    "planCandidate/savePlanFromCandidate",
    async ({ session, planId }: SavePlanFromCandidateProps) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.savePlanFromCandidate({
            session,
            planId,
        });

        // TODO: プランの内容を全件取得する
        // TODO: プラン作成のReduxとプラン閲覧のReduxを分ける
        // TODO: プラン閲覧のReduxにプランのIDとプランの内容を保存する
        return response.planId;
    }
);

type UpdatePlacesOrderInPlanCandidateProps = {
    session: string;
    planId: string;
    placeIds: string[];
};
export const updatePlacesOrderInPlanCandidate = createAsyncThunk(
    "planCandidate/updatePlacesOrderInPlanCandidate",
    async (
        { session, planId, placeIds }: UpdatePlacesOrderInPlanCandidateProps,
        { dispatch }
    ) => {
        // Previewの内容は先に書き換える
        dispatch(reorderPlacesInPreview({ placeIds }));

        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.updatePlanCandidatePlacesOrder({
            session,
            planId,
            placeIds,
        });
        return {
            plan: createPlanFromPlanEntity(response.plan),
        };
    }
);

export const slice = createSlice({
    name: "plan",
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
        },
        fetchPlanDetail: (
            state,
            { payload }: PayloadAction<{ planId: string }>
        ) => {
            if (!state.plansCreated) return;
            state.preview = state.plansCreated.find(
                (plan) => plan.id === payload.planId
            );
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

        setTimeForPlan: (
            state,
            { payload }: PayloadAction<{ time: number | null }>
        ) => {
            state.timeForPlan = payload.time;
        },

        resetInterest: (state) => {
            state.timeForPlan = null;
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

            state.preview = null;

            state.categoryCandidates = null;
            state.categoriesRejected = null;
            state.categoriesAccepted = null;

            state.timeForPlan = null;
            state.savePlanFromCandidateRequestStatus = null;
            state.updatePlacesOrderInPlanCandidateRequestStatus = null;
        },

        resetCreatePlanFromLocationRequestStatus: (state) => {
            state.createPlanFromLocationRequestStatus = null;
        },

        resetCreatePlanFromPlaceRequestStatus: (state) => {
            state.createPlanFromPlaceRequestStatus = null;
        },

        reorderPlacesInPreview: (
            state,
            { payload }: PayloadAction<{ placeIds: string[] }>
        ) => {
            if (!state.preview) return;

            const isContainsAllPlacesIds = state.preview.places.some(
                (place) => !payload.placeIds.includes(place.id)
            );
            if (isContainsAllPlacesIds) return;

            state.preview.places = payload.placeIds.map((placeId) =>
                state.preview.places.find((place) => place.id === placeId)
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
            // Match Interest
            .addCase(matchInterest.pending, (state) => {
                state.matchInterestRequestStatus = RequestStatuses.PENDING;
            })
            .addCase(matchInterest.fulfilled, (state, { payload }) => {
                state.matchInterestRequestStatus = RequestStatuses.FULFILLED;

                state.categoryCandidates = payload.categories;
                state.categoriesAccepted = [];
                state.categoriesRejected = [];
                state.fetchLocationCategoryRequestId = payload.requestId;

                state.createPlanSession = payload.createPlanSession;
            })
            .addCase(matchInterest.rejected, (state) => {
                state.matchInterestRequestStatus = RequestStatuses.REJECTED;
            });
    },
});

export const {
    fetchPlanDetail,

    setCreatedPlans,

    pushAcceptedCategory,
    pushRejectedCategory,

    setTimeForPlan,

    resetInterest,
    resetPlanCandidates,
    resetCreatePlanFromLocationRequestStatus,
    resetCreatePlanFromPlaceRequestStatus,
} = slice.actions;

const { reorderPlacesInPreview } = slice.actions;

export const reduxPlanCandidateSelector = () =>
    useSelector((state: RootState) => state.planCandidate);

export const planCandidateReducer = slice.reducer;
