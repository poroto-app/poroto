import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Colors } from "src/constant/color";

type Props = {
    w?: string | number;
    h?: string | number;
    maxW?: string | number;
    maxH?: string | number;
    backgroundColor?: string;
    children?: ReactNode;
};

export function RoundedDialog({
    w = "500px",
    h,
    maxW = "100%",
    maxH,
    backgroundColor = Colors.dialog.backgroundColor,
    children,
}: Props) {
    return (
        <Box
            backgroundColor={backgroundColor}
            w={w}
            h={h}
            maxW={maxW}
            maxH={maxH}
            borderRadius="20px"
            overflow="hidden"
        >
            {children}
        </Box>
    );
}
