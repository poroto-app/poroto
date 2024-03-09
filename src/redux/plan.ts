import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { createPlanFromPlanEntity } from "src/domain/factory/Plan";
import { GeoLocation } from "src/domain/models/GeoLocation";
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

    plansByUser: Plan[] | null;

    preview: Plan | null;
    likePlaceIds: string[];

    // プラン完成時に表示されるモーダルの表示フラグ
    showPlanCreatedModal: boolean;

    fetchPlansRecentlyCreatedRequestStatus: RequestStatus | null;
    fetchNearbyPlansRequestStatus: RequestStatus | null;
    fetchPlanRequestStatus: RequestStatus | null;
    fetchPlansByUserRequestStatus: RequestStatus | null;
    updatePlaceLikeInPlanRequestStatus: RequestStatus | null;
};

const initialState: PlanState = {
    plansRecentlyCreated: null,
    nextPageTokenPlansRecentlyCreated: null,

    plansNearby: null,
    nextPageTokenPlansNearby: null,

    plansByUser: null,

    preview: null,
    likePlaceIds: [],

    showPlanCreatedModal: false,

    fetchPlansRecentlyCreatedRequestStatus: null,
    fetchNearbyPlansRequestStatus: null,
    fetchPlanRequestStatus: null,
    fetchPlansByUserRequestStatus: null,
    updatePlaceLikeInPlanRequestStatus: null,
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

type FetchPlanProps = {
    planId: string;
    userId: string | null;
    firebaseIdToken: string | null;
};
export const fetchPlan = createAsyncThunk(
    "plan/fetchPlan",
    async ({ planId, userId, firebaseIdToken }: FetchPlanProps) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.fetchPlan({
            planId,
            userId,
            firebaseIdToken,
        });
        // TODO: ユーザー情報を取得する
        return {
            plan: response.plan
                ? createPlanFromPlanEntity(response.plan)
                : null,
            likedPlaceIds: response.likedPlaceIds,
        };
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

type UpdatePlaceLikeInPlanProps = {
    userId: string;
    firebaseIdToken: string;
    planId: string;
    placeId: string;
    like: boolean;
};
export const updatePlaceLikeInPlan = createAsyncThunk(
    "plan/updatePlaceLikeInPlan",
    async ({
        userId,
        firebaseIdToken,
        planId,
        placeId,
        like,
    }: UpdatePlaceLikeInPlanProps) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.updateLikeOfPlaceInPlan({
            userId,
            firebaseIdToken,
            planId,
            placeId,
            like,
        });
        return {
            plan: createPlanFromPlanEntity(response.plan),
            likePlaceIds: response.likePlaceIds,
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
                state.preview = payload.plan;
                state.likePlaceIds = payload.likedPlaceIds;
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
            // Update Place Like In Plan
            .addCase(updatePlaceLikeInPlan.pending, (state) => {
                state.updatePlaceLikeInPlanRequestStatus =
                    RequestStatuses.PENDING;
            })
            .addCase(updatePlaceLikeInPlan.fulfilled, (state, { payload }) => {
                state.updatePlaceLikeInPlanRequestStatus =
                    RequestStatuses.FULFILLED;
                state.preview = payload.plan;
                state.likePlaceIds = payload.likePlaceIds;
            })
            .addCase(updatePlaceLikeInPlan.rejected, (state) => {
                state.updatePlaceLikeInPlanRequestStatus =
                    RequestStatuses.REJECTED;
            });
    },
});

export const {
    pushPlansRecentlyCreated,
    setShowPlanCreatedModal,
    resetPlansByUser,
} = slice.actions;

export const reduxPlanSelector = () =>
    useSelector((state: RootState) => state.plan);

export const planReducer = slice.reducer;
