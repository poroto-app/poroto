import { Box, Center, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import "@splidejs/splide/css";
import { useState } from "react";
import { getDefaultPlaceImage, Image } from "src/domain/models/Image";
import { Plan } from "src/domain/models/Plan";
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";
import { StoryImagePreview } from "src/view/plancandidate/StoryImagePreview";

type Props = {
    plan: Plan;
    isActive: boolean;
};

export function PlanCandidateGalleryCard({ plan, isActive }: Props) {
    const [currentPlaceIndex, setCurrentPlaceIndex] = useState<number>(0);

    const images: Image[] = plan.places.map((place) =>
        place.images.length > 0 ? place.images[0] : getDefaultPlaceImage()
    );

    return (
        <Center h="500px">
            <Box
                transition="all 0.3s ease-in-out"
                w="300px"
                h={isActive ? "500px" : "450px"}
                borderRadius="20px"
                overflow="hidden"
                position="relative"
                filter={isActive ? "none" : "blur(1px)"}
                boxShadow={
                    isActive ? "0px 0px 60px 0px rgba(0, 0, 0, 0.25)" : "none"
                }
            >
                <StoryImagePreview
                    images={images}
                    slideable={isActive}
                    onActiveIndexChange={setCurrentPlaceIndex}
                />
                <Box
                    position="absolute"
                    left={0}
                    right={0}
                    bottom={0}
                    px="16px"
                    pb="16px"
                    pt="32px"
                    background="linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.30) 30%, rgba(0, 0, 0, 0.50) 100%)"
                >
                    <VStack w="100%" alignItems="flex-start">
                        <HStack>
                            <Icon
                                w="24px"
                                h="24px"
                                color="white"
                                as={getPlaceCategoryIcon(
                                    plan.places[currentPlaceIndex].categories
                                        .length > 0
                                        ? plan.places[currentPlaceIndex]
                                              .categories[0]
                                        : null
                                )}
                            />
                            <Text color="white">
                                {plan.places[currentPlaceIndex].name}
                            </Text>
                        </HStack>
                        <Text
                            color="white"
                            fontWeight="bold"
                            fontSize="18px"
                            as="h2"
                        >
                            {plan.title}
                        </Text>
                    </VStack>
                </Box>
            </Box>
        </Center>
    );
}
