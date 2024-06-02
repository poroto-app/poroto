import { Box, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { SectionTitle } from "src/view/common/SectionTitle";
import { Size } from "src/view/constants/size";

export type Props = {
    title: string;
    description?: string;
    icon?: IconType;
    titlePaddingX?: string | number;
    contentPaddingX?: string | number;
    children?: ReactNode;
};

export function PlanPageSection({
    title,
    description,
    icon,
    titlePaddingX = Size.PlanDetail.px,
    contentPaddingX = Size.PlanDetail.px,
    children,
}: Props) {
    return (
        <VStack w="100%" spacing={4} alignItems="flex-start">
            <SectionTitle
                title={title}
                description={description}
                icon={icon}
                px={titlePaddingX}
            />
            <Box w="100%" px={contentPaddingX}>
                {children}
            </Box>
        </VStack>
    );
}
