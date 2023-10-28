import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Place } from "src/domain/models/Place";
import { ImageSliderPreview } from "src/view/common/ImageSliderPreview";
import { PlaceIcon } from "src/view/plan/PlacePreview";

type Props = {
    place: Place;
    onClickShowRelatedPlaces: (placeId: string) => void;
};

export function EditPlanCandidatePlaceListItem({
    place,
    onClickShowRelatedPlaces,
}: Props) {
    return (
        <VStack
            backgroundColor="#fbf2e7"
            borderRadius="20px"
            w="100%"
            pb="16px"
            alignItems="flex-start"
            overflow="hidden"
        >
            <Box w="100%" h="150px">
                <ImageSliderPreview images={place.images} />
            </Box>
            <HStack px="16px">
                <PlaceIcon
                    category={
                        place.categories.length > 0 ? place.categories[0] : null
                    }
                />
                <Text
                    fontSize="1.15rem"
                    as="h2"
                    fontWeight="bold"
                    color="#222222"
                >
                    {place.name}
                </Text>
            </HStack>
            <VStack w="100%" mt="auto" alignItems="flex-end" px="16px">
                <Box
                    color="#AB7129"
                    as="button"
                    fontWeight="bold"
                    fontSize="16px"
                    onClick={() => onClickShowRelatedPlaces(place.id)}
                >
                    関連した場所を表示
                </Box>
            </VStack>
        </VStack>
    );
}
