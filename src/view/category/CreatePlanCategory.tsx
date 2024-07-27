import { Box, Text, VStack } from "@chakra-ui/react";
import { Size } from "src/constant/size";
import { CreatePlanPlaceCategory } from "src/domain/models/CreatePlanPlaceCategory";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { appImageLoader } from "src/view/image/appImageLoader";

type Props = {
    category: CreatePlanPlaceCategory;
    onClick: () => void;
};

export function CreatePlanCategory({ category, onClick }: Props) {
    return (
        <Box
            minW={Size.CreatePlanCategory.CategoryImage.width + "px"}
            w={Size.CreatePlanCategory.CategoryImage.width + "px"}
            h={Size.CreatePlanCategory.CategoryImage.height + "px"}
            overflow="hidden"
            borderRadius="10px"
            position="relative"
            onClick={onClick}
        >
            <ImageWithSkeleton
                src={appImageLoader({
                    src: category.imageUrl,
                    width: Size.CreatePlanCategory.CategoryImage.width,
                })}
                alt={category.displayName}
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
