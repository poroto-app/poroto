import React from "react";
import {Container} from "@chakra-ui/react";
import {CreatePlanFromCurrentLocationButton} from "src/view/top/CreatePlanFromCurrentLocationButton";
import {useRouter} from "next/router";
import {Routes} from "src/view/constants/router";

const IndexPage = () => {
    const router = useRouter();

    const onClickCreatePlanFromCurrentLocation = () => {
        router.push(Routes.plans.select).then()
    }


    return <Container maxW="990px" px="16px" py="16px">
        <CreatePlanFromCurrentLocationButton onClick={onClickCreatePlanFromCurrentLocation}/>
    </Container>
}

export default IndexPage
