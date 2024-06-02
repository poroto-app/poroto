import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons";

type Props = {
    title: string;
    description?: string;
    icon?: IconType;
    px?: string | number;
};
export function SectionTitle({ title, description, icon, px }: Props) {
    return (
        <VStack alignItems="flex-start" px={px} spacing="4px" color="#3E3E3E">
            <HStack>
                {icon && <Icon w="24px" h="24px" as={icon} fontSize="20px" />}
                <Text fontWeight="bold" fontSize="20px">
                    {title.split("\n").map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                </Text>
            </HStack>
            {description && (
                <Text fontSize="14px" color="gray.500">
                    {description}
                </Text>
            )}
        </VStack>
    );
}
