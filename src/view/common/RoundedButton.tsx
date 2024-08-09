import { IconProps } from "@tamagui/helpers-icon";
import { NamedExoticComponent, ReactNode } from "react";
import { Colors } from "src/constant/color";
import { Button, Text } from "tamagui";

type Props = {
    w?: number | "100%";
    label?: string;
    flex?: number;
    borderWidth?: number;
    disabled?: boolean;
    fontWeight?: "bold" | "normal";
    fontSize?: number;
    // TODO: variantで共通化
    outlined?: boolean;
    variant?: "solid" | "outlined" | "ghost";
    icon?: NamedExoticComponent<IconProps>;
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
    fontSize = 16,
    disabled,
    outlined,
    variant = "solid",
    color = Colors.primary["400"],
    icon: Icon,
    children,
    onClick,
}: Props) {
    if (outlined) {
        variant = "outlined";
    }

    return (
        <Button
            unstyled
            backgroundColor={
                disabled ? "#8b8b8b" : variant === "solid" ? color : "white"
            }
            borderColor={variant === "outlined" ? color : "none"}
            borderWidth={variant === "outlined" ? borderWidth : 0}
            borderRadius={100}
            color={variant === "solid" ? "#ffffff" : color}
            disabled={disabled ?? false}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            gap={0}
            flex={flex}
            height={40}
            padding={8}
            width={w}
            onPress={onClick}
        >
            {Icon && (
                <Icon
                    size={28}
                    color={variant === "solid" ? "#ffffff" : color}
                />
            )}
            {label && (
                <Text
                    fontWeight={fontWeight}
                    fontSize={fontSize}
                    color={variant === "solid" ? "#ffffff" : color}
                >
                    {label}
                </Text>
            )}
            {children && (
                <Text
                    fontWeight={fontWeight}
                    fontSize={fontSize}
                    color={variant === "solid" ? "#ffffff" : color}
                >
                    {children}
                </Text>
            )}
        </Button>
    );
}
