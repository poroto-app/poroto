import {
    Box,
    HStack,
    Icon,
    Image,
    Skeleton,
    SkeletonText,
    Text,
    VStack,
} from "@chakra-ui/react";
import { ImageSizes, getImageSizeOf } from "src/domain/models/Image";
import { Place } from "src/domain/models/Place";
import { Colors } from "src/view/constants/color";
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";

type Props = {
    place: Place | null;
    onClick?: () => void;
};

export function AvailablePlace({ place, onClick }: Props) {
    return (
        <VStack
            as="button"
            w="100%"
            overflow="hidden"
            spacing={0}
            onClick={onClick}
        >
            <Box
                position="relative"
                w="100%"
                h="170px"
                borderRadius="10px"
                overflow="hidden"
            >
                {place ? (
                    <Image
                        position="absolute"
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        w="100%"
                        h="100%"
                        src={
                            place.images.length > 0 &&
                            getImageSizeOf(ImageSizes.Small, place.images[0])
                        }
                        alt={place.name}
                        objectFit="cover"
                    />
                ) : (
                    <Skeleton w="100%" h="170px" borderRadius={0} />
                )}
            </Box>
            {place ? (
                <HStack w="100%">
                    <Icon
                        w="24px"
                        h="24px"
                        color={Colors.primary["600"]}
                        as={getPlaceCategoryIcon(
                            place.categories.length > 0
                                ? place.categories[0]
                                : null
                        )}
                    />
                    <Text py="4px">{place.name}</Text>
                </HStack>
            ) : (
                <SkeletonText
                    py="4px"
                    w="100%"
                    noOfLines={1}
                    skeletonHeight="1rem"
                />
            )}
        </VStack>
    );
}
