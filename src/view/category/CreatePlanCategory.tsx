import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { CreatePlanPlaceCategory } from "src/domain/models/CreatePlanPlaceCategory";
import { isPC } from "src/view/constants/userAgent";

type Props = {
    category: CreatePlanPlaceCategory;
    onClick: () => void;
};

export function CreatePlanCategory({ category, onClick }: Props) {
    const width = isPC ? 300 : 200;
    const height = isPC ? 200 : 100;
    return (
        <Box
            minW={width}
            w={width}
            h={height}
            overflow="hidden"
            borderRadius="10px"
            position="relative"
            onClick={onClick}
        >
            <Image
                w={width}
                h={height}
                objectFit="cover"
                src={category.imageUrl}
            />
            <VStack
                userSelect="none"
                background="linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.30) 30%, rgba(0, 0, 0, 0.50) 100%)"
                position="absolute"
                px="16px"
                py="8px"
                alignItems="flex-start"
                right={0}
                bottom={0}
                left={0}
            >
                <Text color="white" fontSize="16px" fontWeight="bold">
                    {category.displayName}
                </Text>
            </VStack>
        </Box>
    );
}
