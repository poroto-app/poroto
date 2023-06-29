import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { LocationCategory } from "src/domain/models/LocationCategory";
import { Plan } from "src/domain/models/Plan";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import {
    createPlanFromPlanEntity,
    PlannerApi,
} from "src/domain/plan/PlannerApi";
import { RootState } from "src/redux/redux";

export type PlanCandidateState = {
    createPlanSession: string | null;
    createdBasedOnCurrentLocation: boolean | null;
    plansCreated: Plan[] | null;

    // TODO: 取得中か存在しないのかを見分けられるようにする
    //  （画面に大きく依存するもののため、専用のsliceを作成する）
    preview: Plan | null;

    categoryCandidates: LocationCategory[] | null;
    categoryAccepted: LocationCategory[] | null;
    categoryRejected: LocationCategory[] | null;

    timeForPlan: number | null;
    savePlanFromCandidateRequestStatus: RequestStatus | null;
};

const initialState: PlanCandidateState = {
    createPlanSession: null,
    createdBasedOnCurrentLocation: null,
    plansCreated: null,
    preview: null,

    categoryCandidates: null,
    categoryAccepted: null,
    categoryRejected: null,

    timeForPlan: null,
    savePlanFromCandidateRequestStatus: null,
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
    "planCandidate/createPlanFromCurrentLocation",
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

type MatchInterestProps = {
    location: {
        latitude: number;
        longitude: number;
    };
};
export const matchInterest = createAsyncThunk(
    "planCandidate/matchInterest",
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

export const reduxPlanCandidateSelector = () =>
    useSelector((state: RootState) => state.planCandidate);

export const planCandidateReducer = slice.reducer;
