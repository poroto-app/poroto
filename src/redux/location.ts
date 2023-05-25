import { useSelector } from "react-redux";
import { RootState } from "src/redux/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeoLocation } from "src/domain/models/GeoLocation";

export type LocationState = {
    currentLocation: GeoLocation | null;
    searchLocation: GeoLocation | null;
};

const initialState: LocationState = {
    currentLocation: null,
    searchLocation: null,
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
            { payload }: PayloadAction<{ searchLocation: GeoLocation }>
        ) => {
            state.searchLocation = payload.searchLocation;
        },
    },
});

export const { setCurrentLocation, setSearchLocation } = slice.actions;

export const reduxLocationSelector = () =>
    useSelector((state: RootState) => state.location);
export const locationReducer = slice.reducer;
