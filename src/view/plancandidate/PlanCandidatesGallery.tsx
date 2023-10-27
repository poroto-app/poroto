import { Center } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useEffect, useRef, useState } from "react";
import { Plan } from "src/domain/models/Plan";
import { PlanCandidateGalleryCard } from "src/view/plancandidate/PlanCandidatesGalleryCard";
import { styled } from "styled-components";

export type Props = {
    planCandidates: Plan[];
    defaultActivePlanIndex?: number;
    activePlanIndex?: number;
    onActiveIndexChange?: (index: number) => void;
};

export function PlanCandidatesGallery({
    planCandidates,
    defaultActivePlanIndex = 0,
    activePlanIndex,
    onActiveIndexChange,
}: Props) {
    const [activeIndex, setActiveIndex] = useState(defaultActivePlanIndex);
    const refSplide = useRef<Splide | null>(null);

    const onClickCard = (i: number) => {
        refSplide.current?.go(i);
    };

    useEffect(() => {
        if (!activePlanIndex) return;
        if (activePlanIndex === activeIndex) return;
        setActiveIndex(activePlanIndex);
        refSplide.current?.go(activePlanIndex);
    }, [activePlanIndex, refSplide.current]);

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
                        <PlanCandidateGalleryCard
                            plan={plan}
                            isActive={i === activeIndex}
                        />
                    </SplideSlide>
                ))}
            </SlideContainer>
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
