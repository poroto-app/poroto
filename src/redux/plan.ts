import {createSlice} from "@reduxjs/toolkit";

export type PlanState = {}

const initialState: PlanState = {}

export const slice = createSlice({
    name: 'plan',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    },
});

export const {} = slice.actions;

export const planReducer = slice.reducer;