import { Box, Divider, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import Logo from "src/view/assets/svg/logo.svg";
import { AppTrans } from "src/view/common/AppTrans";

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

export const CollageTemplate = forwardRef<HTMLDivElement, CollageProps>(
    function CollageTemplateComponent({ title, places, introduction }, ref) {
        const { t } = useTranslation();
        return (
            <VStack
                ref={ref}
                w="1080px"
                h="1920px"
                minW="1080px"
                padding={16}
                position="relative"
                background="white"
            >
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
                <VStack w="100%" flex={1} spacing="32px" divider={<Divider />}>
                    {places.map((place, index) => (
                        <HStack
                            spacing="32px"
                            key={index}
                            flex={1}
                            w="100%"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            flexDirection={
                                index % 2 === 0 ? "row" : "row-reverse"
                            }
                        >
                            <Box
                                h="100%"
                                w="100%"
                                overflow="hidden"
                                position="relative"
                                flex={1}
                            >
                                <Image
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    right={0}
                                    bottom={0}
                                    h="100%"
                                    w="100%"
                                    objectFit="cover"
                                    src={place.imageUrl}
                                    alt={`Collage Image ${index}`}
                                    borderRadius="lg"
                                />
                            </Box>
                            <VStack
                                alignItems="flex-start"
                                spacing={0}
                                flex={1}
                            >
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
                                    {t("place:estimatedStayDuration")}：
                                    <AppTrans
                                        i18nKey={"common:minutesLabel"}
                                        values={{ minutes: place.duration }}
                                    />
                                </Text>
                            </VStack>
                        </HStack>
                    ))}
                </VStack>
                <Divider borderColor="#A4ABD4" my={4} />
                <HStack spacing={8} alignItems="center">
                    <Text
                        color="rgba(164, 168, 212, 1)"
                        fontFamily="Inter"
                        fontWeight="bold"
                        fontSize="32px"
                    >
                        {introduction}
                    </Text>
                    <Logo
                        viewBox="0 0 315 75"
                        style={{
                            bottom: 0,
                            right: 0,
                            position: "absolute",
                        }}
                    />
                </HStack>
            </VStack>
        );
    }
);
