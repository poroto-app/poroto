import { createSlice } from "@reduxjs/toolkit";
import { User } from "src/domain/models/User";

export type AuthState = {
    user: User | null;
};

const initialState: AuthState = {
    user: null,
};

export const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
});

export const authReducer = slice.reducer;
