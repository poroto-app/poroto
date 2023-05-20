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
import {reduxLocationSelector, setLocation} from "src/redux/location";
import {useLocation} from "src/view/hooks/useLocation";
import {GeoLocation} from "src/data/graphql/generated";
import {MapPinSelector} from "src/view/place/MapPinSelector";
import {locationSinjukuStation} from "src/view/constants/location";

export default function PlaceSearchPage() {
    const dispatch = useAppDispatch();
    const {placeSearchResults, locationSelected} = reduxPlaceSearchSelector();
    const {location} = reduxLocationSelector();
    const {getCurrentLocation, isLoadingLocation, isRejected} = useLocation();

    useEffect(() => {
        getCurrentLocation()
            .then((location) => {
                dispatch(setLocation({location}));
            });
    }, [location]);

    const handleOnSearch = (value: string) => {
        dispatch(searchPlacesByQuery({query: value}));
    }

    const handleOnClickPlace = (placeSearchResult: PlaceSearchResult) => {
        dispatch(fetchGeoLocationByPlaceId({placeId: placeSearchResult.id}));
    }

    const handleOnSelectLocation = (location: GeoLocation) => {
        dispatch(setSelectedLocation({location}));
    }

    useEffect(() => {
        dispatch(resetPlaceSearchResults());
        return () => {
            dispatch(resetPlaceSearchResults());
        }
    }, []);

    return <Layout>
        <VStack w="100%" h="100%" pt="24px" spacing={4} position="relative" zIndex={10}>
            <Box w="100%" px="16px">
                <PlaceSearchBar onSearch={handleOnSearch}/>
            </Box>
            <Box w="100%"  backgroundColor="white" borderRadius={5}>
                <PlaceSearchResults
                    places={(placeSearchResults || []).slice(0, 5)}
                    onClickPlace={handleOnClickPlace}
                />
            </Box>
        </VStack>
        <Box position="fixed" top={0} right={0} bottom={0} left={0} zIndex={0}>
            <MapPinSelector
                center={location ?? locationSinjukuStation}
                onSelectLocation={handleOnSelectLocation}
                pinnedLocation={locationSelected}
            />
        </Box>
    </Layout>
}