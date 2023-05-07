import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Plan} from "src/domain/plan/Plan";
import {useSelector} from "react-redux";
import {RootState} from "src/redux/redux";
import {LocationCategory} from "src/domain/models/LocationCategory";
import {PlannerApi} from "src/domain/plan/PlannerApi";
import {PlannerGraphQlApi} from "src/data/graphql/PlannerGraphQlApi";

export type PlanState = {
    createPlanSession: string | null,
    plansCreated: Plan[] | null,
    // TODO: `usePlanPreview`等でデータを二重管理しないようにする
    preview: Plan | null,

    categoryCandidates: LocationCategory[] | null,
    categoryAccepted: LocationCategory[],
    categoryRejected: LocationCategory[],
}

const initialState: PlanState = {
    createPlanSession: null,
    plansCreated: null,
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
        const session = response.session;
        const plans: Plan[] = response.plans.map((plan) => ({
            id: plan.id,
            title: plan.title,
            imageUrls: plan.places.flatMap((place) => place.imageUrls),
            tags: plan.tags,
            places: plan.places.map((place) => ({
                name: place.name,
                imageUrls: place.imageUrls,
                tags: [],
            })),
            timeInMinutes: plan.timeInMinutes,
        }));
        dispatch(setCreatedPlans({session, plans}))
    }
)

type FetchCachedCreatedPlansProps = { session: string };
export const fetchCachedCreatedPlans = createAsyncThunk(
  'plan/fetchCachedCreatedPlans',
  async ({session}: FetchCachedCreatedPlansProps, {dispatch}) => {
      const plannerApi: PlannerApi = new PlannerGraphQlApi();
      const response = await plannerApi.fetchCachedCreatedPlans({session});
      if(response.plans === null) {
          dispatch(setCreatedPlans({session, plans: null}));
          return;
      }

      const plans: Plan[] = response.plans.map((plan) => ({
          id: plan.id,
          title: plan.title,
          imageUrls: plan.places.flatMap((place) => place.imageUrls),
          tags: plan.tags,
          places: plan.places.map((place) => ({
              name: place.name,
              imageUrls: place.imageUrls,
              tags: [],
          })),
          timeInMinutes: plan.timeInMinutes,
      }));
      dispatch(setCreatedPlans({session, plans}));
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
        setCreatedPlans: (state, {payload}: PayloadAction<{ session: string, plans: Plan[] | null }>) => {
            state.createPlanSession = payload.session;
            state.plansCreated = payload.plans;
        },
        fetchPlanDetail: (state, {payload}: PayloadAction<{ planId: string }>) => {
            if (!state.plansCreated) return;
            state.preview = state.plansCreated.find((plan) => plan.id === payload.planId);
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

const {
    setCreatedPlans,
} = slice.actions;

export const {
    fetchPlanDetail,

    setCategoryCandidates,
    pushAcceptedCategory,
    pushRejectedCategory,
    resetInterest,
} = slice.actions;

export const reduxPlanSelector = () => useSelector((state: RootState) => state.plan);

export const planReducer = slice.reducer;