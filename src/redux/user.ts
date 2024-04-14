import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PlannerUserGraphqlApi } from "src/data/graphql/PlannerUserGraphqlApi";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { UserApi } from "src/domain/user/UserApi";
import { RootState } from "src/redux/redux";

export type UserState = {
    bindPlanCandidateSetsToUserRequestStatus: RequestStatus | null;

    showBindPreLoginStateDialog: boolean;
};

const initialState: UserState = {
    bindPlanCandidateSetsToUserRequestStatus: null,

    showBindPreLoginStateDialog: false,
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
    reducers: {
        setShowBindPreLoginStateDialog: (
            state,
            { payload }: PayloadAction<{ show: boolean }>
        ) => {
            state.showBindPreLoginStateDialog = payload.show;
        },
    },
    extraReducers: (builder) => {
        builder
            // Bind Plan Candidate Sets To User
            .addCase(bindPlanCandidateSetsToUser.pending, (state, action) => {
                state.bindPlanCandidateSetsToUserRequestStatus =
                    RequestStatuses.PENDING;
            })
            .addCase(bindPlanCandidateSetsToUser.fulfilled, (state) => {
                state.bindPlanCandidateSetsToUserRequestStatus =
                    RequestStatuses.FULFILLED;
            })
            .addCase(bindPlanCandidateSetsToUser.rejected, (state, action) => {
                state.bindPlanCandidateSetsToUserRequestStatus =
                    RequestStatuses.REJECTED;
            });
    },
});

export const { setShowBindPreLoginStateDialog } = slice.actions;

export const userReducer = slice.reducer;

export const reduxUserSelector = () =>
    useSelector((state: RootState) => state.user);
