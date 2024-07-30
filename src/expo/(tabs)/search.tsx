import { FlatList } from "react-native";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { useRecentlyCreatedPlans } from "src/hooks/useRecentlyCreatedPlans";
import { Layout } from "src/view/common/Layout";
import { PlanPreview } from "src/view/plan/PlanPreview";
import { Spinner, View, XStack, YStack } from "tamagui";

export default function SearchScreen() {
    const {
        plansRecentlyCreated,
        isLoadingRecentlyCreatedPlans,
        canLoadMoreRecentlyCreatedPlans,
        loadNextRecentCreatedPlans,
    } = useRecentlyCreatedPlans();

    return (
        <Layout>
            <YStack w="100%" gap={Padding.p16}>
                <FlatList
                    style={{
                        paddingVertical: Padding.p32,
                        paddingHorizontal: Size.top.px,
                    }}
                    data={plansRecentlyCreated}
                    onEndReached={() => loadNextRecentCreatedPlans()}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item, index }) => (
                        <PlanPreview
                            key={index}
                            plan={item}
                            planThumbnailHeight={
                                Size.PlanList.SavedPlan.ThumbnailHeight
                            }
                        />
                    )}
                    refreshing={isLoadingRecentlyCreatedPlans}
                    ItemSeparatorComponent={() => <View height={Padding.p48} />}
                    ListFooterComponent={() =>
                        canLoadMoreRecentlyCreatedPlans && (
                            <XStack
                                py={Padding.p32}
                                w="100%"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Spinner size="large" color="$orange10" />
                            </XStack>
                        )
                    }
                />
            </YStack>
        </Layout>
    );
}
