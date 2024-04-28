import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PlannerPlaceGraphqlApi } from "src/data/graphql/PlannerPlaceGraphqlApi";
import { createPlaceFromPlaceEntity } from "src/domain/factory/Place";
import { Place } from "src/domain/models/Place";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { PlannerPlaceApi } from "src/domain/place/PlannerPlaceApi";
import { RootState } from "src/redux/redux";

export type PlaceState = {
    likePlaces: Place[] | null;

    fetchLikePlacesRequestStatus: RequestStatus | null;
};

const initialState: PlaceState = {
    likePlaces: null,

    fetchLikePlacesRequestStatus: null,
};

type FetchLikePlacesProps = { userId: string; firebaseIdToken: string };
export const fetchLikePlaces = createAsyncThunk(
    "place/fetchLikePlaces",
    async ({ userId, firebaseIdToken }: FetchLikePlacesProps) => {
        const plannerApi: PlannerPlaceApi = new PlannerPlaceGraphqlApi();
        const response = await plannerApi.fetchLikePlaces({
            userId,
            firebaseIdToken,
        });
        return {
            likePlaces: response.places.map((place) =>
                createPlaceFromPlaceEntity(place)
            ),
        };
    }
);

export const slice = createSlice({
    name: "place",
    initialState,
    reducers: {
        setLikePlaces: (
            state,
            { payload }: PayloadAction<{ places: Place[] | null }>
        ) => {
            state.likePlaces = payload.places;
            if (!payload.places) {
                state.fetchLikePlacesRequestStatus = null;
            }
        },
    },
    extraReducers: (builder) => {
        return (
            builder
                // Fetch Like Places
                .addCase(fetchLikePlaces.pending, (state, action) => {
                    state.fetchLikePlacesRequestStatus =
                        RequestStatuses.PENDING;
                    state.likePlaces = [];
                })
                .addCase(fetchLikePlaces.fulfilled, (state, { payload }) => {
                    state.fetchLikePlacesRequestStatus =
                        RequestStatuses.FULFILLED;
                    state.likePlaces = payload.likePlaces;
                })
                .addCase(fetchLikePlaces.rejected, (state, action) => {
                    state.fetchLikePlacesRequestStatus =
                        RequestStatuses.REJECTED;
                })
        );
    },
});

export const { setLikePlaces } = slice.actions;

export const reduxPlaceSelector = () =>
    useSelector((state: RootState) => state.place);

export const placeReducer = slice.reducer;
