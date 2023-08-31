import { Center, VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { Plan } from "src/domain/models/Plan";
import {
    createPlanFromPlanEntity,
    PlannerApi,
} from "src/domain/plan/PlannerApi";
import { reduxAuthSelector } from "src/redux/auth";
import {
    fetchNearbyPlans,
    fetchPlansByUser,
    fetchPlansRecentlyCreated,
    pushPlansRecentlyCreated,
    reduxPlanSelector,
    resetPlansByUser,
} from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { NavBar } from "src/view/common/NavBar";
import { Size } from "src/view/constants/size";
import { useLocation } from "src/view/hooks/useLocation";
import { PlanList } from "src/view/plan/PlanList";
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
        plansByUser,
    } = reduxPlanSelector();
    const { checkGeolocationPermission, getCurrentLocation } = useLocation();
    const { user } = reduxAuthSelector();

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

    useEffect(() => {
        if (!user) {
            dispatch(resetPlansByUser());
            return;
        }

        dispatch(fetchPlansByUser({ userId: user.id }));
    }, [user]);

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
                    {user && (
                        <PlanList title="保存したプラン" plans={plansByUser} />
                    )}
                    {/* TODO: 位置情報をONにすると近くのプランを取得できることを伝えるボタンを配置 */}
                    {/* TODO: 取得中のときはプレースホルダーを表示 */}
                    <PlanList
                        title={"近くで作られたプラン"}
                        plans={plansNearby}
                    />
                    {/* TODO: React 18に対応 */}
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <InfiniteScroll
                        loadMore={() => dispatch(fetchPlansRecentlyCreated())}
                        hasMore={nextPageTokenPlansRecentlyCreated !== null}
                    >
                        <PlanList
                            title="最近作られたプラン"
                            plans={plansRecentlyCreated}
                        />
                    </InfiniteScroll>
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
        // TODO: ユーザー情報を取得する
        plans = response.plans.map((entity) =>
            createPlanFromPlanEntity(entity, null)
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
