import { getAnalytics, logEvent } from "@firebase/analytics";
import { useEffect, useState } from "react";
import { AnalyticsEvents } from "src/constant/analytics";
import { locationSinjukuStation } from "src/constant/location";
import { Routes } from "src/constant/router";
import { GeoLocation } from "src/data/graphql/generated";
import { useAppRouter } from "src/hooks/useAppRouter";
import { useLocation } from "src/hooks/useLocation";
import { setCurrentLocation, setSearchLocation } from "src/redux/location";
import {
    resetPlaceSearchResults,
    resetSelectedLocation,
    setSelectedLocation,
} from "src/redux/placeSearch";
import { useAppDispatch } from "src/redux/redux";
import { isWeb } from "tamagui";

export const usePlaceSearchPage = ({
    isSkipFetchCurrentLocation,
}: {
    isSkipFetchCurrentLocation?: boolean;
}) => {
    const router = useAppRouter();
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [mapCenter, setMapCenter] = useState<GeoLocation>(
        locationSinjukuStation
    );

    const {
        fetchCurrentLocationStatus,
        getCurrentLocation,
        currentLocation,
        resetLocationState,
        checkGeolocationPermission,
    } = useLocation();

    const selectLocation = (location: GeoLocation) => {
        dispatch(setSelectedLocation({ location, placeId: null }));
    };

    const createPlan = async ({
        placeSelected,
    }: {
        placeSelected: { location: GeoLocation; placeId: string };
    }) => {
        if (!placeSelected) return;
        // TODO: native対応
        if (isWeb) {
            logEvent(
                getAnalytics(),
                AnalyticsEvents.CreatePlan.StartCreatePlanFromSelectedLocation
            );
        }
        dispatch(
            setSearchLocation({
                searchLocation: placeSelected.location,
                searchPlaceId: placeSelected.placeId,
            })
        );
        await router.push(
            Routes.plans.interest({
                location: placeSelected.location,
                googlePlaceId: placeSelected.placeId,
            })
        );
    };

    // 検索結果をリセット
    useEffect(() => {
        dispatch(resetPlaceSearchResults());
        dispatch(resetSelectedLocation());
        return () => {
            dispatch(resetPlaceSearchResults());
            dispatch(resetSelectedLocation());
        };
    }, []);

    // 現在地を取得
    // MEMO: 位置情報が利用できないと、Google Mapを表示しようとしたときにエラーになる
    useEffect(() => {
        resetLocationState();

        if (isSkipFetchCurrentLocation) return;
        const fetchCurrentLocation = async () => {
            // 権限がある場合のみ、現在地を取得する
            const isGranted = await checkGeolocationPermission();
            if (!isGranted) return;

            await getCurrentLocation();
        };
        fetchCurrentLocation().then();
    }, [isSkipFetchCurrentLocation]);

    // 現在地が取得できたら、地図の中心を現在地にする
    useEffect(() => {
        if (!currentLocation) return;

        dispatch(setCurrentLocation({ currentLocation: currentLocation }));
        if (mapCenter === locationSinjukuStation) {
            setMapCenter(currentLocation);
        }
    }, [currentLocation]);

    return {
        mapCenter,
        currentLocation,
        fetchCurrentLocationStatus,
        isFetchingCurrentLocation:
            !currentLocation && fetchCurrentLocationStatus,

        setMapCenter,
        setSearchQuery,
        createPlan,
        selectLocation,
    };
};
