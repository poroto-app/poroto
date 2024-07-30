import { ReactNode } from "react";
import { Colors } from "src/constant/color";
import { Button } from "tamagui";

type Props = {
    w?: number | "100%";
    flex?: number;
    disabled?: boolean;
    outlined?: boolean;
    children?: ReactNode;
    color?: string;
    onClick?: () => void;
};

export function RoundedButton({
    w = "100%",
    flex = 1,
    disabled,
    outlined,
    color = Colors.primary["400"],
    children,
    onClick,
}: Props) {
    return (
        <Button
            alignItems="center"
            backgroundColor={disabled ? "#8b8b8b" : outlined ? "white" : color}
            borderColor={outlined ? Colors.primary["400"] : "none"}
            borderRadius={100}
            color={outlined ? Colors.primary["400"] : "#ffffff"}
            columnGap={8}
            cursor={disabled ? "default" : "pointer"}
            disabled={disabled ?? false}
            fontWeight="bold"
            flex={flex}
            height={40}
            justifyContent="center"
            padding={8}
            width={w}
            onPress={onClick}
        >
            {children}
        </Button>
    );
}
