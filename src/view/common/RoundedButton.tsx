import { IconProps } from "@tamagui/helpers-icon";
import { NamedExoticComponent, ReactNode } from "react";
import { Colors } from "src/constant/color";
import { Padding } from "src/constant/padding";
import { Button, Text, XStack } from "tamagui";

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
    icon: Icon = null,
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
            flex={flex}
            height={40}
            width={w}
            onPress={onClick}
        >
            <XStack
                h="100%"
                gap={0}
                justifyContent="center"
                alignItems="center"
                px={Padding.p8}
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
                        textAlign="center"
                    >
                        {label}
                    </Text>
                )}
                {children && (
                    <Text
                        fontWeight={fontWeight}
                        fontSize={fontSize}
                        color={variant === "solid" ? "#ffffff" : color}
                        textAlign="center"
                    >
                        {children}
                    </Text>
                )}
            </XStack>
        </Button>
    );
}
