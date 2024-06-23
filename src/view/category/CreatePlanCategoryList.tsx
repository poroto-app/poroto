import { Text, VStack } from "@chakra-ui/react";
import { CreatePlanPlaceCategorySet } from "src/domain/models/CreatePlanPlaceCategory";
import { CreatePlanCategory } from "src/view/category/CreatePlanCategory";
import { HorizontalScrollableList } from "src/view/common/HorizontalScrollableList";
import { Padding } from "src/view/constants/padding";
import { Size } from "src/view/constants/size";

export type Props = {
    categorySets: CreatePlanPlaceCategorySet[];
};

export function CreatePlanCategoryList({ categorySets }: Props) {
    return (
        <VStack w="100%" overflowX="hidden" spacing={Padding.p16}>
            {categorySets.map((categorySet, i) => {
                return (
                    <VStack
                        key={i}
                        w="100%"
                        overflowX="hidden"
                        alignItems="flex-start"
                        spacing={Padding.p4}
                        px={Size.top.px}
                    >
                        <Text
                            fontSize="18px"
                            fontWeight="bold"
                            color="#2F2F2F"
                            px={Padding.p8}
                        >
                            {categorySet.displayName}
                        </Text>
                        <HorizontalScrollableList edgeCornerRadius={10}>
                            {categorySet.categories.map((category, j) => {
                                return (
                                    <CreatePlanCategory
                                        category={category}
                                        onClick={() => {}}
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
