import { Center, Divider, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdOutlinePlace } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroller";
import { setCurrentLocation, setSearchLocation } from "src/redux/location";
import { fetchPlansRecentlyCreated, reduxPlanSelector } from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { BannerAd } from "src/view/ad/BannerAd";
import { RoundedIconButton } from "src/view/common/RoundedIconButton";
import { Routes } from "src/view/constants/router";
import { useLocation } from "src/view/hooks/useLocation";
import { PlaceSearchButton } from "src/view/place/PlaceSearchButton";
import { PlanPreview } from "src/view/plan/PlanPreview";

const IndexPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { plansRecentlyCreated, nextPageTokenPlansRecentlyCreated } =
        reduxPlanSelector();
    const { getCurrentLocation, isLoadingLocation, isRejected } = useLocation();

    const onClickCreatePlanFromCurrentLocation = async () => {
        const currentLocation = await getCurrentLocation();
        dispatch(setCurrentLocation({ currentLocation }));
        dispatch(setSearchLocation({ searchLocation: currentLocation }));
        await router.push(Routes.plans.interest);
    };

    useEffect(() => {
        dispatch(fetchPlansRecentlyCreated());
    }, []);

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
                    <RoundedIconButton
                        icon={MdOutlinePlace}
                        onClick={onClickCreatePlanFromCurrentLocation}
                    >
                        現在地からプランを作成
                    </RoundedIconButton>
                </VStack>
                {isLoadingLocation && <Text>現在地を取得中</Text>}
                {isRejected && <Text>現在地の取得を拒否されました。</Text>}

                {plansRecentlyCreated && (
                    // TODO: React 18に対応
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    <InfiniteScroll
                        loadMore={() => dispatch(fetchPlansRecentlyCreated())}
                        hasMore={nextPageTokenPlansRecentlyCreated !== null}
                    >
                        <VStack px="16px" spacing={16} w="100%">
                            {plansRecentlyCreated.map((plan, index) => (
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
                    </InfiniteScroll>
                )}
            </VStack>
            <BannerAd />
        </Center>
    );
};

export default IndexPage;
