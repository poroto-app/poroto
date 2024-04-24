import { Box, Divider, HStack, Image, Text, VStack } from "@chakra-ui/react";

interface CollageProps {
    title: string;
    locations: string[];
    durations: number[];
    imageUrls: string[];
    introduction: string;
}

export function CollageTemplate({
    title,
    locations,
    durations,
    imageUrls,
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
            {locations.map((location, index) => (
                <Box key={index}>
                    {index % 2 === 0 ? (
                        <HStack
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <VStack alignItems="flex-start">
                                <Text
                                    color="rgba(130, 141, 205, 1)"
                                    fontFamily="Inter"
                                    fontWeight="bold"
                                    fontSize="56px"
                                >
                                    {location}
                                </Text>
                                <Text
                                    color="rgba(164, 168, 212, 1)"
                                    fontFamily="Inter"
                                    fontWeight="bold"
                                    fontSize="32px"
                                >
                                    滞在時間：{durations[index]}分
                                </Text>
                            </VStack>
                            <Image
                                src={imageUrls[index]}
                                alt={`Collage Image ${index}`}
                                borderRadius="lg"
                                boxSize="400px"
                            />
                        </HStack>
                    ) : (
                        <HStack
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Image
                                src={imageUrls[index]}
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
                                    {location}
                                </Text>
                                <Text
                                    color="rgba(164, 168, 212, 1)"
                                    fontFamily="Inter"
                                    fontWeight="bold"
                                    fontSize="32px"
                                >
                                    滞在時間：{durations[index]}分
                                </Text>
                            </VStack>
                        </HStack>
                    )}
                    {index !== locations.length - 1 && (
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
