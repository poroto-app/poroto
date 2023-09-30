import {
    Box,
    Image,
    Skeleton,
    SkeletonText,
    Text,
    VStack,
} from "@chakra-ui/react";
import { getImageSizeOf, ImageSizes } from "src/domain/models/Image";
import { Place } from "src/domain/models/Place";

type Props = {
    place: Place | null;
    onClick?: () => void;
};

export function AvailablePlace({ place, onClick }: Props) {
    return (
        <VStack w="100%" overflow="hidden" spacing={0} onClick={onClick}>
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
                <Text py="4px" w="100%">
                    {place.name}
                </Text>
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
