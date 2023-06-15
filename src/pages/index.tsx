import { Container, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdOutlinePlace } from "react-icons/md";
import { setCurrentLocation, setSearchLocation } from "src/redux/location";
import { useAppDispatch } from "src/redux/redux";
import { BannerAd } from "src/view/ad/BannerAd";
import { Button } from "src/view/common/Button";
import { Routes } from "src/view/constants/router";
import { useLocation } from "src/view/hooks/useLocation";
import { PlaceSearchButton } from "src/view/place/PlaceSearchButton";

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
            <BannerAd />
        </>
    );
};

export default IndexPage;
