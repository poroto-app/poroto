import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Size } from "src/view/constants/size";

type Props = {
    title: string;
    icon: IconType;
    px?: string | number;
};

export function PlanListSectionTitle({
    title,
    icon,
    px = Size.top.SectionTitle.px,
}: Props) {
    return (
        <VStack w="100%" alignItems="flex-start">
            <VStack py="32px" px={px} alignItems="flex-start" spacing={4}>
                <HStack color="#3E3E3E">
                    <Icon w="32px" h="32px" as={icon} />
                    <Text
                        fontSize="20px"
                        fontWeight="bold"
                        lineHeight={1}
                        as="h1"
                    >
                        {title}
                    </Text>
                </HStack>
                <Box
                    w="100%"
                    h="4px"
                    backgroundColor="#3E3E3E"
                    borderRadius="10px"
                />
            </VStack>
        </VStack>
    );
}
