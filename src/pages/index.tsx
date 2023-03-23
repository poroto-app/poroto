import React from "react";
import {Container} from "@chakra-ui/react";
import {CreatePlanFromCurrentLocationButton} from "src/view/top/CreatePlanFromCurrentLocationButton";
import {useRouter} from "next/router";
import {Routes} from "src/view/constants/router";
import {useAppDispatch} from "src/redux/redux";
import {createPlanFromLocation} from "src/redux/plan";

const IndexPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const onClickCreatePlanFromCurrentLocation = () => {
        // TODO: 現在地を取得する
        dispatch(createPlanFromLocation({location: {latitude: 0, longitude: 0}}))
        router.push(Routes.plans.select).then()
    }


    return <Container maxW="990px" px="16px" py="16px">
        <CreatePlanFromCurrentLocationButton onClick={onClickCreatePlanFromCurrentLocation}/>
    </Container>
}

export default IndexPage
