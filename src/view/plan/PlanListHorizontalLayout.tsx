import { Routes } from "src/constant/router";
import { Size } from "src/constant/size";
import { createArrayWithSize } from "src/domain/util/array";
import { PlanListProps } from "src/types/props";
import { HorizontalScrollableList } from "src/view/common/HorizontalScrollableList";
import { PlanPreview } from "src/view/plan/PlanPreview";
import { YStack } from "tamagui";

export function PlanListHorizontalLayout({
    plans,

    isLoading,
    canLoadMore,
    loadMore,

    px = 0,
    numPlaceHolders,

    wrapTitle,
    showAuthor,

    // TODO: 対応する
    ads,
}: PlanListProps) {
    const data = plans || createArrayWithSize(numPlaceHolders).map(() => null);

    return (
        <HorizontalScrollableList
            pageButtonOffsetY={-8}
            px={px}
            edgeCornerRadius={10}
        >
            {data.map((plan, index) => (
                <YStack key={index} w={Size.PlanList.Card.minW}>
                    <PlanPreview
                        link={plan && Routes.plans.plan(plan.id)}
                        plan={plan}
                        planThumbnailHeight={
                            Size.PlanList.SavedPlan.ThumbnailHeight
                        }
                        wrapTitle={wrapTitle}
                        showAuthor={showAuthor}
                        draggableThumbnail={false}
                    />
                </YStack>
            ))}
        </HorizontalScrollableList>
    );
}
