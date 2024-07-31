import { FlatList } from "react-native";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { createArrayWithSize } from "src/domain/util/array";
import { useRecentlyCreatedPlans } from "src/hooks/useRecentlyCreatedPlans";
import { reduxNativeSelector } from "src/redux/native";
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

    const { screenWidth } = reduxNativeSelector();

    const getNumColumns = () => {
        const cardMaxWidth = 300;
        if (screenWidth > cardMaxWidth * 3 + Size.top.px * 3) {
            return 3;
        } else if (screenWidth > cardMaxWidth * 2 + Size.top.px * 2) {
            return 2;
        } else {
            return 1;
        }
    };

    return (
        <Layout>
            <YStack w="100%" gap={Padding.p16}>
                <FlatList
                    key={getNumColumns()}
                    style={{
                        paddingVertical: Padding.p32,
                        paddingHorizontal: Size.top.px,
                    }}
                    numColumns={getNumColumns()}
                    data={
                        plansRecentlyCreated ||
                        createArrayWithSize(6).map(() => null)
                    }
                    refreshing={isLoadingRecentlyCreatedPlans}
                    onEndReached={() => loadNextRecentCreatedPlans()}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item, index }) => (
                        <XStack
                            key={index}
                            flex={1}
                            maxWidth={getNumColumns() === 3 && 300}
                        >
                            <PlanPreview
                                plan={item}
                                planThumbnailHeight={
                                    Size.PlanList.SavedPlan.ThumbnailHeight
                                }
                            />
                        </XStack>
                    )}
                    columnWrapperStyle={
                        getNumColumns() > 1 && {
                            gap: Padding.p24,
                        }
                    }
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
