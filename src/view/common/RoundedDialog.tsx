import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Colors } from "src/view/constants/color";

type Props = {
    children?: ReactNode;
};

export function RoundedDialog({ children }: Props) {
    return (
        <Box
            backgroundColor={Colors.dialog.backgroundColor}
            w="500px"
            maxW="100%"
            borderRadius="20px"
            overflow="hidden"
        >
            {children}
        </Box>
    );
}
