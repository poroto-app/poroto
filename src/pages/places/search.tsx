import { Box, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdDone, MdOutlineTouchApp } from "react-icons/md";
import { GeoLocation } from "src/data/graphql/generated";
import { PlaceSearchResult } from "src/domain/models/PlaceSearchResult";
import { copyObject } from "src/domain/util/object";
import {
    reduxLocationSelector,
    setCurrentLocation,
    setSearchLocation,
} from "src/redux/location";
import {
    fetchGeoLocationByPlaceId,
    reduxPlaceSearchSelector,
    resetPlaceSearchResults,
    resetSelectedLocation,
    searchPlacesByQuery,
    setMoveToSelectedLocation,
    setSelectedLocation,
} from "src/redux/placeSearch";
import { useAppDispatch } from "src/redux/redux";
import { ButtonRounded } from "src/view/common/ButtonRounded";
import { Layout } from "src/view/common/Layout";
import { NavBar } from "src/view/common/NavBar";
import { locationSinjukuStation } from "src/view/constants/location";
import { Routes } from "src/view/constants/router";
import { useLocation } from "src/view/hooks/useLocation";
import { MapPinSelector } from "src/view/place/MapPinSelector";
import { PlaceSearchBar } from "src/view/place/PlaceSearchBar";
import { PlaceSearchResults } from "src/view/place/PlaceSearchResults";

export default function PlaceSearchPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { currentLocation } = reduxLocationSelector();
    const { placeSearchResults, locationSelected, moveToSelectedLocation } =
        reduxPlaceSearchSelector();
    const { getCurrentLocation } = useLocation();
    const [mapCenter, setMapCenter] = useState<GeoLocation>(
        locationSinjukuStation
    );

    useEffect(() => {
        getCurrentLocation().then((currentLocation) => {
            dispatch(setCurrentLocation({ currentLocation }));
            if (mapCenter === locationSinjukuStation) {
                setMapCenter(currentLocation);
            }
        });
    }, []);

    useEffect(() => {
        dispatch(resetPlaceSearchResults());
        dispatch(resetSelectedLocation());
        return () => {
            dispatch(resetPlaceSearchResults());
            dispatch(resetSelectedLocation());
        };
    }, []);

    useEffect(() => {
        if (locationSelected && moveToSelectedLocation) {
            setMapCenter(locationSelected);
        }

        return () => {
            dispatch(setMoveToSelectedLocation(false));
        };
    }, [
        copyObject(currentLocation),
        copyObject(locationSelected),
        moveToSelectedLocation,
    ]);

    const handleOnSearch = (value: string) => {
        dispatch(searchPlacesByQuery({ query: value }));
    };

    const handleOnClickPlace = (placeSearchResult: PlaceSearchResult) => {
        dispatch(fetchGeoLocationByPlaceId({ placeId: placeSearchResult.id }));
        dispatch(resetPlaceSearchResults());
    };

    const handleOnSelectLocation = (location: GeoLocation) => {
        dispatch(setSelectedLocation({ location }));
    };

    const handleOnCreatePlan = async () => {
        if (!locationSelected) return;
        dispatch(setSearchLocation({ searchLocation: locationSelected }));
        await router.push(Routes.plans.interest);
    };

    return (
        <Layout
            navBar={<NavBar title="場所を指定してプランを作成" />}
            fillComponent={
                <MapPinSelector
                    center={mapCenter}
                    onSelectLocation={handleOnSelectLocation}
                    pinnedLocation={locationSelected}
                />
            }
        >
            <VStack
                w="100%"
                h="100%"
                pt="24px"
                px="8px"
                spacing={4}
                position="relative"
                zIndex={10}
            >
                <Box w="100%">
                    <PlaceSearchBar onSearch={handleOnSearch} />
                </Box>
                <Box
                    w="100%"
                    backgroundColor="white"
                    borderRadius={5}
                    boxShadow={
                        placeSearchResults &&
                        placeSearchResults.length !== 0 &&
                        "0px 5px 20px 0px rgb(0 0 0 / 10%)"
                    }
                >
                    <PlaceSearchResults
                        places={(placeSearchResults || []).slice(0, 5)}
                        onClickPlace={handleOnClickPlace}
                    />
                </Box>
            </VStack>
            {/*
            MEMO:
            `space-between` で余白をつけようとすると、その部分を選択できなくなってしまうため、
            `position: fixed;` で位置を調整している
         */}
            <Box position="fixed" left={0} bottom="32px" right={0} px="8px">
                <Layout>
                    <ButtonRounded
                        text={
                            locationSelected
                                ? "指定した場所からプランを作成"
                                : "タップして場所を選択"
                        }
                        icon={locationSelected ? MdDone : MdOutlineTouchApp}
                        disabled={locationSelected === null}
                        onClick={handleOnCreatePlan}
                    />
                </Layout>
            </Box>
        </Layout>
    );
}
