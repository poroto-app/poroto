import { ReactNode } from "react";
import { Padding } from "src/constant/padding";
import { PlaceSearchResult } from "src/domain/models/PlaceSearchResult";
import { PlaceSearchBar } from "src/view/place/PlaceSearchBar";
import { PlaceSearchResults } from "src/view/place/PlaceSearchResults";
import { YStack } from "tamagui";

export type PlaceSearchProps = {
    googlePlaceSearchResults?: PlaceSearchResult[];
    placeSearchActions?: ReactNode;
    onSearchGooglePlacesByQuery: (query: string) => void;
    onClickGooglePlaceSearchResult: (searchResult: PlaceSearchResult) => void;
};

export function PlaceSearch({
    placeSearchActions,
    googlePlaceSearchResults,
    onSearchGooglePlacesByQuery,
    onClickGooglePlaceSearchResult,
}: PlaceSearchProps) {
    const isEmptySearchResults =
        !googlePlaceSearchResults || googlePlaceSearchResults.length === 0;
    return (
        <YStack gap={Padding.p8} w="100%" alignItems="center">
            <PlaceSearchBar onSearch={onSearchGooglePlacesByQuery} />
            {isEmptySearchResults && placeSearchActions && placeSearchActions}
            {!isEmptySearchResults && (
                <YStack
                    w="100%"
                    backgroundColor="white"
                    borderRadius={5}
                    shadowOffset={{ width: 0, height: 5 }}
                    shadowRadius={20}
                    shadowColor="rgba(0, 0, 0, 0.1)"
                    shadowOpacity={isEmptySearchResults ? 0 : 1}
                >
                    <PlaceSearchResults
                        places={googlePlaceSearchResults}
                        onClickPlace={(place) =>
                            onClickGooglePlaceSearchResult(place)
                        }
                    />
                </YStack>
            )}
        </YStack>
    );
}
