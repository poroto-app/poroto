import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { createPlaceFromPlaceEntity } from "src/domain/factory/Place";
import { createPlanFromPlanEntity } from "src/domain/factory/Plan";
import { GeoLocation } from "src/domain/models/GeoLocation";
import { Place } from "src/domain/models/Place";
import { Plan } from "src/domain/models/Plan";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { PlannerApi } from "src/domain/plan/PlannerApi";
import { RootState } from "src/redux/redux";

export type PlanState = {
    plansRecentlyCreated: Plan[] | null;
    nextPageTokenPlansRecentlyCreated: string | null;

    plansNearby: Plan[] | null;
    nextPageTokenPlansNearby: string | null;

    placesNearbyPlanLocation: Place[] | null;

    plansByUser: Plan[] | null;

    preview: Plan | null;

    placeIdToCreatePlan: string | null;

    // プラン完成時に表示されるモーダルの表示フラグ
    showPlanCreatedModal: boolean;

    fetchPlansRecentlyCreatedRequestStatus: RequestStatus | null;
    fetchNearbyPlansRequestStatus: RequestStatus | null;
    fetchPlanRequestStatus: RequestStatus | null;
    fetchPlansByUserRequestStatus: RequestStatus | null;
    fetchPlacesNearbyPlanLocationRequestStatus: RequestStatus | null;
};

const initialState: PlanState = {
    plansRecentlyCreated: null,
    nextPageTokenPlansRecentlyCreated: null,

    plansNearby: null,
    nextPageTokenPlansNearby: null,

    placesNearbyPlanLocation: null,

    plansByUser: null,

    preview: null,

    placeIdToCreatePlan: null,

    showPlanCreatedModal: false,

    fetchPlansRecentlyCreatedRequestStatus: null,
    fetchNearbyPlansRequestStatus: null,
    fetchPlanRequestStatus: null,
    fetchPlansByUserRequestStatus: null,
    fetchPlacesNearbyPlanLocationRequestStatus: null,
};

export const fetchPlansRecentlyCreated = createAsyncThunk<{
    plans: Plan[];
    nextPageToken: string | null;
} | null>("plan/fetchPlansRecentlyCreated", async (props, { getState }) => {
    const { plansRecentlyCreated, nextPageTokenPlansRecentlyCreated } = (
        getState() as RootState
    ).plan;

    // すでに取得している場合はスキップ
    if (
        plansRecentlyCreated &&
        plansRecentlyCreated.length > 0 &&
        nextPageTokenPlansRecentlyCreated === null
    ) {
        return null;
    }

    const plannerApi: PlannerApi = new PlannerGraphQlApi();
    const { plans, nextPageKey } = await plannerApi.fetchPlans({
        pageKey: nextPageTokenPlansRecentlyCreated,
    });

    return {
        plans: plans.map((plan) => createPlanFromPlanEntity(plan)),
        nextPageToken: nextPageKey,
    };
});

type FetchNearByPlans = { currentLocation: GeoLocation; limit: number };
export const fetchNearbyPlans = createAsyncThunk(
    "plan/fetchNearbyPlans",
    async ({ currentLocation, limit }: FetchNearByPlans, { getState }) => {
        const { nextPageTokenPlansNearby, plansNearby } = (
            getState() as RootState
        ).plan;

        // すでに取得している場合はスキップ
        if (plansNearby !== null && nextPageTokenPlansNearby === null) {
            return null;
        }

        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const { plans, pageKey } = await plannerApi.fetchPlansByLocation({
            location: currentLocation,
            pageKey: nextPageTokenPlansNearby,
            limit,
        });

        return {
            plans: plans.map((plan) => createPlanFromPlanEntity(plan)),
            nextPageToken: pageKey,
        };
    }
);

type FetchPlanProps = { planId: string };
export const fetchPlan = createAsyncThunk(
    "plan/fetchPlan",
    async ({ planId }: FetchPlanProps) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.fetchPlan({ planId });
        // TODO: ユーザー情報を取得する
        return response.plan ? createPlanFromPlanEntity(response.plan) : null;
    }
);

type FetchPlansByUserProps = {
    userId: string;
};
export const fetchPlansByUser = createAsyncThunk(
    "plan/fetchPlansByUser",
    async ({ userId }: FetchPlansByUserProps) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.fetchPlansByUser({ userId });
        return {
            plans: response.plans.map((planEntity) =>
                createPlanFromPlanEntity(planEntity)
            ),
        };
    }
);

type FetchPlacesNearbyPlanLocationProps = {
    planId: string;
    limit: number | null;
};
export const fetchPlacesNearbyPlanLocation = createAsyncThunk(
    "plan/fetchPlacesNearbyPlanLocation",
    async ({ planId, limit }: FetchPlacesNearbyPlanLocationProps) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.fetchPlacesNearbyPlanLocation({
            planId,
            limit,
        });
        return {
            places: response.places.map((place) =>
                createPlaceFromPlaceEntity(place)
            ),
        };
    }
);

export const slice = createSlice({
    name: "plan",
    initialState,
    reducers: {
        pushPlansRecentlyCreated: (
            state,
            {
                payload,
            }: PayloadAction<{
                plans: Plan[];
                nextPageTokenPlansRecentlyCreated: string | null;
            }>
        ) => {
            if (!state.plansRecentlyCreated) state.plansRecentlyCreated = [];
            state.plansRecentlyCreated.push(...payload.plans);
            state.nextPageTokenPlansRecentlyCreated =
                payload.nextPageTokenPlansRecentlyCreated;
        },
        setShowPlanCreatedModal: (
            state,
            { payload }: PayloadAction<boolean>
        ) => {
            state.showPlanCreatedModal = payload;
        },
        setPlaceIdToCreatePlan: (
            state,
            { payload }: PayloadAction<string | null>
        ) => {
            state.placeIdToCreatePlan = payload;
        },
        resetPlansByUser: (state) => {
            state.plansByUser = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Plan
            .addCase(fetchPlan.pending, (state) => {
                state.fetchPlanRequestStatus = RequestStatuses.PENDING;
            })
            .addCase(fetchPlan.fulfilled, (state, { payload }) => {
                state.preview = payload;
                state.fetchPlanRequestStatus = RequestStatuses.FULFILLED;
            })
            .addCase(fetchPlan.rejected, (state) => {
                state.fetchPlanRequestStatus = RequestStatuses.REJECTED;
            })
            // Fetch Plans By User
            .addCase(fetchPlansByUser.pending, (state) => {
                state.fetchPlansByUserRequestStatus = RequestStatuses.PENDING;
            })
            .addCase(fetchPlansByUser.fulfilled, (state, { payload }) => {
                state.fetchPlansByUserRequestStatus = RequestStatuses.FULFILLED;
                state.plansByUser = payload.plans;
            })
            .addCase(fetchPlansByUser.rejected, (state) => {
                state.fetchPlansByUserRequestStatus = RequestStatuses.REJECTED;
            })
            // Fetch Plans Recently Created
            .addCase(fetchPlansRecentlyCreated.pending, (state) => {
                state.fetchPlansRecentlyCreatedRequestStatus =
                    RequestStatuses.PENDING;
            })
            .addCase(
                fetchPlansRecentlyCreated.fulfilled,
                (state, { payload }) => {
                    state.fetchPlansRecentlyCreatedRequestStatus =
                        RequestStatuses.FULFILLED;
                    if (!payload) return;

                    if (!state.plansRecentlyCreated)
                        state.plansRecentlyCreated = [];

                    state.plansRecentlyCreated.push(...payload.plans);
                    state.nextPageTokenPlansRecentlyCreated =
                        payload.nextPageToken;
                }
            )
            .addCase(fetchPlansRecentlyCreated.rejected, (state) => {
                state.fetchPlansRecentlyCreatedRequestStatus =
                    RequestStatuses.REJECTED;
            })
            // Fetch Nearby Plans
            .addCase(fetchNearbyPlans.pending, (state, action) => {
                state.fetchNearbyPlansRequestStatus = RequestStatuses.PENDING;
            })
            .addCase(fetchNearbyPlans.fulfilled, (state, { payload }) => {
                state.fetchNearbyPlansRequestStatus = RequestStatuses.FULFILLED;
                if (!payload) return;

                if (state.plansNearby === null) state.plansNearby = [];
                state.plansNearby.push(...payload.plans);
                state.nextPageTokenPlansNearby = payload.nextPageToken;
            })
            .addCase(fetchNearbyPlans.rejected, (state, action) => {
                state.fetchNearbyPlansRequestStatus = RequestStatuses.REJECTED;
            })
            // Fetch Places Nearby Plan Location
            .addCase(fetchPlacesNearbyPlanLocation.pending, (state, action) => {
                state.fetchPlacesNearbyPlanLocationRequestStatus =
                    RequestStatuses.PENDING;
                state.placesNearbyPlanLocation = null;
            })
            .addCase(
                fetchPlacesNearbyPlanLocation.fulfilled,
                (state, { payload }) => {
                    state.fetchPlacesNearbyPlanLocationRequestStatus =
                        RequestStatuses.FULFILLED;
                    state.placesNearbyPlanLocation = payload.places;
                }
            )
            .addCase(
                fetchPlacesNearbyPlanLocation.rejected,
                (state, action) => {
                    state.fetchPlacesNearbyPlanLocationRequestStatus =
                        RequestStatuses.REJECTED;
                    state.placesNearbyPlanLocation = null;
                }
            );
    },
});

export const {
    pushPlansRecentlyCreated,
    setShowPlanCreatedModal,
    setPlaceIdToCreatePlan,
    resetPlansByUser,
} = slice.actions;

export const reduxPlanSelector = () =>
    useSelector((state: RootState) => state.plan);

export const planReducer = slice.reducer;
