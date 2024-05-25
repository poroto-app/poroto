import { Box, Center, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Size } from "src/view/constants/size";

type Props = {
    navBar?: ReactNode;
    maxW?: string | number;
    header?: ReactNode;
    children: ReactNode;
};

export function Layout({
    navBar,
    maxW = Size.mainContentWidth,
    header,
    children,
}: Props) {
    return (
        <VStack
            w="100%"
            h="100%"
            justifyContent="flex-start"
            overflowX="hidden"
            spacing={0}
        >
            {navBar && navBar}
            {header && <Box w="100%">{header}</Box>}
            <Center
                w="100%"
                h="100%"
                flexDirection="column"
                justifyContent="flex-start"
                position="relative"
            >
                <Box maxW={maxW} w="100%" h="100%">
                    {children}
                </Box>
            </Center>
        </VStack>
    );
}
