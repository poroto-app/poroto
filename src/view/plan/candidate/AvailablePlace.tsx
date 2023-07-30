import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { Place } from "src/domain/models/Place";

type Props = {
    place: Place;
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
            <Box position="relative" w="100%" flex="1">
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
            </Box>
            <Text px="8px" py="4px" w="100%">
                {place.name}
            </Text>
        </VStack>
    );
}
