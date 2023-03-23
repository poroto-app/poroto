import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlanEntry} from "src/domain/plan/Plan";
import {PlannerApi} from "src/data/api/planner/PlannerApi";
import {useSelector} from "react-redux";
import {RootState} from "src/redux/redux";

export type PlanState = {
    plans: PlanEntry[] | null,
}

const initialState: PlanState = {
    plans: null,
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
        const plannerApi = new PlannerApi();
        const response = await plannerApi.createPlansFromLocation({location: location});
        const plans: PlanEntry[] = response.plans.map((plan) => ({
            id: plan.id,
            title: plan.title,
            imageUrls: plan.places.flatMap((place) => place.imageUrls),
            tags: plan.tags
        }));
        dispatch(setPlans({plans}))
    }
)

export const slice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        setPlans: (state, {payload}: PayloadAction<{ plans: PlanEntry[] | null }>) => {
            state.plans = payload.plans;
        },
    },
    extraReducers: (builder) => {

    },
});

export const {
    setPlans
} = slice.actions;

export const reduxPlanSelector = () => useSelector((state: RootState) => state.plan);

export const planReducer = slice.reducer;