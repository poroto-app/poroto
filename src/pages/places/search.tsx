import {Layout} from "src/view/common/Layout";
import {Box, VStack} from "@chakra-ui/react";
import {PlaceSearchBar} from "src/view/place/PlaceSearchBar";
import {PlaceSearchResults} from "src/view/place/PlaceSearchResults";
import {useEffect} from "react";
import {useAppDispatch} from "src/redux/redux";
import {
    fetchGeoLocationByPlaceId,
    reduxPlaceSearchSelector,
    resetPlaceSearchResults,
    searchPlacesByQuery,
    setSelectedLocation,
} from "src/redux/placeSearch";
import {PlaceSearchResult} from "src/domain/models/PlaceSearchResult";
import {GeoLocation} from "src/data/graphql/generated";
import {useRouter} from "next/router";

export default function PlaceSearchPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {placeSearchResults} = reduxPlaceSearchSelector();

    const handleOnSearch = (value: string) => {
        dispatch(searchPlacesByQuery({query: value}));
    }

    const handleOnClickPlace = (placeSearchResult: PlaceSearchResult) => {
        dispatch(fetchGeoLocationByPlaceId({placeId: placeSearchResult.id}));
    }

    useEffect(() => {
        dispatch(resetPlaceSearchResults());
        return () => {
            dispatch(resetPlaceSearchResults());
        }
    }, []);

    return <Layout>
        <VStack w="100%" h="100%" pt="24px" spacing={4}>
            <Box w="100%" px="16px">
                <PlaceSearchBar onSearch={handleOnSearch}/>
            </Box>
            <PlaceSearchResults
                places={placeSearchResults || []}
                onClickPlace={handleOnClickPlace}
            />
        </VStack>
    </Layout>
}