import { ReactNode } from "react";
import { XStack } from "tamagui";

export function ButtonWithBlur({
    borderRadius,
    backgroundColor,
    px,
    py,
    onClick,
    children,
}: {
    borderRadius?: number;
    backgroundColor: string;
    px?: number;
    py?: number;
    onClick?: () => void;
    children?: ReactNode;
}) {
    const toRgb = (
        color: string
    ): { red: number; green: number; blue: number } => {
        // if color is type of rgb() return it
        if (color.startsWith("rgb")) {
            const [red, green, blue] = color
                .slice(4, -1)
                .split(",")
                .map((v) => parseInt(v));
            return { red, green, blue };
        }

        // if color is hex convert it to rgb
        if (color[0] === "#") {
            const hex = color.slice(1);
            const red = parseInt(hex.slice(0, 2), 16);
            const green = parseInt(hex.slice(2, 4), 16);
            const blue = parseInt(hex.slice(4, 6), 16);
            return { red, green, blue };
        }
    };

    const color = toRgb(backgroundColor);

    return (
        <XStack
            tag="button"
            backgroundColor={backgroundColor}
            px={px}
            py={py}
            shadowOffset={{ width: 0, height: 0 }}
            shadowColor={`rgb(${color.red},${color.green},${color.blue})`}
            shadowOpacity={0.6}
            shadowRadius={20}
            elevationAndroid={20}
            borderRadius={borderRadius}
            onPress={onClick}
        >
            {children}
        </XStack>
    );
}
