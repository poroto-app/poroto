import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";
import "@splidejs/splide/css";
import { useState } from "react";
import { Size } from "src/constant/size";
import { Image, getDefaultPlaceImage } from "src/domain/models/Image";
import { Plan } from "src/domain/models/Plan";
import { PlaceCategoryIcon } from "src/view/place/PlaceCategoryIcon";
import { StoryImagePreview } from "src/view/plancandidate/StoryImagePreview";

type Props = {
    plan: Plan;
    isActive: boolean;
    // カード中の最初の画像をタップして、次の要素に移動しようとしている
    onClickFirstItem?: () => void;
    // カード中の最後の画像をタップして、次の要素に移動しようとしている
    onClickLastItem?: () => void;
};

export function PlanCandidateGalleryCard({
    plan,
    isActive,
    onClickFirstItem,
    onClickLastItem,
}: Props) {
    const [currentPlaceIndex, setCurrentPlaceIndex] = useState<number>(0);

    const images: Image[] = plan.places.map((place) =>
        place.images.length > 0 ? place.images[0] : getDefaultPlaceImage()
    );

    return (
        <Center h={Size.PlanCandidatesGallery.Card.h.active + "px"}>
            <Box
                transition="all 0.3s ease-in-out"
                w={Size.PlanCandidatesGallery.Card.w + "px"}
                h={
                    isActive
                        ? Size.PlanCandidatesGallery.Card.h.active + "px"
                        : Size.PlanCandidatesGallery.Card.h.inactive + "px"
                }
                borderRadius={
                    Size.PlanCandidatesGallery.Card.borderRadius + "px"
                }
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
                    onClickFirstItem={onClickFirstItem}
                    onClickLastItem={onClickLastItem}
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
                            <PlaceCategoryIcon
                                category={
                                    plan.places[currentPlaceIndex].categories
                                        .length > 0
                                        ? plan.places[currentPlaceIndex]
                                              .categories[0]
                                        : null
                                }
                                size={20}
                                color="white"
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
