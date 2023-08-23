import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PlannerGraphqlUserApi } from "src/data/graphql/PlannerGraphqlUserApi";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { User } from "src/domain/models/User";
import { UserApi } from "src/domain/user/UserApi";
import { RootState } from "src/redux/redux";

export type AuthState = {
    user: User | null;

    fetchByFirebaseUserStatus: RequestStatus | null;
};

const initialState: AuthState = {
    user: null,

    fetchByFirebaseUserStatus: null,
};

type FetchByFirebaseUserProps = {
    firebaseUserId: string;
    firebaseToken: string;
};
export const fetchByFirebaseUser = createAsyncThunk(
    "auth/fetchByFirebaseUser",
    async ({ firebaseUserId, firebaseToken }: FetchByFirebaseUserProps) => {
        const userApi: UserApi = new PlannerGraphqlUserApi();
        const { user } = await userApi.fetchByFirebaseUserId({
            firebaseUserId,
            firebaseToken,
        });
        return {
            user,
        };
    }
);

export const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch By Firebase User
            .addCase(fetchByFirebaseUser.pending, (state, action) => {
                state.fetchByFirebaseUserStatus = RequestStatuses.PENDING;
            })
            .addCase(
                fetchByFirebaseUser.fulfilled,
                (state, { payload: { user } }) => {
                    state.fetchByFirebaseUserStatus = RequestStatuses.FULFILLED;
                    state.user = user;
                }
            )
            .addCase(fetchByFirebaseUser.rejected, (state, action) => {
                state.fetchByFirebaseUserStatus = RequestStatuses.REJECTED;
            });
    },
});

export const authReducer = slice.reducer;
export const reduxAuthSelector = () =>
    useSelector((state: RootState) => state.auth);
