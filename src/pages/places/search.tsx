import {Layout} from "src/view/common/Layout";
import {Box, VStack} from "@chakra-ui/react";
import {PlaceSearchBar} from "src/view/place/PlaceSearchBar";
import {PlaceSearchResults} from "src/view/place/PlaceSearchResults";
import {useEffect} from "react";
import {useAppDispatch} from "src/redux/redux";
import {reduxPlaceSearchSelector, resetPlaceSearchResults, searchPlacesByQuery,} from "src/redux/placeSearch";
import {PlaceSearchResult} from "src/domain/models/PlaceSearchResult";
import {createPlanByPlaceId} from "src/redux/plan";
import {useRouter} from "next/router";
import {Routes} from "src/view/constants/router";
import {MapPinSelector} from "src/view/place/MapPinSelector";
export default function PlaceSearchPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {placeSearchResults} = reduxPlaceSearchSelector();

    const handleOnSearch = (value: string) => {
        dispatch(searchPlacesByQuery({query: value}));
    }

    const handleOnClickPlace = (placeSearchResult: PlaceSearchResult) => {
        dispatch(createPlanByPlaceId({placeId: placeSearchResult.id}));
        router.push(Routes.plans.create).then()
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