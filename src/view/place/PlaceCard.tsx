import { Box, Text, VStack } from "@chakra-ui/react";
import { Size } from "src/constant/size";
import { Place } from "src/domain/models/Place";
import { hasValue } from "src/domain/util/null";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";

type Props = {
    place: Place | null;
    w?: string | number;
    h?: string | number;
    onClick?: () => void;
};

export function PlaceCard({
    place,
    w = Size.PlaceCard.w + "px",
    h = Size.PlaceCard.h + "px",
    onClick,
}: Props) {
    if (!place) return <PlaceCardSkeleton />;

    // TODO: 画像が存在しない場合に、プレースホルダーを表示する
    const image = place.images?.length > 0 ? place.images[0] : null;

    return (
        <Box
            w={w}
            minW={w}
            h={h}
            borderRadius={Size.PlaceCard.borderRadius + "px"}
            overflow="hidden"
            position="relative"
            scrollSnapAlign="center"
            onClick={onClick}
        >
            <ImageWithSkeleton
                src={image?.default || ""}
                isGoogleImage={image?.isGoogleImage || false}
                attributionToBottom={false}
            />
            <VStack
                alignItems="flex-start"
                spacing={0}
                px="16px"
                pb="16px"
                pt="32px"
                color="white"
                position="absolute"
                right={0}
                bottom={0}
                left={0}
                background="linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.30) 30%, rgba(0, 0, 0, 0.50) 100%)"
                userSelect="none"
                cursor="pointer"
            >
                {hasValue(place.address) && (
                    <Text
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        fontSize="14px"
                    >
                        {place.address}
                    </Text>
                )}
                <Text
                    fontWeight="bold"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                >
                    {place.name}
                </Text>
            </VStack>
        </Box>
    );
}

const PlaceCardSkeleton = () => {
    return (
        <Box
            w={Size.PlaceCard.w + "px"}
            minW={Size.PlaceCard.w + "px"}
            h={Size.PlaceCard.h + "px"}
            borderRadius={Size.PlaceCard.borderRadius + "px"}
            backgroundColor="gray.200"
        />
    );
};
