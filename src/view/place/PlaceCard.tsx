import { Box, Text } from "@chakra-ui/react";
import { Place } from "src/domain/models/Place";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { Size } from "src/view/constants/size";

type Props = {
    place: Place | null;
    onClick?: () => void;
};

export function PlaceCard({ place, onClick }: Props) {
    if (!place) return <PlaceCardSkeleton />;

    const image = place.images[0];
    return (
        <Box
            w={Size.PlaceCard.w}
            minW={Size.PlaceCard.w}
            h={Size.PlaceCard.h}
            borderRadius={Size.PlaceCard.borderRadius}
            overflow="hidden"
            position="relative"
            scrollSnapAlign="center"
            onClick={onClick}
        >
            <ImageWithSkeleton
                src={image.default}
                isGoogleImage={image.isGoogleImage}
                attributionToBottom={false}
            />
            <Box
                px="16px"
                pb="16px"
                pt="32px"
                color="white"
                position="absolute"
                right={0}
                bottom={0}
                left={0}
                background="linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.30) 30%, rgba(0, 0, 0, 0.50) 100%)"
            >
                <Text
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                >
                    {place.name}
                </Text>
            </Box>
        </Box>
    );
}

const PlaceCardSkeleton = () => {
    return (
        <Box
            w={Size.PlaceCard.w}
            minW={Size.PlaceCard.w}
            h={Size.PlaceCard.h}
            borderRadius={Size.PlaceCard.borderRadius}
            backgroundColor="gray.200"
        />
    );
};
