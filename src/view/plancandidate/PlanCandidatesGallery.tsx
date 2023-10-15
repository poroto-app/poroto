import { Box, Center, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useEffect, useRef, useState } from "react";
import { Plan } from "src/domain/models/Plan";
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";
import { StoryImagePreview } from "src/view/plancandidate/StoryImagePreview";
import { styled } from "styled-components";

export type Props = {
    planCandidates: Plan[];
    defaultActivePlanIndex?: number;
    onActiveIndexChange?: (index: number) => void;
};

export function PlanCandidatesGallery({
    planCandidates,
    defaultActivePlanIndex = 0,
    onActiveIndexChange,
}: Props) {
    const [activeIndex, setActiveIndex] = useState(defaultActivePlanIndex);
    const refSplide = useRef<Splide | null>(null);

    const onClickCard = (i: number) => {
        refSplide.current?.go(i);
    };

    useEffect(() => {
        onActiveIndexChange?.(activeIndex);
    }, [activeIndex]);

    return (
        <Center w="100%" h="100%">
            <SlideContainer
                ref={(splide) => (refSplide.current = splide)}
                onMove={(splide) => setActiveIndex(splide.index)}
                options={{
                    type: "slide",
                    arrows: false,
                    pagination: false,
                    rewind: false,
                    focus: "center",
                    trimSpace: false, // 表示される対象が中央に来るようにする
                    start: defaultActivePlanIndex,
                    width: "100%",
                    height: "100%",
                    autoWidth: true,
                    speed: 800,
                    gap: "32px",
                }}
            >
                {planCandidates.map((plan, i) => (
                    <SplideSlide key={i} onClick={() => onClickCard(i)}>
                        <PlanCandidateCard
                            plan={plan}
                            isActive={i === activeIndex}
                        />
                    </SplideSlide>
                ))}
            </SlideContainer>
        </Center>
    );
}

function PlanCandidateCard({
    plan,
    isActive,
}: {
    plan: Plan;
    isActive: boolean;
}) {
    const [currentPlaceIndex, setCurrentPlaceIndex] = useState<number>(0);
    const images = plan.places
        .map((place) => (place.images.length > 0 ? place.images[0] : null))
        .filter((image) => image !== null);

    return (
        <Center h="500px">
            <Box
                transition="all 0.3s ease-in-out"
                w="300px"
                h={isActive ? "500px" : "450px"}
                borderRadius="20px"
                overflow="hidden"
                position="relative"
                filter={isActive ? "none" : "blur(1px)"}
                boxShadow={
                    isActive ? "0px 0px 60px 0px rgba(0, 0, 0, 0.25)" : "none"
                }
            >
                <StoryImagePreview
                    images={images}
                    slideable={isActive}
                    onActiveIndexChange={setCurrentPlaceIndex}
                />
                <Box
                    position="absolute"
                    left={0}
                    right={0}
                    bottom={0}
                    px="16px"
                    pb="16px"
                    pt="32px"
                    background="linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.30) 30%, rgba(0, 0, 0, 0.50) 100%)"
                >
                    <VStack w="100%" alignItems="flex-start">
                        <HStack>
                            <Icon
                                w="24px"
                                h="24px"
                                color="white"
                                as={getPlaceCategoryIcon(
                                    plan.places[currentPlaceIndex].categories
                                        .length > 0
                                        ? plan.places[currentPlaceIndex]
                                              .categories[0]
                                        : null
                                )}
                            />
                            <Text color="white">
                                {plan.places[currentPlaceIndex].name}
                            </Text>
                        </HStack>
                        <Text
                            color="white"
                            fontWeight="bold"
                            fontSize="18px"
                            as="h2"
                        >
                            {plan.title}
                        </Text>
                    </VStack>
                </Box>
            </Box>
        </Center>
    );
}

const SlideContainer = styled(Splide)`
    width: 100%;

    .splide__track {
        overflow: visible;
    }
    .splide__pagination {
        bottom: 0;
    }
`;
