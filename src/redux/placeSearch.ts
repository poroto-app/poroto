import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { GooglePlacesApi } from "src/data/map/GooglePlacesApi";
import { GeoLocation } from "src/domain/models/GeoLocation";
import { PlaceSearchResult } from "src/domain/models/PlaceSearchResult";
import { RootState } from "src/redux/redux";

export type PlaceSearchState = {
    placeSearchResults: PlaceSearchResult[] | null;
    placeSelected: {
        placeId: string;
        location: GeoLocation;
    } | null;
    moveToSelectedLocation: boolean;
};

const initialState: PlaceSearchState = {
    placeSearchResults: null,
    placeSelected: null,
    moveToSelectedLocation: false,
};

type SearchPlacesByQueryProps = {
    query: string;
};
export const searchPlacesByQuery = createAsyncThunk(
    "placeSearch/searchPlacesByQuery",
    async ({ query }: SearchPlacesByQueryProps, { dispatch, getState }) => {
        if (query === "") {
            dispatch(resetPlaceSearchResults());
            return;
        }

        const mapApi = new GooglePlacesApi();
        const currentLocation = (getState() as RootState).location
            .currentLocation;
        const response = await mapApi.placeAutoComplete({
            input: query,
            language: "ja",
            radius: 10000,
            location: currentLocation,
        });
        const placeSearchResults: PlaceSearchResult[] =
            response.predictions.map((prediction) => ({
                id: prediction.place_id,
                name: prediction.structured_formatting.main_text,
                address: prediction.structured_formatting.secondary_text,
            }));
        dispatch(setPlaceSearchResults({ placeSearchResults }));
    }
);

type FetchGeoLocationByPlaceIdProps = {
    placeId: string;
};
export const fetchGeoLocationByPlaceId = createAsyncThunk(
    "placeSearch/fetchGeoLocationByPlaceId",
    async ({ placeId }: FetchGeoLocationByPlaceIdProps, { dispatch }) => {
        const mapApi = new GooglePlacesApi();
        const placeDetail = await mapApi.placeDetail({
            placeId,
            language: "ja",
        });
        dispatch(
            setSelectedLocation({ location: placeDetail.location, placeId })
        );
        dispatch(setMoveToSelectedLocation(true));
    }
);

export const slice = createSlice({
    name: "placeSearch",
    initialState,
    reducers: {
        setPlaceSearchResults: (
            state,
            {
                payload,
            }: PayloadAction<{
                placeSearchResults: PlaceSearchResult[];
            }>
        ) => {
            state.placeSearchResults = payload.placeSearchResults;
        },
        resetPlaceSearchResults: (state) => {
            state.placeSearchResults = null;
        },

        setSelectedLocation: (
            state,
            {
                payload,
            }: PayloadAction<{ location: GeoLocation; placeId: string }>
        ) => {
            state.placeSelected = {
                placeId: payload.placeId,
                location: payload.location,
            };
        },
        resetSelectedLocation: (state) => {
            state.placeSelected = null;
        },

        setMoveToSelectedLocation: (
            state,
            { payload }: PayloadAction<boolean>
        ) => {
            state.moveToSelectedLocation = payload;
        },
    },
});

export const {
    resetPlaceSearchResults,
    setSelectedLocation,

    resetSelectedLocation,

    setMoveToSelectedLocation,
} = slice.actions;

const { setPlaceSearchResults } = slice.actions;

export const reduxPlaceSearchSelector = () =>
    useSelector((state: RootState) => state.placeSearch);
export const placeSearchReducer = slice.reducer;
