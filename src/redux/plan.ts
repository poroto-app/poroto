import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { Plan } from "src/domain/models/Plan";
import {
    createPlanFromPlanEntity,
    PlannerApi,
} from "src/domain/plan/PlannerApi";
import { RootState } from "src/redux/redux";

export type PlanState = {
    plansRecentlyCreated: Plan[] | null;
    nextPageTokenPlansRecentlyCreated: string | null;

    preview: Plan | null;
};

const initialState: PlanState = {
    plansRecentlyCreated: null,
    nextPageTokenPlansRecentlyCreated: null,

    preview: null,
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

type FetchPlanProps = { planId: string };
export const fetchPlan = createAsyncThunk(
    "plan/fetchPlan",
    async ({ planId }: FetchPlanProps) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.fetchPlan({ planId });
        return response.plan ? createPlanFromPlanEntity(response.plan) : null;
    }
);

export const slice = createSlice({
    name: "Plan",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Plan
            .addCase(fetchPlan.fulfilled, (state, { payload }) => {
                state.preview = payload;
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
            );
    },
});

export const reduxPlanSelector = () =>
    useSelector((state: RootState) => state.plan);

export const planReducer = slice.reducer;
