import { Text, VStack } from "@chakra-ui/react";
import {
    CreatePlanPlaceCategory,
    CreatePlanPlaceCategorySet,
} from "src/domain/models/CreatePlanPlaceCategory";
import { CreatePlanCategory } from "src/view/category/CreatePlanCategory";
import { HorizontalScrollableList } from "src/view/common/HorizontalScrollableList";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";

export type Props = {
    categorySets: CreatePlanPlaceCategorySet[];
    onSelectCategory?: (category: CreatePlanPlaceCategory) => void;
};

export function CreatePlanCategoryList({
    categorySets,
    onSelectCategory,
}: Props) {
    return (
        <VStack w="100%" overflowX="hidden" spacing={Padding.p16 + "px"}>
            {categorySets.map((categorySet, i) => {
                return (
                    <VStack
                        key={i}
                        w="100%"
                        overflowX="hidden"
                        alignItems="flex-start"
                        spacing={Padding.p4 + "px"}
                        px={Size.top.px + "px"}
                    >
                        <Text
                            fontSize="18px"
                            fontWeight="bold"
                            color="#2F2F2F"
                            px={Padding.p8 + "px"}
                        >
                            {categorySet.displayName}
                        </Text>
                        <HorizontalScrollableList edgeCornerRadius={10}>
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
                    </VStack>
                );
            })}
        </VStack>
    );
}
