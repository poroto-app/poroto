import { Box, Center, VStack } from "@chakra-ui/react";
import { getAnalytics, logEvent } from "@firebase/analytics";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdDone, MdOutlineTouchApp } from "react-icons/md";
import { GeoLocation } from "src/data/graphql/generated";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { setCurrentLocation, setSearchLocation } from "src/redux/location";
import {
    resetPlaceSearchResults,
    resetSelectedLocation,
    setSelectedLocation,
} from "src/redux/placeSearch";
import { useAppDispatch } from "src/redux/redux";
import { RoundedIconButton } from "src/view/common/RoundedIconButton";
import { AnalyticsEvents } from "src/view/constants/analytics";
import { locationSinjukuStation } from "src/view/constants/location";
import { PageMetaData } from "src/view/constants/meta";
import { RouteParams, Routes } from "src/view/constants/router";
import { Size } from "src/view/constants/size";
import { zIndex } from "src/view/constants/zIndex";
import { useGooglePlaceSearch } from "src/view/hooks/useGooglePlaceSearch";
import { useLocation } from "src/view/hooks/useLocation";
import { usePlaceRecommendation } from "src/view/hooks/usePlaceRecommendation";
import { FetchLocationDialog } from "src/view/location/FetchLocationDialog";
import { NavBar } from "src/view/navigation/NavBar";
import { MapPinSelector } from "src/view/place/MapPinSelector";
import { PlaceRecommendationDialog } from "src/view/place/PlaceRecommendationDialog";
import { PlaceSearchBar } from "src/view/place/PlaceSearchBar";
import { PlaceSearchResults } from "src/view/place/PlaceSearchResults";
import { ShowPlaceRecommendationButton } from "src/view/place/ShowPlaceRecommendationButton";

export default function Page() {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>{PageMetaData(t).place.search.title}</title>
                <meta
                    name="description"
                    content={PageMetaData(t).place.search.description}
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
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [mapCenter, setMapCenter] = useState<GeoLocation>(
        locationSinjukuStation
    );

    const {
        fetchCurrentLocationStatus,
        getCurrentLocation,
        location,
        resetLocationState,
        checkGeolocationPermission,
    } = useLocation();

    const {
        placeSearchResults,
        placeSelected,
        searchGooglePlacesByQuery,
        onSelectedSearchResult,
    } = useGooglePlaceSearch({
        onMoveToSelectedLocation: ({ location }) => {
            setMapCenter(location);
        },
    });

    const {
        isPlaceRecommendationButtonVisible,
        isPlaceRecommendationDialogVisible,
        recommendedPlacesToCreateFromLocation,
        fetchPlaceRecommendationsRequestStatus,
        onOpenPlaceRecommendationDialog,
        onClosePlaceRecommendationDialog,
        onRetryFetchPlaceRecommendations,
        onSelectedRecommendedPlace,
    } = usePlaceRecommendation({
        onSelectPlace: ({ place }) => {
            setSearchQuery(place.name);
            setMapCenter(place.location);
        },
    });

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

    const handleOnSelectLocation = (location: GeoLocation) => {
        dispatch(setSelectedLocation({ location, placeId: null }));
    };

    const handleOnCreatePlan = async () => {
        if (!placeSelected) return;
        logEvent(
            getAnalytics(),
            AnalyticsEvents.CreatePlan.StartCreatePlanFromSelectedLocation
        );
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

    if (fetchCurrentLocationStatus && !location)
        return (
            <FetchLocationDialog
                skipLocationLabel={t("place:skipCurrentLocationRetrieval")}
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
                <title>{t("ogp:placeSearchPageTitle")}</title>
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
                        <PlaceSearchBar
                            defaultValue={searchQuery}
                            onSearch={searchGooglePlacesByQuery}
                        />
                    </Box>
                    {isPlaceRecommendationButtonVisible && (
                        <ShowPlaceRecommendationButton
                            onClick={onOpenPlaceRecommendationDialog}
                        />
                    )}
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
                            places={placeSearchResults}
                            onClickPlace={onSelectedSearchResult}
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
            <>
                <PlaceRecommendationDialog
                    visible={isPlaceRecommendationDialogVisible}
                    places={recommendedPlacesToCreateFromLocation}
                    status={fetchPlaceRecommendationsRequestStatus}
                    onClose={onClosePlaceRecommendationDialog}
                    onRetry={onRetryFetchPlaceRecommendations}
                    onSelectPlace={onSelectedRecommendedPlace}
                />
            </>
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
    const { t } = useTranslation();
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
                        ? t("place:tapToSelectPlace")
                        : t("plan:createPlanFromSelectedPlace")}
                </RoundedIconButton>
            </Box>
        </Center>
    );
};
