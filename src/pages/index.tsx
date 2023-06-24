import { Center, Divider, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdOutlinePlace } from "react-icons/md";
import { setCurrentLocation, setSearchLocation } from "src/redux/location";
import { fetchPlansRecentlyCreated, reduxPlanSelector } from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { BannerAd } from "src/view/ad/BannerAd";
import { Button } from "src/view/common/Button";
import { Routes } from "src/view/constants/router";
import { useLocation } from "src/view/hooks/useLocation";
import { FetchLocationDialog } from "src/view/location/FetchLocationDialog";
import { PlaceSearchButton } from "src/view/place/PlaceSearchButton";
import { PlanPreview } from "src/view/plan/PlanPreview";

const IndexPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { plansRecentlyCreated } = reduxPlanSelector();
    const {
        getCurrentLocation,
        isLoadingLocation,
        isRejected,
        location,
        resetLocationState,
    } = useLocation();

    useEffect(() => {
        dispatch(fetchPlansRecentlyCreated());
    }, []);

    // 位置情報が取得できたら、興味を聞く画面に移動
    useEffect(() => {
        if (location) {
            const currentLocation = location;
            dispatch(setCurrentLocation({ currentLocation }));
            dispatch(setSearchLocation({ searchLocation: currentLocation }));
            router.push(Routes.plans.interest);
        }
    }, [location]);

    return (
        <Center w="100%">
            <VStack
                maxW="990px"
                w="100%"
                px="16px"
                divider={<Divider />}
                spacing="24px"
            >
                <VStack w="100%" spacing={4} pt="32px">
                    <PlaceSearchButton />
                    <Button
                        text="現在地からプランを作成"
                        icon={MdOutlinePlace}
                        onClick={() => getCurrentLocation().then()}
                    />
                </VStack>
                <VStack px="16px" spacing={16} w="100%">
                    {plansRecentlyCreated &&
                        plansRecentlyCreated.map((plan, index) => (
                            <Link
                                href={Routes.plans.plan(plan.id)}
                                key={index}
                                style={{ width: "100%" }}
                            >
                                <Center>
                                    <PlanPreview plan={plan} />
                                </Center>
                            </Link>
                        ))}
                </VStack>
            </VStack>
            <BannerAd />
            <FetchLocationDialog
                isLoadingLocation={isLoadingLocation}
                isRejected={isRejected}
                isHome={true}
                onClickClose={() => resetLocationState()}
                onRetry={() => getCurrentLocation().then()}
            />
        </Center>
    );
};

export default IndexPage;
