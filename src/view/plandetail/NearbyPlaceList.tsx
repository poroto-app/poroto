import { Box, Text } from "@chakra-ui/react";
import { Place } from "src/domain/models/Place";
import { createArrayWithSize } from "src/domain/util/array";
import { HorizontalScrollablelList } from "src/view/common/HorizontalScrollablelList";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { Size } from "src/view/constants/size";

type Props = {
    places: Place[] | null;
    onSelectPlace?: (place: Place) => void;
};

export const NearbyPlaceList = ({ places, onSelectPlace }: Props) => {
    if (!places) {
        return (
            <HorizontalScrollablelList>
                {createArrayWithSize(5).map((_, index) => (
                    <NearbyPlaceCardSkeleton key={index} />
                ))}
            </HorizontalScrollablelList>
        );
    }

    // TODO: 要素が一つもないときの対応
    return (
        <HorizontalScrollablelList>
            {places
                .filter((p) => p.images.length > 0)
                .map((place, index) => (
                    <NearbyPlaceCard
                        key={index}
                        place={place}
                        onClick={() => onSelectPlace?.(place)}
                    />
                ))}
        </HorizontalScrollablelList>
    );
};

const NearbyPlaceCard = ({
    place,
    onClick,
}: {
    place: Place;
    onClick?: () => void;
}) => {
    const image = place.images[0];
    return (
        <Box
            w={Size.PlanDetail.NearbyPlaceList.card.w}
            minW={Size.PlanDetail.NearbyPlaceList.card.w}
            h={Size.PlanDetail.NearbyPlaceList.card.h}
            borderRadius={Size.PlanDetail.NearbyPlaceList.card.borderRadius}
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
};

const NearbyPlaceCardSkeleton = () => {
    return (
        <Box
            w={Size.PlanDetail.NearbyPlaceList.card.w}
            minW={Size.PlanDetail.NearbyPlaceList.card.w}
            h={Size.PlanDetail.NearbyPlaceList.card.h}
            borderRadius={Size.PlanDetail.NearbyPlaceList.card.borderRadius}
            backgroundColor="gray.200"
        />
    );
};
