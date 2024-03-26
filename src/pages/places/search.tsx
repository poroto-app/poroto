import { Box, Center, VStack } from "@chakra-ui/react";
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
import { NavBar } from "src/view/common/NavBar";
import { RoundedIconButton } from "src/view/common/RoundedIconButton";
import { locationSinjukuStation } from "src/view/constants/location";
import { PageMetaData } from "src/view/constants/meta";
import { RouteParams, Routes } from "src/view/constants/router";
import { Size } from "src/view/constants/size";
import { zIndex } from "src/view/constants/zIndex";
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
    const isSkipFetchCurrentLocation =
        router.query[RouteParams.SkipCurrentLocation] === "true";
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
                skipLocationLabel="現在地取得をスキップする"
                isSkipCurrentLocationVisible={true}
                fetchLocationRequestStatus={
                    fetchCurrentLocationStatus ?? RequestStatuses.PENDING
                }
                onRetry={() => getCurrentLocation().then()}
            />
        );

    return (
        <VStack w="100%" h="100%" spacing={0}>
            <Head>
                <title>好きな場所からプランを作る | poroto</title>
            </Head>
            <NavBar />
            <VStack w="100%" h="100%" position="relative">
                <Box position="absolute" top={0} right={0} bottom={0} left={0}>
                    <MapPinSelector
                        center={mapCenter}
                        onSelectLocation={handleOnSelectLocation}
                        pinnedLocation={placeSelected?.location}
                    />
                </Box>
                <VStack
                    w="100%"
                    maxW={Size.mainContentWidth}
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
                <SearchButton
                    placeSelected={placeSelected !== null}
                    onClick={handleOnCreatePlan}
                />
            </VStack>
        </VStack>
    );
}

const SearchButton = ({
    placeSelected,
    onClick,
}: {
    placeSelected: boolean;
    onClick: () => void;
}) => {
    return (
        <Center
            position="fixed"
            left={0}
            bottom={0}
            right={0}
            zIndex={zIndex.footer}
        >
            <Box px="8px" pb="32px" w="100%" maxW={Size.mainContentWidth}>
                <RoundedIconButton
                    icon={placeSelected ? MdDone : MdOutlineTouchApp}
                    disabled={!placeSelected}
                    onClick={onClick}
                >
                    {placeSelected
                        ? "タップして場所を選択"
                        : "指定した場所からプランを作成"}
                </RoundedIconButton>
            </Box>
        </Center>
    );
};
