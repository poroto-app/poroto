import { Check, X } from "@tamagui/lucide-icons";
import { Padding } from "src/constant/padding";
import { LocationCategory } from "src/domain/models/LocationCategory";
import { LocationCategoryWithPlace } from "src/domain/models/LocationCategoryWithPlace";
import { CategorySelectSlideView } from "src/view/interest/CategorySelectSlideView";
import { SelectButton } from "src/view/interest/SelectButton";
import { Text, XStack, YStack } from "tamagui";

/**
 * @param interactiveAnimation trueの場合、スライドして切り替わることを示すためのアニメーションを表示する
 */
type Props = {
    category: LocationCategoryWithPlace;
    interactiveAnimation?: boolean;
    onClickYes: (category: LocationCategory) => void;
    onClickNo: (category: LocationCategory) => void;
};
export const CategorySelect = ({
    category,
    interactiveAnimation = true,
    onClickYes,
    onClickNo,
}: Props) => {
    return (
        <YStack h="100%" w="100%" gap={Padding.p32}>
            <YStack
                flex={1}
                alignItems="center"
                w="100%"
                borderWidth={1.5}
                borderColor="rgba(0, 0, 0, 0.15)"
                borderRadius={15}
                shadowRadius={20}
                shadowColor="rgba(0, 0, 0, 0.1)"
                overflow="hidden"
                position="relative"
            >
                <YStack flex={1} w="100%" position="relative" overflow="hidden">
                    <CategorySelectSlideView
                        category={category}
                        interactiveAnimation={interactiveAnimation}
                    />
                </YStack>
                <XStack py={Padding.p16}>
                    <Text fontSize={20}>{category.displayName}</Text>
                </XStack>
            </YStack>
            <XStack w="100%" gap={Padding.p8}>
                <SelectButton
                    color="#E96479"
                    onClick={() => onClickNo(category)}
                    icon={X}
                />
                <SelectButton
                    color="#7DB9B6"
                    onClick={() => onClickYes(category)}
                    icon={Check}
                />
            </XStack>
        </YStack>
    );
};
