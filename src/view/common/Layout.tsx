import { Box, Center } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
    navBar?: ReactNode;
    children: ReactNode;
    fillComponent?: ReactNode;
};

export function Layout({ navBar, children, fillComponent }: Props) {
    return (
        <Box
            w="100%"
            h="100%"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
        >
            {navBar && navBar}
            <Center
                w="100%"
                h="100%"
                flexDirection="column"
                justifyContent="flex-start"
                position="relative"
            >
                {fillComponent && (
                    <Box
                        position="absolute"
                        top={0}
                        right={0}
                        bottom={0}
                        left={0}
                        zIndex={0}
                    >
                        {fillComponent}
                    </Box>
                )}
                <Box maxWidth="990px" w="100%">
                    {children}
                </Box>
            </Center>
        </Box>
    );
}
