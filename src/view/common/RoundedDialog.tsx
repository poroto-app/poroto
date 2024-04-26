import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Colors } from "src/view/constants/color";

type Props = {
    h?: string | number;
    backgroundColor?: string;
    children?: ReactNode;
};

export function RoundedDialog({
    h,
    backgroundColor = Colors.dialog.backgroundColor,
    children,
}: Props) {
    return (
        <Box
            backgroundColor={backgroundColor}
            w="500px"
            maxW="100%"
            h={h}
            borderRadius="20px"
            overflow="hidden"
        >
            {children}
        </Box>
    );
}
