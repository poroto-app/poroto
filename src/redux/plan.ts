import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { GeoLocation } from "src/domain/models/GeoLocation";
import { Plan } from "src/domain/models/Plan";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import {
    createPlanFromPlanEntity,
    PlannerApi,
} from "src/domain/plan/PlannerApi";
import { createUserFromEntity } from "src/domain/user/UserApi";
import { RootState } from "src/redux/redux";

export type PlanState = {
    plansRecentlyCreated: Plan[] | null;
    nextPageTokenPlansRecentlyCreated: string | null;

    plansNearby: Plan[] | null;
    plansNearbyRequestStatus: RequestStatus | null;
    nextPageTokenPlansNearby: string | null;

    plansByUser: Plan[] | null;

    preview: Plan | null;

    // プラン完成時に表示されるモーダルの表示フラグ
    showPlanCreatedModal: boolean;

    fetchPlanRequestStatus: RequestStatus | null;
    fetchPlansByUserRequestStatus: RequestStatus | null;
};

const initialState: PlanState = {
    plansRecentlyCreated: null,
    nextPageTokenPlansRecentlyCreated: null,

    plansNearby: null,
    plansNearbyRequestStatus: null,
    nextPageTokenPlansNearby: null,

    plansByUser: null,

    preview: null,

    showPlanCreatedModal: false,

    fetchPlanRequestStatus: null,
    fetchPlansByUserRequestStatus: null,
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

    // TODO: ユーザー情報を取得する
    return {
        plans: plans.map((plan) => createPlanFromPlanEntity(plan, null)),
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

        // TODO: ユーザー情報を取得する
        return {
            plans: plans.map((plan) => createPlanFromPlanEntity(plan, null)),
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
        return response.plan
            ? createPlanFromPlanEntity(response.plan, null)
            : null;
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
        const author = createUserFromEntity(response.author);
        return {
            plans: response.plans.map((planEntity) =>
                createPlanFromPlanEntity(planEntity, author)
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
            .addCase(
                fetchPlansRecentlyCreated.fulfilled,
                (state, { payload }) => {
                    if (!payload) return;

                    if (!state.plansRecentlyCreated)
                        state.plansRecentlyCreated = [];

                    state.plansRecentlyCreated.push(...payload.plans);
                    state.nextPageTokenPlansRecentlyCreated =
                        payload.nextPageToken;
                }
            )
            // Fetch Nearby Plans
            .addCase(fetchNearbyPlans.pending, (state) => {
                state.plansNearbyRequestStatus = RequestStatuses.PENDING;
            })
            .addCase(fetchNearbyPlans.fulfilled, (state, { payload }) => {
                state.plansNearbyRequestStatus = RequestStatuses.FULFILLED;
                if (!payload) return;

                if (state.plansNearby === null) state.plansNearby = [];
                state.plansNearby.push(...payload.plans);
                state.nextPageTokenPlansNearby = payload.nextPageToken;
            })
            .addCase(fetchNearbyPlans.rejected, (state) => {
                state.plansNearbyRequestStatus = RequestStatuses.REJECTED;
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
