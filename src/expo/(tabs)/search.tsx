import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { useRecentlyCreatedPlans } from "src/hooks/useRecentlyCreatedPlans";
import { Layout } from "src/view/common/Layout";
import { PlanList } from "src/view/plan/PlanList";
import { PlanListSectionRecentlyCreated } from "src/view/top/PlanListSectionTitle";
import { ScrollView, YStack } from "tamagui";

export default function SearchScreen() {
    const {
        plansRecentlyCreated,
        isLoadingRecentlyCreatedPlans,
        canLoadMoreRecentlyCreatedPlans,
        loadNextRecentCreatedPlans,
    } = useRecentlyCreatedPlans();

    return (
        <ScrollView>
            <Layout>
                <YStack w="100%" gap={Padding.p16} paddingBottom={Padding.p32}>
                    <PlanList
                        grid
                        px={Size.top.px}
                        plans={plansRecentlyCreated}
                        isLoading={isLoadingRecentlyCreatedPlans}
                        canLoadMore={canLoadMoreRecentlyCreatedPlans}
                        loadMore={() => loadNextRecentCreatedPlans()}
                        header={<PlanListSectionRecentlyCreated />}
                    />
                </YStack>
            </Layout>
        </ScrollView>
    );
}
