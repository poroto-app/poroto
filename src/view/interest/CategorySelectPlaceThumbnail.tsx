import { LinearGradient } from "@tamagui/linear-gradient";
import { Padding } from "src/constant/padding";
import {
    getDefaultPlaceImage,
    getImageSizeOf,
    ImageSize,
} from "src/domain/models/Image";
import { Place } from "src/domain/models/Place";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { ImageWithSVG } from "src/view/common/ImageWithSVG";
import { PlaceCategoryIcon } from "src/view/place/PlaceCategoryIcon";
import { isWeb, Text, XStack, YStack } from "tamagui";

export function CategorySelectPlaceThumbnail({
    place,
    category,
    imageSize,
}: {
    place: Place;
    category: PlaceCategory;
    imageSize: ImageSize;
}) {
    const placeImage =
        place.images.length > 0
            ? place.images[0]
            : getDefaultPlaceImage({ isWeb });

    return (
        <YStack w="100%" h="100%" position="relative">
            <ImageWithSkeleton
                isGoogleImage={placeImage.isGoogleImage}
                attributionToBottom={false}
                src={getImageSizeOf(imageSize, placeImage)}
            />
            <LinearGradient
                position="absolute"
                right={0}
                bottom={0}
                left={0}
                px={Padding.p16}
                pb={Padding.p16}
                pt={Padding.p16}
                colors={[
                    "rgba(0, 0, 0, 0.00)",
                    "rgba(0, 0, 0, 0.20)",
                    "rgba(0, 0, 0, 0.50)",
                    "rgba(0, 0, 0, 0.80)",
                ]}
                locations={[0, 0.2, 0.5, 1]}
                start={[0, 0]}
                end={[0, 1]}
            >
                <XStack gap={Padding.p8}>
                    <PlaceCategoryIcon
                        category={category}
                        size={24}
                        color="white"
                    />
                    <Text color="white">{place.name}</Text>
                </XStack>
            </LinearGradient>
        </YStack>
    );
}

export function CategorySelectDefaultPlaceThumbnail({
    imageUrl,
}: {
    imageUrl: string;
}) {
    return (
        <XStack
            alignItems="center"
            justifyContent="center"
            w="100%"
            h="100%"
            px={Padding.p32}
            py={Padding.p32}
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            userSelect="none"
        >
            <ImageWithSVG
                alt="category"
                src={imageUrl}
                maxWidth={600}
                maxHeight={400}
                h="100%"
                w="100%"
                objectFit="contain"
            />
        </XStack>
    );
}
