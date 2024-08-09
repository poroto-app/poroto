import { createParam } from "solito";
import { RouteParams } from "src/constant/router";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { useGooglePlaceSearch } from "src/hooks/useGooglePlaceSearch";
import { usePlaceRecommendation } from "src/hooks/usePlaceRecommendation";
import { usePlaceSearchPage } from "src/hooks/usePlaceSearchPage";
import { FetchLocationDialog } from "src/view/location/FetchLocationDialog";
import { PlaceSearchPageComponent } from "src/view/place/PlaceSearchPage";
import { YStack } from "tamagui";

const { useParam } = createParam();

export default function SearchPage() {
    const { t } = useAppTranslation();
    const [skipCurrentLocation] = useParam(RouteParams.SkipCurrentLocation);
    const isSkipFetchCurrentLocation = skipCurrentLocation === "true";

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
        <YStack w="100%" h="100%" gap={0}>
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
        </YStack>
    );
}
