import { Center, Spinner, VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { MdTrendingUp } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroller";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { createPlanFromPlanEntity } from "src/domain/factory/Plan";
import { Plan } from "src/domain/models/Plan";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { PlannerApi } from "src/domain/plan/PlannerApi";
import { hasValue } from "src/domain/util/null";
import { useNearbyPlans } from "src/hooks/useNearbyPlans";
import { i18nAppConfig } from "src/locales/i18n";
import { TranslationNameSpaces } from "src/locales/resources";
import {
    fetchPlansRecentlyCreated,
    pushPlansRecentlyCreated,
    reduxPlanSelector,
} from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { Layout } from "src/view/common/Layout";
import {
    BottomNavigation,
    BottomNavigationPages,
} from "src/view/navigation/BottomNavigation";
import { NavBar } from "src/view/navigation/NavBar";
import { NearbyPlanList } from "src/view/plan/NearbyPlanList";
import { PlanList } from "src/view/plan/PlanList";
import { PlanListSectionTitle } from "src/view/top/PlanListSectionTitle";

type Props = {
    plansRecentlyCreated: Plan[] | null;
    nextPageTokenPlansRecentlyCreated: string | null;
};

export default function SearchPage(props: Props) {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const {
        plansRecentlyCreated,
        nextPageTokenPlansRecentlyCreated,
        fetchPlansRecentlyCreatedRequestStatus,
    } = reduxPlanSelector();
    const {
        plansNearby,
        locationPermission,
        isFetchingCurrentLocation,
        isFetchingNearbyPlans,
        fetchNearbyPlans,
    } = useNearbyPlans();

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

    return (
        <Layout
            height="auto"
            navBar={<NavBar />}
            bottomNavigation={
                <BottomNavigation page={BottomNavigationPages.Search} />
            }
        >
            <VStack w="100%" pb={Padding.p32 + "px"}>
                {/* TODO: 拒否設定されている場合の対処をする */}
                <NearbyPlanList
                    plans={plansNearby}
                    locationPermission={locationPermission}
                    px={Size.top.px + "px"}
                    isFetchingCurrentLocation={isFetchingCurrentLocation}
                    isFetchingNearbyPlans={isFetchingNearbyPlans}
                    onRequestFetchNearByPlans={fetchNearbyPlans}
                />
                {/* TODO: React 18に対応 */}
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <InfiniteScroll
                    loadMore={() => dispatch(fetchPlansRecentlyCreated())}
                    hasMore={hasValue(nextPageTokenPlansRecentlyCreated)}
                    style={{ width: "100%" }}
                >
                    <PlanList
                        plans={plansRecentlyCreated}
                        px={Size.top.px + "px"}
                    >
                        <PlanListSectionTitle
                            title={t("home:recentlyCreatedPlans")}
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
        </Layout>
    );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const plannerApi: PlannerApi = new PlannerGraphQlApi();

    let plans: Plan[] = [];
    let nextPageKey: string | null = null;
    try {
        console.info({
            page: "/search",
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
            page: "/search",
            message: "Failed to fetch Recently Created Plans .",
            error: e,
        });

        return {
            props: {
                plansRecentlyCreated: null,
                nextPageTokenPlansRecentlyCreated: null,
                ...(await serverSideTranslations(
                    locale,
                    TranslationNameSpaces,
                    i18nAppConfig
                )),
            },
            revalidate: 30,
        };
    } finally {
        console.info({
            page: "/search",
            message: "Fetched Recently Created Plans.",
        });
    }

    return {
        props: {
            plansRecentlyCreated: plans,
            nextPageTokenPlansRecentlyCreated: nextPageKey,
            ...(await serverSideTranslations(
                locale,
                TranslationNameSpaces,
                i18nAppConfig
            )),
        },
        revalidate: 60,
    };
};
