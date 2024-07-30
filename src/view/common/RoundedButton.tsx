import { ReactNode } from "react";
import { Colors } from "src/constant/color";
import { Button } from "tamagui";

type Props = {
    w?: number | "100%";
    disabled?: boolean;
    outlined?: boolean;
    children?: ReactNode;
    color?: string;
    onClick?: () => void;
};

export function RoundedButton({
    w = "100%",
    disabled,
    outlined,
    color = Colors.primary["400"],
    children,
    onClick,
}: Props) {
    return (
        <Button
            onPress={onClick}
            disabled={disabled ?? false}
            backgroundColor={disabled ? "#8b8b8b" : outlined ? "white" : color}
            borderColor={outlined ? Colors.primary["400"] : "none"}
            color={outlined ? Colors.primary["400"] : "#ffffff"}
            cursor={disabled ? "default" : "pointer"}
            fontWeight="bold"
            height={40}
            alignItems="center"
            justifyContent="center"
            columnGap={8}
            padding={8}
            width={w}
            borderRadius={100}
        >
            {children}
        </Button>
    );
}
