import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlaceSearchResult} from "src/domain/models/PlaceSearchResult";
import {RootState} from "src/redux/redux";
import {useSelector} from "react-redux";
import {GooglePlacesApi} from "src/data/map/GooglePlacesApi";

export type PlaceSearchState = {
    placeSearchResults: PlaceSearchResult[] | null,
}

const initialState: PlaceSearchState = {
    placeSearchResults: null,
}

type SearchPlacesByQueryProps = {
    query: string,
};
export const searchPlacesByQuery = createAsyncThunk(
    'placeSearch/searchPlacesByQuery',
    async ({query}: SearchPlacesByQueryProps, {dispatch, getState}) => {
        console.log("Search Places By Query", {query});

        if (query === "") return;
        const mapApi = new GooglePlacesApi();
        const currentLocation = (getState() as RootState).location.location;
        const response = await mapApi.placeAutoComplete({
            input: query,
            language: 'ja',
            radius: 10000,
            location: currentLocation,
        });
        const placeSearchResults: PlaceSearchResult[] = response.predictions.map((prediction) => ({
            id: prediction.place_id,
            name: prediction.structured_formatting.main_text,
            address: prediction.structured_formatting.secondary_text,
        }));
        dispatch(setPlaceSearchResults({placeSearchResults}));
    }
);

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