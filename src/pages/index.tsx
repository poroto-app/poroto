import React from "react";
import styled from "styled-components";
import { Container, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Routes } from "src/view/constants/router";
import { useAppDispatch } from "src/redux/redux";
import { useLocation } from "src/view/hooks/useLocation";
import { PlaceSearchButton } from "src/view/place/PlaceSearchButton";
import { Button } from "src/view/common/Button";
import { MdOutlinePlace } from "react-icons/md";
import { setCurrentLocation, setSearchLocation } from "src/redux/location";

const IndexPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { getCurrentLocation, isLoadingLocation, isRejected } = useLocation();

    const onClickCreatePlanFromCurrentLocation = async () => {
        const currentLocation = await getCurrentLocation();
        dispatch(setCurrentLocation({ currentLocation }));
        dispatch(setSearchLocation({ searchLocation: currentLocation }));
        await router.push(Routes.plans.interest);
    };

    const StyledDiv = styled.div`
        position: fixed;
        bottom: 0;
        width: 100%;
        text-align: center;
    `;

    const InnerDiv1 = styled.div`
        padding: 10px;
        font-size: 13px;
        text-align: left;
    `;

    const InnerDiv2 = styled.div`
        padding: 10px 10px;
        border: 1px solid #333;
    `;

    const StyledIns = styled.ins`
        display: block;
        text-align: center;
    `;

    return (
        <>
            <Container maxW="990px" px="16px">
                <VStack w="100%" spacing={4} pt="32px">
                    <PlaceSearchButton />
                    <Button
                        text="現在地からプランを作成"
                        icon={MdOutlinePlace}
                        onClick={onClickCreatePlanFromCurrentLocation}
                    />
                </VStack>
                {isLoadingLocation && <Text>現在地を取得中</Text>}
                {isRejected && <Text>現在地の取得を拒否されました。</Text>}
            </Container>
            <StyledDiv>
                <InnerDiv1>スポンサーリンク</InnerDiv1>
                <InnerDiv2>広告</InnerDiv2>
                <StyledIns
                    className="adsbygoogle"
                    data-ad-layout="in-article"
                    data-ad-format="fluid"
                    data-ad-client={process.env.ADSENSE_KEY_ClIENT}
                    data-ad-slot={process.env.ADSENSE_KEY_SLOT}
                ></StyledIns>
            </StyledDiv>
        </>
    );
};

export default IndexPage;
