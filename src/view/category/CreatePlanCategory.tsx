import { Box, Skeleton, Text, VStack, Image } from "@chakra-ui/react";
import { useState } from "react";
import { CreatePlanPlaceCategory } from "src/domain/models/CreatePlanPlaceCategory";
import { Size } from "src/view/constants/size";

type Props = {
    category: CreatePlanPlaceCategory;
    onClick: () => void;
};

export function CreatePlanCategory({ category, onClick }: Props) {
    const [isImageLoading, setIsImageLoading] = useState(true);
    return (
        <Box
            minW={Size.CreatePlanCategory.CategoryImage.width}
            w={Size.CreatePlanCategory.CategoryImage.width}
            h={Size.CreatePlanCategory.CategoryImage.height}
            overflow="hidden"
            borderRadius="10px"
            position="relative"
            onClick={onClick}
        >
            <Skeleton
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                left={0}
                transition="opacity .3s"
                opacity={isImageLoading ? 1 : 0}
            />
            <Image
                width={Size.CreatePlanCategory.CategoryImage.width+"px"}
                height={Size.CreatePlanCategory.CategoryImage.height+"px"}
                src={category.imageUrl}
                alt={category.displayName}
                style={{ objectFit: "cover" }}
                onLoad={() => setIsImageLoading(false)}
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
