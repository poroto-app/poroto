import { Center, Text, VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { Plan } from "src/domain/models/Plan";
import {
    createPlanFromPlanEntity,
    PlannerApi,
} from "src/domain/plan/PlannerApi";
import {
    fetchNearbyPlans,
    fetchPlansRecentlyCreated,
    pushPlansRecentlyCreated,
    reduxPlanSelector,
} from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { NavBar } from "src/view/common/NavBar";
import { Routes } from "src/view/constants/router";
import { Size } from "src/view/constants/size";
import { useLocation } from "src/view/hooks/useLocation";
import { PlanPreview } from "src/view/plan/PlanPreview";
import { CreatePlanSection } from "src/view/top/CreatePlanSection";

type Props = {
    plansRecentlyCreated: Plan[];
    nextPageTokenPlansRecentlyCreated: string | null;
};

const IndexPage = (props: Props) => {
    const dispatch = useAppDispatch();
    const {
        plansRecentlyCreated,
        nextPageTokenPlansRecentlyCreated,
        plansNearby,
    } = reduxPlanSelector();
    const { checkGeolocationPermission, getCurrentLocation } = useLocation();

    // 位置情報が利用可能な場合は付近で作成されたプランを取得する
    useEffect(() => {
        const fetchNearbyPlansWithCurrentLocation = async () => {
            const isGranted = checkGeolocationPermission();
            if (!isGranted) return;

            const currentLocation = await getCurrentLocation();
            if (!currentLocation) return;
            dispatch(fetchNearbyPlans({ currentLocation, limit: 5 }));
        };

        fetchNearbyPlansWithCurrentLocation().then();
    }, []);

    useEffect(() => {
        // 初期表示時のみISRで取得したプランをReduxに保存する
        if (!plansRecentlyCreated)
            dispatch(
                pushPlansRecentlyCreated({
                    plans: props.plansRecentlyCreated,
                    nextPageTokenPlansRecentlyCreated:
                        props.nextPageTokenPlansRecentlyCreated,
                })
            );
    }, [plansRecentlyCreated]);

    return (
        <VStack w="100%" spacing={0}>
            <NavBar />
            <CreatePlanSection />
            <Center w="100%">
                <VStack
                    w="100%"
                    maxW={Size.mainContentWidth}
                    px="16px"
                    py="48px"
                    spacing="24px"
                >
                    {/* TODO: 位置情報をONにすると近くのプランを取得できることを伝えるボタンを配置 */}
                    {/* TODO: 取得中のときはプレースホルダーを表示 */}
                    {plansNearby && (
                        <VStack w="100%" spacing={4}>
                            <Text
                                fontSize="20px"
                                fontWeight="bold"
                                w="100%"
                                maxW="600px"
                                textAlign="start"
                            >
                                近くで作られたプラン
                            </Text>
                            <VStack spacing={16} w="100%">
                                {plansNearby.map((plan, index) => (
                                    <PlanPreview
                                        key={index}
                                        link={Routes.plans.plan(plan.id)}
                                        plan={plan}
                                    />
                                ))}
                            </VStack>
                        </VStack>
                    )}
                    {plansRecentlyCreated && (
                        <VStack w="100%" spacing={4}>
                            <Text
                                fontSize="20px"
                                fontWeight="bold"
                                w="100%"
                                maxW="600px"
                                textAlign="start"
                            >
                                最近作られたプラン
                            </Text>
                            {/* TODO: React 18に対応 */}
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/* @ts-ignore */}
                            <InfiniteScroll
                                loadMore={() =>
                                    dispatch(fetchPlansRecentlyCreated())
                                }
                                hasMore={
                                    nextPageTokenPlansRecentlyCreated !== null
                                }
                            >
                                <VStack spacing={16} w="100%">
                                    {plansRecentlyCreated.map((plan, index) => (
                                        <PlanPreview
                                            key={index}
                                            link={Routes.plans.plan(plan.id)}
                                            plan={plan}
                                        />
                                    ))}
                                </VStack>
                            </InfiniteScroll>
                        </VStack>
                    )}
                </VStack>
            </Center>
        </VStack>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const plannerApi: PlannerApi = new PlannerGraphQlApi();

    let plans: Plan[] = [];
    let nextPageKey: string | null = null;
    try {
        console.info({
            page: "/",
            message: "Fetching Recently Created Plans...",
        });
        const response = await plannerApi.fetchPlans({
            pageKey: null,
        });
        plans = response.plans.map((entity) =>
            createPlanFromPlanEntity(entity)
        );
        nextPageKey = response.nextPageKey;
    } catch (e) {
        console.error({
            page: "/",
            message: "Failed to fetch Recently Created Plans .",
            error: e,
        });

        return {
            props: {
                plansRecentlyCreated: [],
                nextPageTokenPlansRecentlyCreated: null,
            },
            revalidate: 30,
        };
    } finally {
        console.info({
            page: "/",
            message: "Fetched Recently Created Plans.",
        });
    }

    return {
        props: {
            plansRecentlyCreated: plans,
            nextPageTokenPlansRecentlyCreated: nextPageKey,
        },
        revalidate: 60,
    };
};

export default IndexPage;
