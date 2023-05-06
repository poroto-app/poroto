import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Plan} from "src/domain/models/Plan";
import {useSelector} from "react-redux";
import {RootState} from "src/redux/redux";
import {LocationCategory} from "src/domain/models/LocationCategory";
import {PlannerApi} from "src/domain/plan/PlannerApi";
import {PlannerGraphQlApi} from "src/data/graphql/PlannerGraphQlApi";

export type PlanState = {
    // TODO: ここもPlanで管理する（提示するプランは３件だけでデータ量も多くないはずだから）
    plans: Plan[] | null,
    // TODO: `usePlanPreview`等でデータを二重管理しないようにする
    preview: Plan | null,

    categoryCandidates: LocationCategory[] | null,
    categoryAccepted: LocationCategory[],
    categoryRejected: LocationCategory[],
}

const initialState: PlanState = {
    plans: null,
    preview: null,

    categoryCandidates: null,
    categoryAccepted: null,
    categoryRejected: null,
}

type CreatePlanFromCurrentLocationProps = {
    location: {
        latitude: number,
        longitude: number,
    }
};
export const createPlanFromLocation = createAsyncThunk(
    'plan/createPlanFromCurrentLocation',
    async ({location}: CreatePlanFromCurrentLocationProps, {dispatch}) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.createPlansFromLocation({location: location});
        const plans: Plan[] = response.plans.map((plan) => ({
            id: plan.id,
            title: plan.title,
            imageUrls: plan.places.flatMap((place) => place.imageUrls),
            tags: plan.tags,
            places: plan.places.map((place) => ({
                name: place.name,
                imageUrls: place.imageUrls,
                tags: [],
                location: place.location,
            })),
            timeInMinutes: plan.timeInMinutes,
        }));
        dispatch(setPlans({plans}))
    }
)

type MatchInterestProps = {
    location: {
        latitude: number,
        longitude: number,
    }
};
export const matchInterest = createAsyncThunk(
    'plan/matchInterest',
    async ({location}: MatchInterestProps, {dispatch}) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const response = await plannerApi.matchInterest({location});
        dispatch(setCategoryCandidates({
            categories: response.categories.map((category) => ({
                name: category.name,
                displayName: category.displayName,
                thumbnail: category.photo,
            }))
        }))
    }
)

export const slice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        setPlans: (state, {payload}: PayloadAction<{ plans: Plan[] | null }>) => {
            state.plans = payload.plans;
        },
        fetchPlanDetail: (state, {payload}: PayloadAction<{ planId: string }>) => {
            if (!state.plans) return;
            state.preview = state.plans.find((plan) => plan.id === payload.planId);
        },

        setCategoryCandidates: (state, {payload}: PayloadAction<{ categories: LocationCategory[] }>) => {
            state.categoryCandidates = payload.categories;
            state.categoryAccepted = [];
            state.categoryRejected = [];
        },
        pushAcceptedCategory: (state, {payload}: PayloadAction<{ category: LocationCategory }>) => {
            if (!state.categoryAccepted) state.categoryAccepted = [];
            state.categoryAccepted.push(payload.category);
            state.categoryCandidates = state.categoryCandidates.filter((category) => category.name != payload.category.name);
        },
        pushRejectedCategory: (state, {payload}: PayloadAction<{ category: LocationCategory }>) => {
            if (!state.categoryRejected) state.categoryRejected = [];
            state.categoryRejected.push(payload.category);
            state.categoryCandidates = state.categoryCandidates.filter((category) => category.name != payload.category.name);
        },
        resetInterest: (state) => {
            state.categoryCandidates = null;
            state.categoryRejected = [];
            state.categoryAccepted = [];
        },
    },
    extraReducers: (builder) => {

    },
});

export const {
    setPlans,
    fetchPlanDetail,

    setCategoryCandidates,
    pushAcceptedCategory,
    pushRejectedCategory,
    resetInterest,
} = slice.actions;

export const reduxPlanSelector = () => useSelector((state: RootState) => state.plan);

export const planReducer = slice.reducer;