import {Layout} from "src/view/common/Layout";
import {Box, VStack} from "@chakra-ui/react";
import {PlaceSearchBar} from "src/view/place/PlaceSearchBar";
import {PlaceSearchResults} from "src/view/place/PlaceSearchResults";
import {useEffect, useState} from "react";
import {useAppDispatch} from "src/redux/redux";
import {
    fetchGeoLocationByPlaceId,
    reduxPlaceSearchSelector,
    resetPlaceSearchResults,
    resetSelectedLocation,
    searchPlacesByQuery,
    setMoveToSelectedLocation,
    setSelectedLocation,
} from "src/redux/placeSearch";
import {PlaceSearchResult} from "src/domain/models/PlaceSearchResult";
import {setCurrentLocation, setSearchLocation,} from "src/redux/location";
import {useLocation} from "src/view/hooks/useLocation";
import {GeoLocation} from "src/data/graphql/generated";
import {Button} from "src/view/common/Button";
import {MapPinSelector} from "src/view/place/MapPinSelector";
import {locationSinjukuStation} from "src/view/constants/location";
import {MdDone, MdOutlineTouchApp} from "react-icons/md";
import {Routes} from "src/view/constants/router";
import {useRouter} from "next/router";
import {createPlanFromLocation} from "src/redux/plan";
import {copyObject} from "src/domain/util/object";

export default function PlaceSearchPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {placeSearchResults, locationSelected, moveToSelectedLocation} = reduxPlaceSearchSelector();
    const {getCurrentLocation} = useLocation();
    const [mapCenter, setMapCenter] = useState<GeoLocation>(locationSinjukuStation);

    useEffect(() => {
        getCurrentLocation()
            .then((currentLocation) => {
                dispatch(setCurrentLocation({currentLocation}));
                if (mapCenter === locationSinjukuStation) {
                    setMapCenter(currentLocation);
                }
            });
    }, []);

    useEffect(() => {
        dispatch(resetPlaceSearchResults());
        dispatch(resetSelectedLocation());
        return () => {
            dispatch(resetPlaceSearchResults());
            dispatch(resetSelectedLocation());
        }
    }, []);

    useEffect(() => {
        if (locationSelected && moveToSelectedLocation) {
            setMapCenter(locationSelected);
        }

        return () => {
            dispatch(setMoveToSelectedLocation(false));
        }
    }, [copyObject(location), copyObject(locationSelected), moveToSelectedLocation]);

    const handleOnSearch = (value: string) => {
        dispatch(searchPlacesByQuery({query: value}));
    }

    const handleOnClickPlace = (placeSearchResult: PlaceSearchResult) => {
        dispatch(fetchGeoLocationByPlaceId({placeId: placeSearchResult.id}));
        dispatch(resetPlaceSearchResults());
    }

    const handleOnSelectLocation = (location: GeoLocation) => {
        dispatch(setSelectedLocation({location}));
    }

    const handleOnCreatePlan = async () => {
        if (!locationSelected) return;
        dispatch(setSearchLocation({searchLocation: locationSelected}));
        await router.push(Routes.plans.interest);
    }

    return <Layout>
        <Box position="fixed" top={0} right={0} bottom={0} left={0} zIndex={0}>
            <MapPinSelector
                center={mapCenter}
                onSelectLocation={handleOnSelectLocation}
                pinnedLocation={locationSelected}
            />
        </Box>
        <VStack w="100%" h="100%" pt="24px" px="8px" spacing={4} position="relative" zIndex={10}>
            <Box w="100%">
                <PlaceSearchBar onSearch={handleOnSearch}/>
            </Box>
            <Box w="100%"
                 backgroundColor="white" borderRadius={5}
                 boxShadow={(placeSearchResults && placeSearchResults.length !== 0) && "0px 5px 20px 0px rgb(0 0 0 / 10%)"}
            >
                <PlaceSearchResults
                    places={(placeSearchResults || []).slice(0, 5)}
                    onClickPlace={handleOnClickPlace}
                />
            </Box>
        </VStack>
        {/*
            MEMO:
            `space-between` で余白をつけようとすると、その部分を選択できなくなってしまうため、
            `position: fixed;` で位置を調整している
         */}
        <Box position="fixed" left={0} bottom="32px" right={0} px="8px">
            <Layout>
                <Button
                    text={locationSelected ? "指定した場所からプランを作成" : "タップして場所を選択"}
                    icon={locationSelected ? MdDone : MdOutlineTouchApp}
                    disabled={locationSelected === null}
                    onClick={handleOnCreatePlan}
                />
            </Layout>
        </Box>
    </Layout>
}