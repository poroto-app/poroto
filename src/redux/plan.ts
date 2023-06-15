import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { LocationCategory } from "src/domain/models/LocationCategory";
import { Plan } from "src/domain/models/Plan";
import {
    createPlanFromPlanEntity,
    PlannerApi,
} from "src/domain/plan/PlannerApi";
import { RootState } from "src/redux/redux";
import { mockPlan } from "src/stories/mock/plan";

export type PlanState = {
    createPlanSession: string | null;
    createdBasedOnCurrentLocation: boolean | null;
    plansCreated: Plan[] | null;

    // TODO: `usePlanPreview`等でデータを二重管理しないようにする
    preview: Plan | null;

    categoryCandidates: LocationCategory[] | null;
    categoryAccepted: LocationCategory[] | null;
    categoryRejected: LocationCategory[] | null;

    timeForPlan: number | null;
};

const initialState: PlanState = {
    createPlanSession: null,
    createdBasedOnCurrentLocation: null,
    plansCreated: null,
    preview: null,

    categoryCandidates: null,
    categoryAccepted: null,
    categoryRejected: null,

    timeForPlan: null,
};

type CreatePlanFromCurrentLocationProps = {
    location: {
        latitude: number;
        longitude: number;
    };
    categories?: LocationCategory[];
    isCurrentLocation: boolean;
    timeForPlan?: number;
};
export const createPlanFromLocation = createAsyncThunk(
    "plan/createPlanFromCurrentLocation",
    async (
        {
            location,
            categories,
            isCurrentLocation,
            timeForPlan,
        }: CreatePlanFromCurrentLocationProps,
        { dispatch, getState }
    ) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();

        const response = await plannerApi.createPlansFromLocation({
            location: location,
            categories: (categories ?? []).map((category) => category.name),
            planDuration: timeForPlan,
            basedOnCurrentLocation: isCurrentLocation,
        });
        const session = response.session;
        const plans: Plan[] = createPlanFromPlanEntity(response.plans);
        dispatch(
            setCreatedPlans({
                session,
                plans,
                createdBasedOnCurrentLocation: isCurrentLocation,
            })
        );
    }
);

type FetchCachedCreatedPlansProps = { session: string };
export const fetchCachedCreatedPlans = createAsyncThunk(
    "plan/fetchCachedCreatedPlans",
    async (
        { session }: FetchCachedCreatedPlansProps,
        { dispatch, getState }
    ) => {
        // すでに取得している場合はスキップ
        const { createPlanSession } = (getState() as RootState).plan;
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

        const plans: Plan[] = createPlanFromPlanEntity(response.plans);
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

type MatchInterestProps = {
    location: {
        latitude: number;
        longitude: number;
    };
};
export const matchInterest = createAsyncThunk(
    "plan/matchInterest",
    async ({ location }: MatchInterestProps, { dispatch }) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.matchInterest({ location });
        dispatch(
            setCategoryCandidates({
                categories: response.categories.map((category) => ({
                    name: category.name,
                    displayName: category.displayName,
                    thumbnail: category.photo,
                })),
            })
        );
    }
);

type FetchPlanProps = { planId: string };
export const fetchPlan = createAsyncThunk(
    "plan/fetchPlan",
    async ({ planId }: FetchPlanProps) => {
        //   TODO: implement me!
        return {
            ...mockPlan,
            id: planId,
        };
    }
);

type SavePlanFromCandidateProps = {
    session: string;
    planId: string;
};
export const savePlanFromCandidate = createAsyncThunk(
    "plan/savePlanFromCandidate",
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

        setCategoryCandidates: (
            state,
            { payload }: PayloadAction<{ categories: LocationCategory[] }>
        ) => {
            state.categoryCandidates = payload.categories;
            state.categoryAccepted = [];
            state.categoryRejected = [];
        },
        pushAcceptedCategory: (
            state,
            { payload }: PayloadAction<{ category: LocationCategory }>
        ) => {
            if (!state.categoryAccepted) state.categoryAccepted = [];
            state.categoryAccepted.push(payload.category);
            state.categoryCandidates = state.categoryCandidates.filter(
                (category) => category.name != payload.category.name
            );
        },
        pushRejectedCategory: (
            state,
            { payload }: PayloadAction<{ category: LocationCategory }>
        ) => {
            if (!state.categoryRejected) state.categoryRejected = [];
            state.categoryRejected.push(payload.category);
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
            state.categoryRejected = null;
            state.categoryAccepted = null;
        },

        resetPlanCandidates: (state) => {
            state.plansCreated = null;
            state.createPlanSession = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Plan
            .addCase(fetchPlan.fulfilled, (state, { payload }) => {
                state.preview = payload;
            });
    },
});

export const {
    fetchPlanDetail,

    setCreatedPlans,

    setCategoryCandidates,
    pushAcceptedCategory,
    pushRejectedCategory,

    setTimeForPlan,

    resetInterest,
    resetPlanCandidates,
} = slice.actions;

export const reduxPlanSelector = () =>
    useSelector((state: RootState) => state.plan);

export const planReducer = slice.reducer;
