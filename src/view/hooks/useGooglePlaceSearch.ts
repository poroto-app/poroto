import { useEffect } from "react";
import { GeoLocation } from "src/domain/models/GeoLocation";
import { PlaceSearchResult } from "src/domain/models/PlaceSearchResult";
import { copyObject } from "src/domain/util/object";
import { reduxLocationSelector } from "src/redux/location";
import {
    fetchGeoLocationByPlaceId,
    reduxPlaceSearchSelector,
    resetPlaceSearchResults,
    searchPlacesByQuery,
    setMoveToSelectedLocation,
} from "src/redux/placeSearch";
import { useAppDispatch } from "src/redux/redux";

export const useGooglePlaceSearch = ({
    onMoveToSelectedLocation,
}: {
    onMoveToSelectedLocation?: (params: { location: GeoLocation }) => void;
}) => {
    const dispatch = useAppDispatch();
    const { currentLocation } = reduxLocationSelector();
    const { placeSearchResults, placeSelected, moveToSelectedLocation } =
        reduxPlaceSearchSelector();

    const searchGooglePlacesByQuery = (value: string) => {
        dispatch(searchPlacesByQuery({ query: value }));
    };

    const onSelectedSearchResult = (placeSearchResult: PlaceSearchResult) => {
        dispatch(fetchGeoLocationByPlaceId({ placeId: placeSearchResult.id }));
        dispatch(resetPlaceSearchResults());
    };

    useEffect(() => {
        if (placeSelected && moveToSelectedLocation) {
            onMoveToSelectedLocation?.({
                location: copyObject(placeSelected.location),
            });
        }

        return () => {
            dispatch(setMoveToSelectedLocation(false));
        };
    }, [
        copyObject(currentLocation),
        copyObject(placeSelected),
        moveToSelectedLocation,
    ]);

    return {
        placeSearchResults: (placeSearchResults || []).slice(0, 5),
        placeSelected,
        searchGooglePlacesByQuery,
        onSelectedSearchResult,
    };
};
