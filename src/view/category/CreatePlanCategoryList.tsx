import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import {
    CreatePlanPlaceCategory,
    CreatePlanPlaceCategorySet,
} from "src/domain/models/CreatePlanPlaceCategory";
import { CreatePlanCategory } from "src/view/category/CreatePlanCategory";
import { HorizontalScrollableList } from "src/view/common/HorizontalScrollableList";
import { Text, YStack } from "tamagui";

export type Props = {
    categorySets: CreatePlanPlaceCategorySet[];
    onSelectCategory?: (category: CreatePlanPlaceCategory) => void;
};

export function CreatePlanCategoryList({
    categorySets,
    onSelectCategory,
}: Props) {
    return (
        <YStack w="100%" gap={Padding.p16}>
            {categorySets.map((categorySet, i) => {
                return (
                    <YStack
                        key={i}
                        w="100%"
                        alignItems="flex-start"
                        gap={Padding.p4}
                    >
                        <Text
                            fontSize={18}
                            fontWeight="bold"
                            color="#2F2F2F"
                            px={Size.top.px + Padding.p8}
                        >
                            {categorySet.displayName}
                        </Text>
                        <HorizontalScrollableList
                            edgeCornerRadius={10}
                            px={Size.top.px}
                        >
                            {categorySet.categories.map((category, j) => {
                                return (
                                    <CreatePlanCategory
                                        category={category}
                                        onClick={() =>
                                            onSelectCategory(category)
                                        }
                                        key={j}
                                    />
                                );
                            })}
                        </HorizontalScrollableList>
                    </YStack>
                );
            })}
        </YStack>
    );
}
