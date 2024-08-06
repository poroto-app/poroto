import { ReactNode } from "react";
import { Colors } from "src/constant/color";
import { XStack } from "tamagui";

type Props = {
    w?: number | "100%";
    h?: number | "100%";
    maxW?: number | "100%";
    maxH?: number | "100%";
    backgroundColor?: string;
    children?: ReactNode;
};

export function RoundedDialog({
    w = 500,
    h,
    maxW = "100%",
    maxH,
    backgroundColor = Colors.dialog.backgroundColor,
    children,
}: Props) {
    return (
        <XStack
            backgroundColor={backgroundColor}
            w={w}
            h={h}
            maxWidth={maxW}
            maxHeight={maxH}
            borderRadius={20}
            overflow="hidden"
        >
            {children}
        </XStack>
    );
}
