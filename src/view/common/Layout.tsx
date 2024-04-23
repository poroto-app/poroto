import { Box, Center } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Size } from "src/view/constants/size";

type Props = {
    navBar?: ReactNode;
    maxW?: string | number;
    children: ReactNode;
};

export function Layout({
    navBar,
    maxW = Size.mainContentWidth,
    children,
}: Props) {
    return (
        <Box
            w="100%"
            h="100%"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            overflowX="hidden"
        >
            {navBar && navBar}
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
        </Box>
    );
}
