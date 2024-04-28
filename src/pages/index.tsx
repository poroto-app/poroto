import { Center, Spinner, VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useEffect } from "react";
import {
    MdOutlineBookmarkBorder,
    MdOutlineFavoriteBorder,
    MdTrendingUp,
} from "react-icons/md";
import InfiniteScroll from "react-infinite-scroller";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { createPlanFromPlanEntity } from "src/domain/factory/Plan";
import { Plan } from "src/domain/models/Plan";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { PlannerApi } from "src/domain/plan/PlannerApi";
import { reduxAuthSelector } from "src/redux/auth";
import {
    fetchPlansRecentlyCreated,
    pushPlansRecentlyCreated,
    reduxPlanSelector,
    setPlaceIdToCreatePlan,
    setPlansByUser,
} from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { HorizontalScrollableList } from "src/view/common/HorizontalScrollableList";
import { NavBar } from "src/view/common/NavBar";
import { Padding } from "src/view/constants/padding";
import { Size } from "src/view/constants/size";
import { useLikePlaces } from "src/view/hooks/useLikePlaces";
import { useNearbyPlans } from "src/view/hooks/useNearbyPlans";
import { PlaceCard } from "src/view/place/PlaceCard";
import { NearbyPlanList } from "src/view/plan/NearbyPlanList";
import { PlanList } from "src/view/plan/PlanList";
import { CreatePlanDialog } from "src/view/plandetail/CreatePlanDialog";
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
    } = reduxPlanSelector();
    const {
        plansNearby,
        locationPermission,
        isFetchingCurrentLocation,
        isFetchingNearbyPlans,
        fetchNearbyPlans,
    } = useNearbyPlans();
    const {
        likePlaces,
        likePlaceToCreatePlan,
        onSelectLikePlace,
        onCreatePlanFromLikePlace,
    } = useLikePlaces();
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
            dispatch(setPlansByUser({ plans: null }));
            return;
        }
    }, [user]);

    return (
        <VStack w="100%" spacing={0}>
            <NavBar />
            <CreatePlanSection />
            <Center w="100%">
                <VStack
                    w="100%"
                    maxW={Size.mainContentWidth}
                    pt="16px"
                    pb="48px"
                    spacing="24px"
                >
                    {plansByUser && plansByUser.length > 0 && (
                        <PlanList
                            plans={plansByUser}
                            grid={false}
                            wrapTitle={false}
                            showAuthor={false}
                            px={Padding.p16}
                        >
                            <PlanListSectionTitle
                                title="保存したプラン"
                                icon={MdOutlineBookmarkBorder}
                            />
                        </PlanList>
                    )}
                    {likePlaces && likePlaces.length > 0 && (
                        <VStack w="100%">
                            <PlanListSectionTitle
                                title="お気に入りの場所"
                                icon={MdOutlineFavoriteBorder}
                            />
                            <HorizontalScrollableList px={Padding.p16}>
                                {likePlaces.map((place, index) => (
                                    <PlaceCard
                                        key={index}
                                        place={place}
                                        w={Size.PlanList.LikePlace.w}
                                        h={Size.PlanList.LikePlace.h}
                                        onClick={() =>
                                            onSelectLikePlace(place.id)
                                        }
                                    />
                                ))}
                            </HorizontalScrollableList>
                        </VStack>
                    )}
                    {/* TODO: 拒否設定されている場合の対処をする */}
                    <NearbyPlanList
                        plans={plansNearby}
                        locationPermission={locationPermission}
                        px={Size.top.px}
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
                        <PlanList plans={plansRecentlyCreated} px={Size.top.px}>
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
            <CreatePlanDialog
                place={likePlaceToCreatePlan}
                onClickClose={() => dispatch(setPlaceIdToCreatePlan(null))}
                onClickCreatePlan={(place) => onCreatePlanFromLikePlace(place)}
            />
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
