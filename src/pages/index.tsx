import React from "react";
import {Container, Text, VStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {Routes} from "src/view/constants/router";
import {useAppDispatch} from "src/redux/redux";
import {createPlanFromLocation} from "src/redux/plan";
import {useLocation} from "src/view/hooks/useLocation";
import {setLocation} from "src/redux/location";
import {PlaceSearchButton} from "src/view/place/PlaceSearchButton";
import {Button} from "src/view/common/Button";
import {MdOutlinePlace} from "react-icons/md";

const IndexPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {getCurrentLocation, isLoadingLocation, isRejected} = useLocation();

    const onClickCreatePlanFromCurrentLocation = async () => {
        const currentLocation = await getCurrentLocation();
        dispatch(setLocation({location: currentLocation}));
        dispatch(createPlanFromLocation({
            location: {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude
            }
        }));
        await router.push(Routes.plans.interest);
    }

    return <Container maxW="990px" px="16px">
        <VStack w="100%" spacing={4} pt="32px">
            <PlaceSearchButton/>
            <Button text="現在地からプランを作成" icon={MdOutlinePlace} onClick={onClickCreatePlanFromCurrentLocation}/>
        </VStack>
        {isLoadingLocation && <Text>現在地を取得中</Text>}
        {isRejected && <Text>現在地の取得を拒否されました。</Text>}
    </Container>
}

export default IndexPage
