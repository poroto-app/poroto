import { Box, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { SectionTitle } from "src/view/common/SectionTitle";

export type Props = {
    title: string;
    description?: string;
    children?: ReactNode;
};

export function PlanPageSection({ title, description, children }: Props) {
    return (
        <VStack w="100%" px="16px" spacing={4} alignItems="flex-start">
            <SectionTitle title={title} description={description} />
            <Box w="100%">{children}</Box>
        </VStack>
    );
}
