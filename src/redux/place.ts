import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PlannerPlaceGraphqlApi } from "src/data/graphql/PlannerPlaceGraphqlApi";
import { createPlaceFromPlaceEntity } from "src/domain/factory/Place";
import { Place } from "src/domain/models/Place";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { PlaceApi } from "src/domain/place/PlaceApi";
import { RootState } from "src/redux/redux";

export type PlaceState = {
    likePlaces: Place[] | null;
    recommendedPlacesToCreateFromLocation: Place[] | null;

    fetchPlaceRecommendationsRequestStatus: RequestStatus | null;
};

const initialState: PlaceState = {
    likePlaces: null,
    recommendedPlacesToCreateFromLocation: null,

    fetchPlaceRecommendationsRequestStatus: null,
};

export const fetchPlaceRecommendations = createAsyncThunk(
    "place/fetchPlaceRecommendations",
    async () => {
        const api: PlaceApi = new PlannerPlaceGraphqlApi();
        const { places } = await api.fetchPlaceRecommendations();
        return {
            places: places.map(createPlaceFromPlaceEntity),
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
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Place Recommendations
            .addCase(fetchPlaceRecommendations.pending, (state, action) => {
                state.fetchPlaceRecommendationsRequestStatus =
                    RequestStatuses.PENDING;
            })
            .addCase(
                fetchPlaceRecommendations.fulfilled,
                (state, { payload }) => {
                    state.fetchPlaceRecommendationsRequestStatus =
                        RequestStatuses.FULFILLED;
                    state.recommendedPlacesToCreateFromLocation =
                        payload.places;
                }
            )
            .addCase(fetchPlaceRecommendations.rejected, (state, action) => {
                state.fetchPlaceRecommendationsRequestStatus =
                    RequestStatuses.REJECTED;
            });
    },
});

export const { setLikePlaces } = slice.actions;

export const reduxPlaceSelector = () =>
    useSelector((state: RootState) => state.place);

export const placeReducer = slice.reducer;
