import { ReactNode } from "react";
import { Colors } from "src/constant/color";
import { Button, Text } from "tamagui";

type Props = {
    w?: number | "100%";
    label?: string;
    flex?: number;
    borderWidth?: number;
    disabled?: boolean;
    fontWeight?: "bold" | "normal";
    // TODO: variantで共通化
    outlined?: boolean;
    variant?: "solid" | "outlined" | "ghost";
    children?: ReactNode;
    color?: string;
    onClick?: () => void;
};

// TODO：コンポーネント名を変更
export function RoundedButton({
    w = "100%",
    label,
    flex,
    borderWidth = 2,
    fontWeight = "bold",
    disabled,
    outlined,
    variant = "solid",
    color = Colors.primary["400"],
    children,
    onClick,
}: Props) {
    if (outlined) {
        variant = "outlined";
    }

    return (
        <Button
            unstyled
            alignItems="center"
            backgroundColor={
                disabled ? "#8b8b8b" : variant === "solid" ? color : "white"
            }
            borderColor={variant === "outlined" ? color : "none"}
            borderWidth={variant === "outlined" ? borderWidth : 0}
            borderRadius={100}
            color={variant === "solid" ? "#ffffff" : color}
            columnGap={8}
            disabled={disabled ?? false}
            flex={flex}
            height={40}
            justifyContent="center"
            padding={8}
            width={w}
            onPress={onClick}
        >
            {label && (
                <Text
                    fontWeight={fontWeight}
                    color={variant === "solid" ? "#ffffff" : color}
                >
                    {label}
                </Text>
            )}
            {children && (
                <Text
                    fontWeight={fontWeight}
                    color={variant === "solid" ? "#ffffff" : color}
                >
                    {children}
                </Text>
            )}
        </Button>
    );
}
