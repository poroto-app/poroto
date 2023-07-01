import {ReactNode} from "react";
import {Box, Text, VStack} from "@chakra-ui/react";

export type Props = {
    title: string;
    children?: ReactNode;
}

export function PlanPageSection({title, children}: Props) {
    return <VStack w="100%" py="16px" spacing={4} alignItems="flex-start">
        <Text fontWeight="bold" fontSize="20px">{title}</Text>
        <Box w="100%">{children}</Box>
    </VStack>
}