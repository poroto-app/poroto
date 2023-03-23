import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlanEntry} from "src/domain/plan/Plan";

export type PlanState = {
    plans: PlanEntry[] | null,
}

const initialState: PlanState = {
    plans: null,
}

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

export const {} = slice.actions;

export const planReducer = slice.reducer;