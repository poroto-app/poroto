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

    // 横スクロール対応
    useEffect(() => {
        if (!refSplide.current) return;
        refSplide.current.splide.root.addEventListener("wheel", (e) => {
            if (e.deltaX === 0) return;
            e.preventDefault();

            // スクロール操作時は１ページずつ移動するようにする（移動中に新しいスクロール操作で移動が発生しないようにする）
            const { waitForTransition } = refSplide.current.splide.options;
            refSplide.current.splide.options.waitForTransition = true;

            if (e.deltaX > 0) {
                refSplide.current.go(">");
                setActiveIndex(refSplide.current.splide.index);
            } else {
                refSplide.current.go("<");
                setActiveIndex(refSplide.current.splide.index);
            }

            refSplide.current.splide.options.waitForTransition =
                waitForTransition;
        });
    }, [refSplide.current]);

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
                    snap: true,
                    speed: 400,
                    focus: "center",
                    start: defaultActivePlanIndex,
                    width: "100%",
                    height: "100%",
                    autoWidth: true,
                    gap: "32px",
                    // 表示される対象が中央に来るようにする
                    trimSpace: false,
                    // フリック操作で複数ページ移動しないようにする
                    flickMaxPages: 1,
                    flickPower: 100,
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
