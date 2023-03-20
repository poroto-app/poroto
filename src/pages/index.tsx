import React from "react";
import {Container} from "@chakra-ui/react";
import {CreatePlanFromCurrentLocationButton} from "src/view/top/CreatePlanFromCurrentLocationButton";
import {useRouter} from "next/router";
import {Routes} from "src/view/constants/router";
import {useLocation} from "src/view/hooks/useLocation";

const IndexPage = () => {
    const router = useRouter();
    const {getCurrentLocation} = useLocation();

    const onClickCreatePlanFromCurrentLocation = async () => {
        const currentLocation = await getCurrentLocation();
        console.log(currentLocation);
        await router.push(Routes.plans.select);
    }

    return <Container maxW="990px" px="16px" py="16px">
        <CreatePlanFromCurrentLocationButton onClick={onClickCreatePlanFromCurrentLocation}/>
    </Container>
}

export default IndexPage
