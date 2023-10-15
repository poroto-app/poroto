import { Box, Center, Text } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useRef, useState } from "react";
import { Plan } from "src/domain/models/Plan";
import { StoryImagePreview } from "src/view/plancandidate/StoryImagePreview";
import { styled } from "styled-components";

export type Props = {
    planCandidates: Plan[];
};

export function PlanCandidatesGallery({ planCandidates }: Props) {
    const defaultActiveIndex = Math.floor(planCandidates.length / 2);
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const refSplide = useRef<Splide | null>(null);

    const onClickCard = (i: number) => {
        refSplide.current?.go(i);
    };

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
                    start: defaultActiveIndex,
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
                <StoryImagePreview images={images} slideable={isActive} />
                <Box
                    position="absolute"
                    left={0}
                    right={0}
                    bottom={0}
                    px="16px"
                    pb="16px"
                    pt="32px"
                    background="linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.10) 23.96%, rgba(0, 0, 0, 0.20) 100%)"
                >
                    <Text
                        color="white"
                        fontWeight="bold"
                        fontSize="16px"
                        as="h2"
                    >
                        {plan.title}
                    </Text>
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
