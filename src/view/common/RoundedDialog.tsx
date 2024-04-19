import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

export function RoundedDialog({ children }: Props) {
    return (
        <Box
            backgroundColor="#FFF8F3"
            w="500px"
            maxW="100%"
            borderRadius="20px"
            overflow="hidden"
        >
            {children}
        </Box>
    );
}
