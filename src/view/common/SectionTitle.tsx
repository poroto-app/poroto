import { IconProps } from "@tamagui/helpers-icon";
import { NamedExoticComponent } from "react";
import { Padding } from "src/constant/padding";
import { Text, XStack, YStack } from "tamagui";

type Props = {
    title: string;
    description?: string;
    icon?: NamedExoticComponent<IconProps>;
    px?: number;
};
export function SectionTitle({ title, description, icon: Icon, px }: Props) {
    return (
        <YStack alignItems="flex-start" px={px} gap={Padding.p4}>
            <XStack>
                {Icon && <Icon size={24} />}
                <Text fontWeight="bold" fontSize="20px" color="#3E3E3E">
                    {title.split("\n").map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                </Text>
            </XStack>
            {description && (
                <Text fontSize="14px" color="#718096">
                    {description}
                </Text>
            )}
        </YStack>
    );
}
