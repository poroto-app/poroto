import React from "react";
import {Container} from "@chakra-ui/react";
import {CreatePlanFromCurrentLocationButton} from "src/view/top/CreatePlanFromCurrentLocationButton";

const IndexPage = () => (
    <Container maxW="990px" px="16px" py="16px">
        <CreatePlanFromCurrentLocationButton onClick={() => 0}/>
    </Container>
)

export default IndexPage
