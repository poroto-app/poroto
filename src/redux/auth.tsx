import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PlannerUserGraphqlApi } from "src/data/graphql/PlannerUserGraphqlApi";
import { createPlaceFromPlaceEntity } from "src/domain/factory/Place";
import { createPlanFromPlanEntity } from "src/domain/factory/Plan";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { User } from "src/domain/models/User";
import { UserApi, createUserFromEntity } from "src/domain/user/UserApi";
import { setLikePlaces } from "src/redux/place";
import { setPlansByUser } from "src/redux/plan";
import { RootState } from "src/redux/redux";

export type AuthState = {
    user: User | null;

    firebaseIdToken: string | null;

    fetchByFirebaseUserStatus: RequestStatus | null;
};

const initialState: AuthState = {
    user: null,
    firebaseIdToken: null,
    fetchByFirebaseUserStatus: null,
};

type FetchByFirebaseUserProps = {
    firebaseUserId: string;
    firebaseToken: string;
};
export const fetchByFirebaseUser = createAsyncThunk(
    "auth/fetchByFirebaseUser",
    async (
        { firebaseUserId, firebaseToken }: FetchByFirebaseUserProps,
        { dispatch }
    ) => {
        const userApi: UserApi = new PlannerUserGraphqlApi();
        const { user, plans, likedPlaces } =
            await userApi.fetchByFirebaseUserId({
                firebaseUserId,
                firebaseToken,
            });

        dispatch(
            setPlansByUser({ plans: plans.map(createPlanFromPlanEntity) })
        );
        dispatch(
            setLikePlaces({
                places: likedPlaces.map(createPlaceFromPlaceEntity),
            })
        );

        return {
            user: createUserFromEntity(user),
            firebaseToken,
        };
    }
);

export const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthUser: (state) => {
            state.user = null;
            state.firebaseIdToken = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch By Firebase User
            .addCase(fetchByFirebaseUser.pending, (state) => {
                state.fetchByFirebaseUserStatus = RequestStatuses.PENDING;
            })
            .addCase(fetchByFirebaseUser.fulfilled, (state, { payload }) => {
                state.fetchByFirebaseUserStatus = RequestStatuses.FULFILLED;
                state.user = payload.user;
                state.firebaseIdToken = payload.firebaseToken;
            })
            .addCase(fetchByFirebaseUser.rejected, (state) => {
                state.fetchByFirebaseUserStatus = RequestStatuses.REJECTED;
            });
    },
});

export const { resetAuthUser } = slice.actions;
export const authReducer = slice.reducer;
export const reduxAuthSelector = () =>
    useSelector((state: RootState) => state.auth);
