import { Center, HStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import {zIndex} from "src/view/constants/zIndex";

type Props = {
    children?: ReactNode;
};

export const FooterHeight = 80;

export function PlanFooter({ children }: Props) {
    return (
        <Center
            backgroundColor="white"
            borderTop="1px solid rgba(0,0,0,.1)"
            h={`${FooterHeight}px`}
            w="100%"
            position="fixed"
            px="16px"
            py="16px"
            bottom={0}
            left={0}
            right={0}
            zIndex={zIndex.footer}
        >
            <HStack w="100%" maxW="var(--max-page-width)" h="100%">
                {children}
            </HStack>
        </Center>
    );
}
