import { ReactNode } from "react";
import { Box, Center } from "@chakra-ui/react";

type Props = {
    navBar?: ReactNode;
    children: ReactNode;
};

export function Layout({ navBar, children }: Props) {
    return (
        <Center w="100%" flexDirection="column">
            {navBar && navBar}
            <Box maxWidth="990px" w="100%">
                {children}
            </Box>
        </Center>
    );
}
