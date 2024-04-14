import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PlannerUserGraphqlApi } from "src/data/graphql/PlannerUserGraphqlApi";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { UserApi } from "src/domain/user/UserApi";

export type UserState = {
    bindPlanCandidateSetsToUserRequestStatus: RequestStatus | null;
};

const initialState: UserState = {
    bindPlanCandidateSetsToUserRequestStatus: null,
};

type BindPlanCandidateSetsToUserProps = {
    userId: string;
    firebaseAuthToken: string;
    planCandidateSetIds: string[];
};
export const bindPlanCandidateSetsToUser = createAsyncThunk(
    "user/bindPlanCandidateSetsToUser",
    async ({
        userId,
        firebaseAuthToken,
        planCandidateSetIds,
    }: BindPlanCandidateSetsToUserProps) => {
        const userApi: UserApi = new PlannerUserGraphqlApi();
        await userApi.bindPlanCandidateSetsToUser({
            userId,
            firebaseAuthToken,
            planCandidateSetIds,
        });
    }
);

export const slice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Bind Plan Candidate Sets To User
            .addCase(bindPlanCandidateSetsToUser.pending, (state, action) => {
                state.bindPlanCandidateSetsToUserRequestStatus =
                    RequestStatuses.PENDING;
            })
            .addCase(
                bindPlanCandidateSetsToUser.fulfilled,
                (state, { payload: {} }) => {
                    state.bindPlanCandidateSetsToUserRequestStatus =
                        RequestStatuses.FULFILLED;
                }
            )
            .addCase(bindPlanCandidateSetsToUser.rejected, (state, action) => {
                state.bindPlanCandidateSetsToUserRequestStatus =
                    RequestStatuses.REJECTED;
            });
    },
});

export const {} = slice.actions;

export const userReducer = slice.reducer;
