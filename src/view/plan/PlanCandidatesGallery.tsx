import { Box, Center, Image } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useRef, useState } from "react";
import { getImageSizeOf, ImageSizes } from "src/domain/models/Image";
import { Plan } from "src/domain/models/Plan";
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
    }

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
                boxShadow={isActive ? "0px 0px 60px 0px rgba(0, 0, 0, 0.25)" : "none"}
            >
                <Image
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    src={getImageSizeOf(
                        ImageSizes.Large,
                        plan.places[0].images[0]
                    )}
                />
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
