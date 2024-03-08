import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import { getImageSizeOf, ImageSizes } from "src/domain/models/Image";
import { Place } from "src/domain/models/Place";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { PlaceLikeButton } from "src/view/plandetail/PlaceLikeButton";

type Props = {
    place: Place;
    isLiked: boolean;
    likeCount: number;
    onUpdateLike: (like: boolean) => void;
};

export function PlanHeaderPlaceCard({
    place,
    isLiked,
    likeCount,
    onUpdateLike,
}: Props) {
    return (
        <Box position="relative" w="100%" h="100%">
            <ImageWithSkeleton
                src={getImageSizeOf(ImageSizes.Large, place.images[0])}
                isGoogleImage={place.images[0].isGoogleImage}
            />
            <HStack
                position="absolute"
                top={0}
                left={0}
                right={0}
                p="16px"
                alignItems="flex-start"
                justifyContent="space-between"
            >
                <HStack
                    backgroundColor="white"
                    borderRadius="5px"
                    px="4px"
                    py="2px"
                    top="16px"
                    left="16px"
                    userSelect="none"
                >
                    <Icon as={MdLocationOn} color="#E1A766" />
                    <Text fontSize="14px">{place.name}</Text>
                </HStack>
                <Box>
                    <PlaceLikeButton
                        isLiked={isLiked}
                        likeCount={likeCount}
                        onUpdateLike={onUpdateLike}
                    />
                </Box>
            </HStack>
        </Box>
    );
}
