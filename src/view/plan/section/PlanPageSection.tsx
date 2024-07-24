import { Box, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Size } from "src/view/constants/size";

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
        <VStack w="100%" spacing={4} alignItems="flex-start">
            {sectionHeader}
            <Box w="100%" px={contentPaddingX + "px"}>
                {children}
            </Box>
        </VStack>
    );
}
