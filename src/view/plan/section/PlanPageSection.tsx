import { Box, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { SectionTitle } from "src/view/common/SectionTitle";
import { Size } from "src/view/constants/size";

export type Props = {
    title: string;
    description?: string;
    titlePaddingX?: string | number;
    contentPaddingX?: string | number;
    children?: ReactNode;
};

export function PlanPageSection({
    title,
    description,
    titlePaddingX = Size.PlanDetail.px,
    contentPaddingX = Size.PlanDetail.px,
    children,
}: Props) {
    return (
        <VStack w="100%" spacing={4} alignItems="flex-start">
            <SectionTitle
                title={title}
                description={description}
                px={titlePaddingX}
            />
            <Box w="100%" px={contentPaddingX}>
                {children}
            </Box>
        </VStack>
    );
}
