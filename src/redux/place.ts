import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Place } from "src/domain/models/Place";
import { RootState } from "src/redux/redux";

export type PlaceState = {
    likePlaces: Place[] | null;
};

const initialState: PlaceState = {
    likePlaces: null,
};

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
});

export const { setLikePlaces } = slice.actions;

export const reduxPlaceSelector = () =>
    useSelector((state: RootState) => state.place);

export const placeReducer = slice.reducer;
