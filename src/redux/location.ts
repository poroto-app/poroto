import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { GeoLocation } from "src/domain/models/GeoLocation";
import { RootState } from "src/redux/redux";

export type LocationState = {
    currentLocation: GeoLocation | null;
    searchLocation: GeoLocation | null;
    searchPlaceId: string | null;
};

const initialState: LocationState = {
    currentLocation: null,
    searchLocation: null,
    searchPlaceId: null,
};

export const slice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setCurrentLocation: (
            state,
            { payload }: PayloadAction<{ currentLocation: GeoLocation }>
        ) => {
            state.currentLocation = payload.currentLocation;
        },
        setSearchLocation: (
            state,
            {
                payload,
            }: PayloadAction<{
                searchLocation: GeoLocation | null;
                searchPlaceId: string | null;
            }>
        ) => {
            state.searchLocation = payload.searchLocation;
            state.searchPlaceId = payload.searchPlaceId;
        },
    },
});

export const { setCurrentLocation, setSearchLocation } = slice.actions;

export const reduxLocationSelector = () =>
    useSelector((state: RootState) => state.location);
export const locationReducer = slice.reducer;
