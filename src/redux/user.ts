import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import * as process from "process";
import { useSelector } from "react-redux";
import { CloudStoragePath } from "src/constant/cloudStorage";
import { uploadDataToCloudStorage } from "src/data/cloudstorage/upload";
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
import { v4 as uuidv4 } from "uuid";

export type UserState = {
    fetchUserStatus: RequestStatus | null;
    bindPlanCandidateSetsToUserRequestStatus: RequestStatus | null;
    updateProfileRequestStatus: RequestStatus | null;

    isBindPreLoginStateDialogVisible: boolean;
};

const initialState: UserState = {
    fetchUserStatus: null,
    bindPlanCandidateSetsToUserRequestStatus: null,
    updateProfileRequestStatus: null,

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

type UpdateUserProfileProps = {
    userId: string;
    firebaseUserId: string;
    firebaseAuthToken: string;
    name?: string;
    profileImageBlob?: Blob;
};
export const updateUserProfile = createAsyncThunk(
    "user/updateUserProfile",
    async (
        {
            userId,
            firebaseAuthToken,
            firebaseUserId,
            name,
            profileImageBlob,
        }: UpdateUserProfileProps,
        { dispatch }
    ) => {
        let profileImageUrl: string | null = null;
        if (profileImageBlob) {
            const firebaseApp = getApp();
            const storage = getStorage(
                firebaseApp,
                `gs://${process.env.CLOUD_STORAGE_IMAGE_BUCKET_NAME}`
            );

            const uniqueFileName = uuidv4() + ".png";
            const storageRef = ref(
                storage,
                CloudStoragePath.profileImage({
                    firebaseUid: firebaseUserId,
                    fileName: uniqueFileName,
                })
            );

            await uploadDataToCloudStorage(profileImageBlob, storageRef);

            profileImageUrl = CloudStoragePath.profileImage({
                firebaseUid: firebaseUserId,
                fileName: uniqueFileName,
                cloudStorageDomain: {
                    protocol: process.env.CLOUD_STORAGE_IMAGE_BUCKET_PROTOCOL,
                    host: process.env.CLOUD_STORAGE_IMAGE_BUCKET_HOST,
                    bucketName: process.env.CLOUD_STORAGE_IMAGE_BUCKET_NAME,
                },
            });
        }

        const userApi: UserApi = new PlannerUserGraphqlApi();
        const { user } = await userApi.updateProfile({
            userId,
            firebaseToken: firebaseAuthToken,
            name,
            photoUrl: profileImageUrl,
        });

        dispatch(setUser({ user: createUserFromEntity(user) }));
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
        setUpdateProfileRequestStatus: (
            state,
            { payload }: PayloadAction<{ status: RequestStatus }>
        ) => {
            state.updateProfileRequestStatus = payload.status;
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
            })
            // Update User Profile
            .addCase(updateUserProfile.pending, (state, action) => {
                state.updateProfileRequestStatus = RequestStatuses.PENDING;
            })
            .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
                state.updateProfileRequestStatus = RequestStatuses.FULFILLED;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.updateProfileRequestStatus = RequestStatuses.REJECTED;
            });
    },
});

export const {
    setIsBindPreLoginStateDialogVisible,
    setUpdateProfileRequestStatus,
} = slice.actions;

export const userReducer = slice.reducer;

export const reduxUserSelector = () =>
    useSelector((state: RootState) => state.user);
