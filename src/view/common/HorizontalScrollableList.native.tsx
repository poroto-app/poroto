import { HorizontalScrollableListProps } from "src/types/props";
import { ScrollView, XStack } from "tamagui";

export const HorizontalScrollableList = ({
    px = 0,
    spacing = 8,
    children,
}: HorizontalScrollableListProps) => {
    return (
        <ScrollView w="100%" horizontal>
            <XStack w="100%" px={px} gap={spacing}>
                {children}
            </XStack>
        </ScrollView>
    );
};
