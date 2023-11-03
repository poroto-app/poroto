import {
    Box,
    Center,
    HStack,
    Icon,
    Image as ChakraImage,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { ImageSize } from "src/data/graphql/generated";
import { getImageSizeOf, ImageSizes } from "src/domain/models/Image";
import { LocationCategory } from "src/domain/models/LocationCategory";
import { LocationCategoryWithPlace } from "src/domain/models/LocationCategoryWithPlace";
import { Place } from "src/domain/models/Place";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { SelectButton } from "src/view/interest/SelectButton";
import { getPlaceCategoryIcon } from "../plan/PlaceCategoryIcon";

type Props = {
    category: LocationCategoryWithPlace;
    onClickYes: (category: LocationCategory) => void;
    onClickNo: (category: LocationCategory) => void;
};
export const CategorySelect = ({ category, onClickYes, onClickNo }: Props) => {
    const thumbnailImageSize: ImageSize = ImageSizes.Large as ImageSize;
    const placesOfCategory = category.places.filter(
        (place) => place.images.length > 0
    );
    const [visiblePlaceIndex, setVisiblePlaceIndex] = useState<number>(null);

    const getNextPlaceIndex = () => {
        if (visiblePlaceIndex === null) {
            return 0;
        } else if (visiblePlaceIndex === placesOfCategory.length - 1) {
            return null;
        } else {
            return visiblePlaceIndex + 1;
        }
    };

    const getPrevPlaceIndex = () => {
        if (visiblePlaceIndex === null) {
            return placesOfCategory.length - 1;
        } else if (visiblePlaceIndex === 0) {
            return null;
        } else {
            return visiblePlaceIndex - 1;
        }
    };

    const handleOnClickNextPlace = () => {
        setVisiblePlaceIndex(getNextPlaceIndex());
    };

    const handleOnClickPrevPlace = () => {
        setVisiblePlaceIndex(getPrevPlaceIndex());
    };

    // サムネイル画像を prefetch する
    useEffect(() => {
        if (placesOfCategory.length === 0) return;

        const nextIndex = getNextPlaceIndex();
        const prevIndex = getPrevPlaceIndex();

        if (prevIndex)
            console.log(
                getImageSizeOf(
                    thumbnailImageSize,
                    placesOfCategory[prevIndex].images[0]
                )
            );
        if (nextIndex)
            console.log(
                getImageSizeOf(
                    thumbnailImageSize,
                    placesOfCategory[nextIndex].images[0]
                )
            );

        if (prevIndex) {
            new Image().src = getImageSizeOf(
                thumbnailImageSize,
                placesOfCategory[prevIndex].images[0]
            );
        }
        if (nextIndex) {
            new Image().src = getImageSizeOf(
                thumbnailImageSize,
                placesOfCategory[nextIndex].images[0]
            );
        }
    }, [visiblePlaceIndex]);

    return (
        <VStack h="100%" w="100%" spacing={6}>
            <VStack
                w="100%"
                h="100%"
                maxH="100%"
                border="1.5px solid rgba(0, 0, 0, 0.15)"
                boxShadow="0 0 60px 20px rgba(187, 160, 166, 0.1)"
                borderRadius="15px"
                flex={1}
                overflow="hidden"
                pos="relative"
            >
                <Box
                    w="100%"
                    h="100%"
                    flex={1}
                    position="relative"
                    overflow="hidden"
                >
                    <TouchDetector
                        onClickNext={handleOnClickNextPlace}
                        onClickPrev={handleOnClickPrevPlace}
                    />
                    {visiblePlaceIndex !== null ? (
                        <PlaceThumbnail
                            place={placesOfCategory[visiblePlaceIndex]}
                            category={{ id: category.name }}
                            imageSize={thumbnailImageSize}
                        />
                    ) : (
                        <DefaultThumbnail
                            imageUrl={category.defaultThumbnailUrl}
                        />
                    )}
                </Box>
                <Text fontSize="1.25rem" py={4}>
                    {category.displayName}
                </Text>
            </VStack>
            <HStack w="100%">
                <SelectButton
                    color="#E96479"
                    onClick={() => onClickNo(category)}
                    icon={MdClose}
                />
                <SelectButton
                    color="#7DB9B6"
                    onClick={() => onClickYes(category)}
                    icon={MdCheck}
                />
            </HStack>
        </VStack>
    );
};

function TouchDetector({
    onClickNext,
    onClickPrev,
}: {
    onClickNext: () => void;
    onClickPrev: () => void;
}) {
    return (
        <HStack
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            w="100%"
            h="100%"
            zIndex={10}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <Box flex={1} h="100%" onClick={onClickPrev} />
            <Box flex={1} h="100%" onClick={onClickNext} />
        </HStack>
    );
}

function PlaceThumbnail({
    place,
    category,
    imageSize,
}: {
    place: Place;
    category: PlaceCategory;
    imageSize: ImageSize;
}) {
    return (
        <Box w="100%" h="100%" position="relative">
            <ImageWithSkeleton
                src={getImageSizeOf(imageSize, place.images[0])}
            />
            <Box
                position="absolute"
                right={0}
                bottom={0}
                left={0}
                px="16px"
                pb="16px"
                pt="32px"
                background="linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.30) 30%, rgba(0, 0, 0, 0.50) 100%)"
            >
                <HStack>
                    <Icon
                        w="24px"
                        h="24px"
                        color="white"
                        as={getPlaceCategoryIcon(category)}
                    />
                    <Text color="white">{place.name}</Text>
                </HStack>
            </Box>
        </Box>
    );
}

const DefaultThumbnail = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <Center
            w="100%"
            h="100%"
            px="32px"
            py="32px"
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
        >
            <ChakraImage
                src={imageUrl}
                maxW="600px"
                maxH="400px"
                h="100%"
                w="100%"
            />
        </Center>
    );
};
