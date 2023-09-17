import { Box, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdDone, MdOutlineTouchApp } from "react-icons/md";
import { GeoLocation } from "src/data/graphql/generated";
import { PlaceSearchResult } from "src/domain/models/PlaceSearchResult";
import { RequestStatuses } from "src/domain/models/RequestStatus";
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
import { Layout } from "src/view/common/Layout";
import { NavBar } from "src/view/common/NavBar";
import { RoundedIconButton } from "src/view/common/RoundedIconButton";
import { locationSinjukuStation } from "src/view/constants/location";
import { PageMetaData } from "src/view/constants/meta";
import { Routes } from "src/view/constants/router";
import { useLocation } from "src/view/hooks/useLocation";
import { FetchLocationDialog } from "src/view/location/FetchLocationDialog";
import { MapPinSelector } from "src/view/place/MapPinSelector";
import { PlaceSearchBar } from "src/view/place/PlaceSearchBar";
import { PlaceSearchResults } from "src/view/place/PlaceSearchResults";

export default function Page() {
    return (
        <>
            <Head>
                <title>{PageMetaData.place.search.title}</title>
                <meta
                    name="description"
                    content={PageMetaData.place.search.description}
                />
            </Head>
            <PlaceSearchPage />
        </>
    );
}

function PlaceSearchPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { currentLocation } = reduxLocationSelector();
    const { placeSearchResults, placeSelected, moveToSelectedLocation } =
        reduxPlaceSearchSelector();
    const {
        fetchCurrentLocationStatus,
        getCurrentLocation,
        location,
        resetLocationState,
        checkGeolocationPermission,
    } = useLocation();
    const [mapCenter, setMapCenter] = useState<GeoLocation>(
        locationSinjukuStation
    );

    // 現在地を取得
    // MEMO: 位置情報が利用できないと、Google Mapを表示しようとしたときにエラーになる
    useEffect(() => {
        resetLocationState();

        const fetchCurrentLocation = async () => {
            // 権限がある場合のみ、現在地を取得する
            const isGranted = await checkGeolocationPermission();
            if (!isGranted) return;

            await getCurrentLocation();
        }
        fetchCurrentLocation().then();
    }, []);

    // 現在地が取得できたら、地図の中心を現在地にする
    useEffect(() => {
        if (!location) return;

        dispatch(setCurrentLocation({ currentLocation: location }));
        if (mapCenter === locationSinjukuStation) {
            setMapCenter(location);
        }
    }, [location]);

    useEffect(() => {
        dispatch(resetPlaceSearchResults());
        dispatch(resetSelectedLocation());
        return () => {
            dispatch(resetPlaceSearchResults());
            dispatch(resetSelectedLocation());
        };
    }, []);

    useEffect(() => {
        if (placeSelected && moveToSelectedLocation) {
            setMapCenter(placeSelected.location);
        }

        return () => {
            dispatch(setMoveToSelectedLocation(false));
        };
    }, [
        copyObject(currentLocation),
        copyObject(placeSelected),
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
        dispatch(setSelectedLocation({ location, placeId: null }));
    };

    const handleOnCreatePlan = async () => {
        if (!placeSelected) return;
        dispatch(
            setSearchLocation({
                searchLocation: placeSelected.location,
                searchPlaceId: placeSelected.placeId,
            })
        );
        await router.push(Routes.plans.interest(true));
    };

    if (fetchCurrentLocationStatus && !location)
        return (
            <FetchLocationDialog
                fetchLocationRequestStatus={
                    fetchCurrentLocationStatus ?? RequestStatuses.PENDING
                }
                onRetry={() => getCurrentLocation().then()}
            />
        );

    return (
        <Layout
            navBar={<NavBar title="場所を指定してプランを作成" />}
            fillComponent={
                <MapPinSelector
                    center={mapCenter}
                    onSelectLocation={handleOnSelectLocation}
                    pinnedLocation={placeSelected?.location}
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
                <Head>
                    <title>好きな場所からプランを作る | poroto</title>
                </Head>
                <Layout>
                    <RoundedIconButton
                        icon={placeSelected ? MdDone : MdOutlineTouchApp}
                        disabled={placeSelected === null}
                        onClick={handleOnCreatePlan}
                    >
                        {placeSelected
                            ? "指定した場所からプランを作成"
                            : "タップして場所を選択"}
                    </RoundedIconButton>
                </Layout>
            </Box>
        </Layout>
    );
}
