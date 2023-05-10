import { useSelector } from "react-redux";
import { RootState } from "src/redux/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeoLocation } from "src/domain/models/GeoLocation";

export type LocationState = {
    location: GeoLocation | null;
};

const initialState: LocationState = {
    location: null,
}

export const slice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation: (state, {payload}: PayloadAction<{ location: GeoLocation }>) => {
            state.location = payload.location;
        },
    },
});

export const { setLocation } = slice.actions;

export const reduxLocationSelector = () => useSelector((state: RootState) => state.location);
export const locationReducer = slice.reducer;