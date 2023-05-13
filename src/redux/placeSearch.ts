import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlaceSearchResult} from "src/domain/models/PlaceSearchResult";
import {RootState} from "src/redux/redux";
import {useSelector} from "react-redux";

export type PlaceSearchState = {
    placeSearchResults: PlaceSearchResult[] | null,
}

const initialState: PlaceSearchState = {
    placeSearchResults: null,
}

export const slice = createSlice({
    name: 'placeSearch',
    initialState,
    reducers: {
        setPlaceSearchResults: (state, {payload}: PayloadAction<{
            placeSearchResults: PlaceSearchResult[] | null
        }>) => {
            state.placeSearchResults = payload.placeSearchResults;
        },
    },
});

export const {
    setPlaceSearchResults,
} = slice.actions;

export const reduxPlaceSearchSelector = () => useSelector((state: RootState) => state.placeSearch);
export const placeSearchReducer = slice.reducer;