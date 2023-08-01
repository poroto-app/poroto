import {
    Box,
    Image,
    Skeleton,
    SkeletonText,
    Text,
    VStack,
} from "@chakra-ui/react";
import { Place } from "src/domain/models/Place";

type Props = {
    place: Place | null;
};

export function AvailablePlace({ place }: Props) {
    return (
        <VStack
            h="200px"
            w="150px"
            border="1px solid rgba(0,0,0,.1)"
            borderRadius="10px"
            overflow="hidden"
            spacing={0}
        >
            <Box position="relative" w="100%" h="100%">
                {place ? (
                    <Image
                        position="absolute"
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        w="100%"
                        h="100%"
                        src={place.imageUrls[0]}
                        alt={place.name}
                        objectFit="cover"
                    />
                ) : (
                    <Skeleton w="100%" h="100%" borderRadius={0} />
                )}
            </Box>
            {place ? (
                <Text
                    px="8px"
                    py="4px"
                    w="100%"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                >
                    {place.name}
                </Text>
            ) : (
                <SkeletonText
                    px="8px"
                    py="4px"
                    w="100%"
                    noOfLines={1}
                    skeletonHeight="1rem"
                />
            )}
        </VStack>
    );
}
