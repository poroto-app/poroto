import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { SectionTitle } from "src/view/common/SectionTitle";
import { Size } from "src/view/constants/size";

export type Props = {
    title: string;
    description?: string;
    accordion?: boolean;
    children?: ReactNode;
};

export function PlanPageSection({
    title,
    description,
    accordion,
    children,
}: Props) {
    if (accordion)
        return (
            <Accordion
                allowToggle
                borderColor="transparent"
                w="100%"
                px={Size.PlanDetail.px}
            >
                <AccordionItem>
                    <AccordionButton justifyContent="space-between" px={0}>
                        <SectionTitle title={title} />
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
            <SectionTitle title={title} description={description} />
            <Box w="100%">{children}</Box>
        </VStack>
    );
}
