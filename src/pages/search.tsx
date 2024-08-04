import { VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { createPlanFromPlanEntity } from "src/domain/factory/Plan";
import { Plan } from "src/domain/models/Plan";
import { PlannerApi } from "src/domain/plan/PlannerApi";
import { useNearbyPlans } from "src/hooks/useNearbyPlans";
import { useRecentlyCreatedPlans } from "src/hooks/useRecentlyCreatedPlans";
import { i18nAppConfig } from "src/locales/i18n";
import { TranslationNameSpaces } from "src/locales/resources";
import { Layout } from "src/view/common/Layout";
import {
    BottomNavigation,
    BottomNavigationPages,
} from "src/view/navigation/BottomNavigation";
import { NavBar } from "src/view/navigation/NavBar";
import { NearbyPlanList } from "src/view/plan/NearbyPlanList";
import { PlanList } from "src/view/plan/PlanList";
import { PlanListSectionRecentlyCreated } from "src/view/top/PlanListSectionTitle";

type Props = {
    plansRecentlyCreated: Plan[] | null;
    nextPageTokenPlansRecentlyCreated: string | null;
};

export default function SearchPage(props: Props) {
    const {
        plansNearby,
        locationPermission,
        isFetchingCurrentLocation,
        isFetchingNearbyPlans,
        fetchNearbyPlans,
    } = useNearbyPlans();

    const {
        plansRecentlyCreated,
        loadNextRecentCreatedPlans,
        canLoadMoreRecentlyCreatedPlans,
        isLoadingRecentlyCreatedPlans,
    } = useRecentlyCreatedPlans(props);

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
                    px={Size.top.px}
                    isFetchingCurrentLocation={isFetchingCurrentLocation}
                    isFetchingNearbyPlans={isFetchingNearbyPlans}
                    onRequestFetchNearByPlans={fetchNearbyPlans}
                />
                <PlanList
                    grid
                    ads
                    px={Size.top.px}
                    plans={plansRecentlyCreated}
                    isLoading={isLoadingRecentlyCreatedPlans}
                    canLoadMore={canLoadMoreRecentlyCreatedPlans}
                    loadMore={() => loadNextRecentCreatedPlans()}
                    header={<PlanListSectionRecentlyCreated />}
                />
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
