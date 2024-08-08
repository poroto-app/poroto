import { Center } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useEffect, useRef, useState } from "react";
import { Time } from "src/constant/time";
import { Plan } from "src/domain/models/Plan";
import {
    PlanCandidateGalleryCard,
    PlanCandidateGalleryCardPlaceHolder,
} from "src/view/plancandidate/PlanCandidatesGalleryCard";
import { styled } from "styled-components";

export type Props = {
    planCandidates: Plan[];
    defaultActivePlanIndex?: number;
    activePlanIndex?: number;
    isCreating?: boolean;
    onActiveIndexChange?: (index: number) => void;
};

export function PlanCandidatesGallery({
    planCandidates,
    defaultActivePlanIndex = 0,
    activePlanIndex,
    isCreating = false,
    onActiveIndexChange,
}: Props) {
    const [activeIndex, setActiveIndex] = useState(defaultActivePlanIndex);
    const refSplide = useRef<Splide | null>(null);

    const onClickCard = (i: number) => {
        refSplide.current?.go(i);
    };

    const onClickFirstItem = (i: number) => {
        setTimeout(() => {
            const prevActiveIndex =
                (i - 1 + planCandidates.length) % planCandidates.length;
            onClickCard(prevActiveIndex);
        }, 50);
    };

    const onClickLastItem = (i: number) => {
        // カードタップによるこのカードへの移動処理と
        // カード中の最後の画像タップによる次のカードへの移動処理が重ならないように
        // 次のカードへの移動処理を遅延させる
        setTimeout(() => {
            const nextActiveIndex = (i + 1) % planCandidates.length;
            onClickCard(nextActiveIndex);
        }, Time.PlanCandidateGallery.lastItemTransitionDelay);
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
                ref={(splide) => {
                    refSplide.current = splide;
                }}
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
                            onClickFirstItem={() => onClickFirstItem(i)}
                            onClickLastItem={() => onClickLastItem(i)}
                        />
                    </SplideSlide>
                ))}
                {isCreating && <PlanCandidateGalleryCardPlaceHolder />}
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
