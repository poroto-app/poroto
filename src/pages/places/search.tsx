import { Box, Center, VStack } from "@chakra-ui/react";
import { getAnalytics, logEvent } from "@firebase/analytics";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MdDone, MdOutlineTouchApp } from "react-icons/md";
import { createParam } from "solito";
import { useRouter } from "solito/router";
import { AnalyticsEvents } from "src/constant/analytics";
import { locationSinjukuStation } from "src/constant/location";
import { PageMetaData } from "src/constant/meta";
import { RouteParams, Routes } from "src/constant/router";
import { Size } from "src/constant/size";
import { zIndex } from "src/constant/zIndex";
import { GeoLocation } from "src/data/graphql/generated";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { useGooglePlaceSearch } from "src/hooks/useGooglePlaceSearch";
import { useLocation } from "src/hooks/useLocation";
import { usePlaceRecommendation } from "src/hooks/usePlaceRecommendation";
import { setCurrentLocation, setSearchLocation } from "src/redux/location";
import {
    resetPlaceSearchResults,
    resetSelectedLocation,
    setSelectedLocation,
} from "src/redux/placeSearch";
import { useAppDispatch } from "src/redux/redux";
import { RoundedIconButton } from "src/view/common/RoundedIconButton";
import { FetchLocationDialog } from "src/view/location/FetchLocationDialog";
import { NavBar } from "src/view/navigation/NavBar";
import { MapPinSelector } from "src/view/place/MapPinSelector";
import { PlaceRecommendationDialog } from "src/view/place/PlaceRecommendationDialog";
import { PlaceSearch } from "src/view/place/PlaceSearch";
import { ShowPlaceRecommendationButton } from "src/view/place/ShowPlaceRecommendationButton";

const { useParam } = createParam();

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
    const [skipCurrentLocation] = useParam(RouteParams.SkipCurrentLocation);
    const isSkipFetchCurrentLocation = skipCurrentLocation === "true";
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
                <Box
                    w="100%"
                    maxW={Size.mainContentWidth + "px"}
                    pt="24px"
                    px="8px"
                    zIndex={10}
                    position="relative"
                >
                    <PlaceSearch
                        googlePlaceSearchResults={placeSearchResults}
                        onSearchGooglePlacesByQuery={searchGooglePlacesByQuery}
                        onClickGooglePlaceSearchResult={onSelectedSearchResult}
                        placeSearchActions={
                            <ShowPlaceRecommendationButton
                                onClick={onOpenPlaceRecommendationDialog}
                            />
                        }
                    />
                </Box>
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
            <Box
                px="8px"
                pb="32px"
                w="100%"
                maxW={Size.mainContentWidth + "px"}
            >
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
