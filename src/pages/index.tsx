import React from "react";
import { Container, Text } from "@chakra-ui/react";
import { CreatePlanFromCurrentLocationButton } from "src/view/top/CreatePlanFromCurrentLocationButton";
import { useRouter } from "next/router";
import { Routes } from "src/view/constants/router";
import { useAppDispatch } from "src/redux/redux";
import { createPlanFromLocation } from "src/redux/plan";
import { useLocation } from "src/view/hooks/useLocation";

const IndexPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { getCurrentLocation, isLoadingLocation, isRejected } = useLocation();

    const onClickCreatePlanFromCurrentLocation = async () => {
        const currentLocation = await getCurrentLocation();
        dispatch(createPlanFromLocation({
            location: {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude
            }
        }));
        await router.push(Routes.plans.select);
    }

    return <Container maxW="990px" px="16px" py="16px">
        <CreatePlanFromCurrentLocationButton onClick={onClickCreatePlanFromCurrentLocation} />
        {isLoadingLocation && <Text>現在地を取得中</Text>}
        {isRejected && <Text>現在地の取得を拒否されました。</Text>}
    </Container>
}

export default IndexPage
