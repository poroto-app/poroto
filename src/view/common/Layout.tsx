import { Box, Center, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Size } from "src/constant/size";
import { zIndex } from "src/constant/zIndex";

type Props = {
    height?: string | number;
    navBar?: ReactNode;
    bottomNavigation?: ReactNode;
    maxW?: number;
    header?: ReactNode;
    children: ReactNode;
};

export function Layout({
    height = "100%",
    navBar,
    bottomNavigation,
    maxW = Size.mainContentWidth,
    header,
    children,
}: Props) {
    return (
        <VStack
            w="100%"
            h={height}
            justifyContent="flex-start"
            overflowX="hidden"
            spacing={0}
            pb={bottomNavigation ? Size.BottomNavigation.height : 0}
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
                <Box maxW={maxW + "px"} w="100%" h="100%">
                    {children}
                </Box>
            </Center>
            {bottomNavigation && (
                <Box
                    position="fixed"
                    left={0}
                    right={0}
                    bottom={0}
                    zIndex={zIndex.bottomNavigation}
                >
                    {bottomNavigation}
                </Box>
            )}
        </VStack>
    );
}
