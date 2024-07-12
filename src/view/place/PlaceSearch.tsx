import { Box, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { PlaceSearchResult } from "src/domain/models/PlaceSearchResult";
import { PlaceSearchBar } from "src/view/place/PlaceSearchBar";
import { PlaceSearchResults } from "src/view/place/PlaceSearchResults";

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
        <VStack spacing={4}>
            <PlaceSearchBar onSearch={onSearchGooglePlacesByQuery} />
            {isEmptySearchResults && placeSearchActions && placeSearchActions}
            <Box
                w="100%"
                backgroundColor="white"
                borderRadius={5}
                boxShadow={
                    !isEmptySearchResults && "0px 5px 20px 0px rgb(0 0 0 / 10%)"
                }
            >
                <PlaceSearchResults
                    places={googlePlaceSearchResults}
                    onClickPlace={(place) =>
                        onClickGooglePlaceSearchResult(place)
                    }
                />
            </Box>
        </VStack>
    );
}
