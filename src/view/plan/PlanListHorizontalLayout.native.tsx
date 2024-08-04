import { FlatList } from "react-native";
import { Padding } from "src/constant/padding";
import { Routes } from "src/constant/router";
import { Size } from "src/constant/size";
import { createArrayWithSize } from "src/domain/util/array";
import { reduxNativeSelector } from "src/redux/native";
import { PlanListProps } from "src/types/props";
import { PlanListLoadingSpinner } from "src/view/plan/PlanListLoadingSpinner";
import { PlanPreview } from "src/view/plan/PlanPreview";
import { View, XStack } from "tamagui";

export function PlanListHorizontalLayout({
    plans,

    isLoading,
    canLoadMore,
    loadMore,

    grid,
    px = 0,
    numPlaceHolders,

    wrapTitle,
    showAuthor,

    // TODO: 対応する
    ads,
}: PlanListProps) {
    const { screenWidth } = reduxNativeSelector();

    const getNumColumns = () => {
        if (!grid) return 1;

        const cardMaxWidth = 300;
        if (screenWidth > cardMaxWidth * 3 + px * 3) {
            return 3;
        } else if (screenWidth > cardMaxWidth * 2 + px * 2) {
            return 2;
        } else {
            return 1;
        }
    };

    return (
        <FlatList
            key={getNumColumns()}
            horizontal={!grid}
            scrollEnabled={!grid}
            numColumns={getNumColumns()}
            data={plans || createArrayWithSize(numPlaceHolders).map(() => null)}
            refreshing={isLoading}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => (
                <XStack
                    key={index}
                    flex={1}
                    width={!grid && Size.PlanList.Card.minW}
                    maxWidth={getNumColumns() === 3 && Size.PlanList.Card.minW}
                >
                    <PlanPreview
                        plan={item}
                        planThumbnailHeight={
                            Size.PlanList.SavedPlan.ThumbnailHeight
                        }
                        wrapTitle={wrapTitle}
                        showAuthor={showAuthor}
                        link={item && Routes.plans.plan(item.id)}
                    />
                </XStack>
            )}
            columnWrapperStyle={
                getNumColumns() > 1 && {
                    gap: Padding.p24,
                }
            }
            contentContainerStyle={{
                paddingVertical: 0,
                paddingHorizontal: px,
            }}
            ItemSeparatorComponent={() => (
                <View height={Padding.p48} width={Padding.p24} />
            )}
            ListFooterComponent={() =>
                canLoadMore && <PlanListLoadingSpinner />
            }
        />
    );
}
