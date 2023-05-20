import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlaceSearchResult} from "src/domain/models/PlaceSearchResult";
import {RootState} from "src/redux/redux";
import {useSelector} from "react-redux";
import {GooglePlacesApi} from "src/data/map/GooglePlacesApi";
import {GeoLocation} from "src/domain/models/GeoLocation";

export type PlaceSearchState = {
    placeSearchResults: PlaceSearchResult[] | null,
    locationSelected: GeoLocation | null,
}

const initialState: PlaceSearchState = {
    placeSearchResults: null,
    locationSelected: null,
}

type SearchPlacesByQueryProps = {
    query: string,
};
export const searchPlacesByQuery = createAsyncThunk(
    'placeSearch/searchPlacesByQuery',
    async ({query}: SearchPlacesByQueryProps, {dispatch, getState}) => {
        console.log("Search Places By Query", {query});

        if (query === "") {
            dispatch(resetPlaceSearchResults());
            return;
        }

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

type FetchGeoLocationByPlaceIdProps = {
    placeId: string
};
export const fetchGeoLocationByPlaceId = createAsyncThunk(
    'placeSearch/fetchGeoLocationByPlaceId',
    async ({placeId}: FetchGeoLocationByPlaceIdProps, {dispatch}) => {
        const mapApi = new GooglePlacesApi();
        const placeDetail = await mapApi.placeDetail({placeId, language: "ja"});
        dispatch(setSelectedLocation({location: placeDetail.location}));
    }
)

export const slice = createSlice({
    name: 'placeSearch',
    initialState,
    reducers: {
        setPlaceSearchResults: (state, {payload}: PayloadAction<{
            placeSearchResults: PlaceSearchResult[]
        }>) => {
            state.placeSearchResults = payload.placeSearchResults;
        },
        resetPlaceSearchResults: (state) => {
            state.placeSearchResults = null;
        },

        setSelectedLocation: (state, {payload}: PayloadAction<{ location: GeoLocation }>) => {
            state.locationSelected = payload.location;
        },
        resetSelectedLocation: (state) => {
            state.locationSelected = null;
        }
    },
});

export const {
    resetPlaceSearchResults,
    setSelectedLocation,

    resetSelectedLocation,
} = slice.actions;

const {
    setPlaceSearchResults,
} = slice.actions;

export const reduxPlaceSearchSelector = () => useSelector((state: RootState) => state.placeSearch);
export const placeSearchReducer = slice.reducer;