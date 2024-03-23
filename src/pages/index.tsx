import { Center, Spinner, VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useEffect } from "react";
import {MdOutlineBookmark, MdOutlineBookmarkBorder, MdTrendingUp} from "react-icons/md";
import InfiniteScroll from "react-infinite-scroller";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { createPlanFromPlanEntity } from "src/domain/factory/Plan";
import { Plan } from "src/domain/models/Plan";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { PlannerApi } from "src/domain/plan/PlannerApi";
import { reduxAuthSelector } from "src/redux/auth";
import {
    fetchPlansByUser,
    fetchPlansRecentlyCreated,
    pushPlansRecentlyCreated,
    reduxPlanSelector,
    resetPlansByUser,
} from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { NavBar } from "src/view/common/NavBar";
import { Size } from "src/view/constants/size";
import { useNearbyPlans } from "src/view/hooks/useNearbyPlans";
import { NearbyPlanList } from "src/view/plan/NearbyPlanList";
import { PlanList } from "src/view/plan/PlanList";
import { CreatePlanSection } from "src/view/top/CreatePlanSection";
import { PlanListSectionTitle } from "src/view/top/PlanListSectionTitle";

type Props = {
    plansRecentlyCreated: Plan[] | null;
    nextPageTokenPlansRecentlyCreated: string | null;
};

const IndexPage = (props: Props) => {
    const dispatch = useAppDispatch();
    const {
        plansRecentlyCreated,
        nextPageTokenPlansRecentlyCreated,
        plansByUser,
        fetchPlansRecentlyCreatedRequestStatus,
        fetchPlansByUserRequestStatus,
    } = reduxPlanSelector();
    const {
        plansNearby,
        locationPermission,
        isFetchingCurrentLocation,
        isFetchingNearbyPlans,
        fetchNearbyPlans,
    } = useNearbyPlans();
    const { user } = reduxAuthSelector();

    useEffect(() => {
        // すでにプランを取得済みの場合は何もしない
        if (plansRecentlyCreated) return;

        if (props.plansRecentlyCreated) {
            // 初期表示時のみISRで取得したプランをReduxに保存する
            dispatch(
                pushPlansRecentlyCreated({
                    plans: props.plansRecentlyCreated,
                    nextPageTokenPlansRecentlyCreated:
                        props.nextPageTokenPlansRecentlyCreated,
                })
            );
        } else {
            // ISRで取得できなかった場合はAPIから取得する
            dispatch(fetchPlansRecentlyCreated());
        }
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
                    pt="16px"
                    pb="48px"
                    spacing="24px"
                >
                    {plansByUser && plansByUser.length > 0 && (
                        <PlanList plans={plansByUser}>
                            <PlanListSectionTitle
                                title="保存したプラン"
                                icon={MdOutlineBookmarkBorder}
                            />
                        </PlanList>
                    )}
                    {/* TODO: 拒否設定されている場合の対処をする */}
                    <NearbyPlanList
                        plans={plansNearby}
                        locationPermission={locationPermission}
                        isFetchingCurrentLocation={isFetchingCurrentLocation}
                        isFetchingNearbyPlans={isFetchingNearbyPlans}
                        onRequestFetchNearByPlans={fetchNearbyPlans}
                    />
                    {/* TODO: React 18に対応 */}
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <InfiniteScroll
                        loadMore={() => dispatch(fetchPlansRecentlyCreated())}
                        hasMore={nextPageTokenPlansRecentlyCreated !== null}
                        style={{ width: "100%" }}
                    >
                        <PlanList plans={plansRecentlyCreated}>
                            <PlanListSectionTitle
                                title="最近作成されたプラン"
                                icon={MdTrendingUp}
                            />
                        </PlanList>
                        {fetchPlansRecentlyCreatedRequestStatus ===
                            RequestStatuses.PENDING && (
                            <Center w="100%" py="32px">
                                <Spinner size="md" color="orange.600" />
                            </Center>
                        )}
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
                plansRecentlyCreated: null,
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
