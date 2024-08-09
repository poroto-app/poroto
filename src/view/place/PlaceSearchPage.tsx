import { Check, MousePointerClick } from "@tamagui/lucide-icons";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { zIndex } from "src/constant/zIndex";
import { GeoLocation } from "src/domain/models/GeoLocation";
import { PlaceSearchResult } from "src/domain/models/PlaceSearchResult";
import { hasValue } from "src/domain/util/null";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { RoundedButton } from "src/view/common/RoundedButton";
import { MapPinSelector } from "src/view/place/MapPinSelector";
import { PlaceSearch } from "src/view/place/PlaceSearch";
import { ShowPlaceRecommendationButton } from "src/view/place/ShowPlaceRecommendationButton";
import { isWeb, YStack } from "tamagui";

export function PlaceSearchPageComponent({
    mapCenter,
    pinnedLocation,
    placeSearchResults,
    onSelectLocation,
    onSearchGooglePlacesByQuery,
    onSelectedSearchResult,
    onOpenPlaceRecommendationDialog,
    onCreatePlan,
}: {
    mapCenter: GeoLocation;
    pinnedLocation: GeoLocation | null;

    placeSearchResults: PlaceSearchResult[] | null;

    onSelectLocation?: (location: GeoLocation) => void;
    onSearchGooglePlacesByQuery?: (query: string) => void;
    onSelectedSearchResult?: (place: PlaceSearchResult) => void;
    onOpenPlaceRecommendationDialog?: () => void;
    onCreatePlan?: () => void;
}) {
    return (
        <YStack w="100%" flex={1} position="relative">
            <YStack position="absolute" top={0} right={0} bottom={0} left={0}>
                <MapPinSelector
                    center={mapCenter}
                    onSelectLocation={onSelectLocation}
                    pinnedLocation={pinnedLocation}
                />
            </YStack>
            <YStack
                w="100%"
                maxWidth={Size.mainContentWidth}
                pt={Padding.p24}
                px={Padding.p8}
                zIndex={10}
                position="relative"
            >
                <PlaceSearch
                    placeSearchBarAutoFocus={isWeb}
                    googlePlaceSearchResults={placeSearchResults}
                    onSearchGooglePlacesByQuery={onSearchGooglePlacesByQuery}
                    onClickGooglePlaceSearchResult={onSelectedSearchResult}
                    placeSearchActions={
                        <ShowPlaceRecommendationButton
                            onClick={onOpenPlaceRecommendationDialog}
                        />
                    }
                />
            </YStack>
            {/*
            MEMO:
            `space-between` で余白をつけようとすると、その部分を選択できなくなってしまうため、
            `position: fixed;` で位置を調整している
         */}
            <SearchButton
                isPlaceSelected={hasValue(pinnedLocation)}
                onClick={onCreatePlan}
            />
        </YStack>
    );
}

const SearchButton = ({
    isPlaceSelected,
    onClick,
}: {
    isPlaceSelected: boolean;
    onClick: () => void;
}) => {
    const { t } = useAppTranslation();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const position: "absolute" = isWeb ? "fixed" : "absolute";

    return (
        <YStack
            position={position}
            left={0}
            bottom={0}
            right={0}
            zIndex={zIndex.footer}
        >
            <YStack
                px={Padding.p8}
                pb={Padding.p32}
                w="100%"
                maxWidth={Size.mainContentWidth}
            >
                <RoundedButton
                    icon={isPlaceSelected ? Check : MousePointerClick}
                    disabled={!isPlaceSelected}
                    onClick={onClick}
                >
                    {isPlaceSelected
                        ? t("plan:createPlanFromSelectedPlace")
                        : t("place:tapToSelectPlace")}
                </RoundedButton>
            </YStack>
        </YStack>
    );
};
