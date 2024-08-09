import { VStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { createParam } from "solito";
import { PageMetaData } from "src/constant/meta";
import { RouteParams } from "src/constant/router";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { useGooglePlaceSearch } from "src/hooks/useGooglePlaceSearch";
import { usePlaceRecommendation } from "src/hooks/usePlaceRecommendation";
import { usePlaceSearchPage } from "src/hooks/usePlaceSearchPage";
import { FetchLocationDialog } from "src/view/location/FetchLocationDialog";
import { NavBar } from "src/view/navigation/NavBar";
import { PlaceRecommendationDialog } from "src/view/place/PlaceRecommendationDialog";
import { PlaceSearchPageComponent } from "src/view/place/PlaceSearchPage";

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
    const [skipCurrentLocation] = useParam(RouteParams.SkipCurrentLocation);
    const isSkipFetchCurrentLocation = skipCurrentLocation === "true";
    const { t } = useAppTranslation();

    const {
        mapCenter,
        fetchCurrentLocationStatus,
        isFetchingCurrentLocation,
        setMapCenter,
        setSearchQuery,
        selectLocation,
        createPlan,
    } = usePlaceSearchPage({
        isSkipFetchCurrentLocation,
    });

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

    if (isFetchingCurrentLocation)
        return (
            <FetchLocationDialog
                skipCurrentLocationLabel={t(
                    "place:skipCurrentLocationRetrieval"
                )}
                isSkipCurrentLocationVisible={true}
                fetchLocationRequestStatus={fetchCurrentLocationStatus}
            />
        );

    return (
        <VStack w="100%" h="100%" spacing={0}>
            <Head>
                <title>{t("ogp:placeSearchPageTitle")}</title>
            </Head>
            <NavBar />
            <PlaceSearchPageComponent
                mapCenter={mapCenter}
                pinnedLocation={placeSelected?.location}
                placeSearchResults={placeSearchResults}
                onSelectLocation={selectLocation}
                onSearchGooglePlacesByQuery={searchGooglePlacesByQuery}
                onSelectedSearchResult={onSelectedSearchResult}
                onOpenPlaceRecommendationDialog={
                    onOpenPlaceRecommendationDialog
                }
                onCreatePlan={() =>
                    createPlan({
                        placeSelected,
                    })
                }
            />
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
