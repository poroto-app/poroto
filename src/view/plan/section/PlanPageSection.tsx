import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Text,
    VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export type Props = {
    title: string;
    accordion?: boolean;
    children?: ReactNode;
};

export function PlanPageSection({ title, accordion, children }: Props) {
    if (accordion)
        return (
            <Accordion allowToggle borderColor="transparent" w="100%" px="16px">
                <AccordionItem>
                    <AccordionButton justifyContent="space-between" px={0}>
                        <Title title={title} />
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pt="8px">
                        <Box w="100%">{children}</Box>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        );

    return (
        <VStack w="100%" px="16px" spacing={4} alignItems="flex-start">
            <Title title={title} />
            <Box w="100%">{children}</Box>
        </VStack>
    );
}

function Title({ title }: { title: string }) {
    return (
        <Text fontWeight="bold" fontSize="20px">
            {title}
        </Text>
    );
}
