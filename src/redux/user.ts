import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PlannerUserGraphqlApi } from "src/data/graphql/PlannerUserGraphqlApi";
import { createPlaceFromPlaceEntity } from "src/domain/factory/Place";
import { createPlanFromPlanEntity } from "src/domain/factory/Plan";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { createUserFromEntity, UserApi } from "src/domain/user/UserApi";
import { setUser } from "src/redux/auth";
import { setLikePlaces } from "src/redux/place";
import { setPlansByUser } from "src/redux/plan";
import { RootState } from "src/redux/redux";

export type UserState = {
    fetchUserStatus: RequestStatus | null;
    bindPlanCandidateSetsToUserRequestStatus: RequestStatus | null;

    isBindPreLoginStateDialogVisible: boolean;
};

const initialState: UserState = {
    fetchUserStatus: null,
    bindPlanCandidateSetsToUserRequestStatus: null,

    isBindPreLoginStateDialogVisible: false,
};

type FetchUserProps = {
    userId: string;
    firebaseAuthToken: string;
};
export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async ({ userId, firebaseAuthToken }: FetchUserProps, { dispatch }) => {
        const userApi: UserApi = new PlannerUserGraphqlApi();
        const response = await userApi.fetchUser({
            userId,
            firebaseToken: firebaseAuthToken,
        });
        dispatch(
            setPlansByUser({
                plans: response.plans.map(createPlanFromPlanEntity),
            })
        );
        dispatch(
            setLikePlaces({
                places: response.likedPlaces.map(createPlaceFromPlaceEntity),
            })
        );
        dispatch(setUser({ user: createUserFromEntity(response.user) }));
    }
);

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
        setIsBindPreLoginStateDialogVisible: (
            state,
            { payload }: PayloadAction<{ visible: boolean }>
        ) => {
            state.isBindPreLoginStateDialogVisible = payload.visible;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch User
            .addCase(fetchUser.pending, (state) => {
                state.fetchUserStatus = RequestStatuses.PENDING;
            })
            .addCase(fetchUser.fulfilled, (state) => {
                state.fetchUserStatus = RequestStatuses.FULFILLED;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.fetchUserStatus = RequestStatuses.REJECTED;
            })
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

export const { setIsBindPreLoginStateDialogVisible } = slice.actions;

export const userReducer = slice.reducer;

export const reduxUserSelector = () =>
    useSelector((state: RootState) => state.user);
