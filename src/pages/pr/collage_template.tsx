import { Box, Divider, HStack, Image, Text, VStack } from "@chakra-ui/react";

interface CollageProps {
    title: string;
    location: string;
    duration: number;
    imageUrl: string;
    introduction: string;
}

export function CollageTemplate({
    title,
    location,
    duration,
    imageUrl,
    introduction,
}: CollageProps) {
    return (
        <Box padding={16}>
            <Box textAlign="center">
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
            <HStack justifyContent="space-between" alignItems="flex-start">
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
                        滞在時間：{duration}分
                    </Text>
                </VStack>
                <Image
                    src={imageUrl}
                    alt="Collage Image"
                    borderRadius="lg"
                    boxSize="400px"
                />
            </HStack>
            <Divider borderColor="#A4ABD4" my={4} />
            <HStack justifyContent="space-between" alignItems="flex-start">
                <Image
                    src={imageUrl}
                    alt="Collage Image"
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
                        滞在時間：{duration}分
                    </Text>
                </VStack>
            </HStack>
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
