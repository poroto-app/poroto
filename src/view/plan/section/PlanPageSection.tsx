import { ReactNode } from "react";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { YStack } from "tamagui";

export type Props = {
    sectionHeader?: ReactNode;
    contentPaddingX?: number;
    children?: ReactNode;
};

export function PlanPageSection({
    sectionHeader,
    contentPaddingX = Size.PlanDetail.px,
    children,
}: Props) {
    return (
        <YStack w="100%" gap={Padding.p8} alignItems="flex-start">
            {sectionHeader}
            <YStack w="100%" px={contentPaddingX}>
                {children}
            </YStack>
        </YStack>
    );
}
