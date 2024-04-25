import { Box, Divider, HStack, Image, Text, VStack } from "@chakra-ui/react";

type CollagePlace = {
    name: string;
    duration: number;
    imageUrl: string;
};

type CollageProps = {
    title: string;
    places: CollagePlace[];
    introduction: string;
};

export function CollageTemplate({
    title,
    places,
    introduction,
}: CollageProps) {
    return (
        <Box padding={16}>
            <Box textAlign="center" mb={4}>
                <Text
                    color="rgba(130, 141, 205, 1)"
                    fontFamily="Inter"
                    fontWeight="bold"
                    fontSize="80px"
                >
                    {title}
                </Text>
            </Box>
            <Divider borderColor="#A4ABD4" my={4} />
            {places.map((place, index) => (
                <Box key={index}>
                    <HStack
                        justifyContent="space-between"
                        alignItems="flex-start"
                        flexDirection={index % 2 === 0 ? "row" : "row-reverse"} 
                    >
                        <Image
                            src={place.imageUrl}
                            alt={`Collage Image ${index}`}
                            borderRadius="lg"
                            boxSize="400px"
                        />
                        <VStack alignItems="flex-start">
                            <Text
                                color="rgba(130, 141, 205, 1)"
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize="56px"
                            >
                                {place.name}
                            </Text>
                            <Text
                                color="rgba(164, 168, 212, 1)"
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize="32px"
                            >
                                滞在時間：{place.duration}分
                            </Text>
                        </VStack>
                    </HStack>
                    {index !== places.length - 1 && (
                        <Divider borderColor="#A4ABD4" my={4} />
                    )}
                </Box>
            ))}
            <Divider borderColor="#A4ABD4" my={4} />
            <Text
                color="rgba(164, 168, 212, 1)"
                fontFamily="Inter"
                fontWeight="bold"
                fontSize="32px"
            >
                {introduction}
            </Text>
        </Box>
    );
}
