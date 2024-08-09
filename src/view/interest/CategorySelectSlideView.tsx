import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Splide as SplideCore } from "@splidejs/splide";
import "@splidejs/splide/css";
import { useEffect, useRef, useState } from "react";
import { isPC } from "src/constant/userAgent";
import { ImageSize } from "src/data/graphql/generated";
import { CategorySelectSlideViewProps } from "src/types/props";
import {
    CategorySelectDefaultPlaceThumbnail,
    CategorySelectPlaceThumbnail,
} from "src/view/interest/CategorySelectPlaceThumbnail";
import { styled } from "styled-components";

export const CategorySelectSlideView = ({
    category,
    interactiveAnimation = true,
}: CategorySelectSlideViewProps) => {
    const refSplide = useRef<Splide | null>(null);

    // スライドできることを示すために、最初だけ自動でスライドアニメーションを表示する
    const [
        isInteractiveAnimationAlreadyPlayed,
        setIsInteractiveAnimationAlreadyPlayed,
    ] = useState(false);

    const placesOfCategory = category.places.filter(
        (place) => place.images.length > 0
    );

    const getSplideList = (splide: SplideCore) => {
        const splideLists = splide.root.getElementsByClassName("splide__list");
        if (splideLists.length === 0) return null;
        return splideLists.item(0) as HTMLUListElement;
    };

    const playInteractiveAnimation = async (splide: SplideCore) => {
        const splideList = getSplideList(splide);

        const initialTransform = splideList.style.transform;
        const currentTransformValue =
            initialTransform.match(/translateX\((.*)px\)/);
        if (currentTransformValue === null) return;
        const initialTransformX = Number(currentTransformValue[1]);

        const sleep = (msec: number) =>
            new Promise((resolve) => setTimeout(resolve, msec));

        splideList.style.transition = "transform 0.5s ease-in-out";
        await sleep(500);
        splideList.style.transform = `translateX(${initialTransformX - 100}px)`;
        await sleep(500);
        splideList.style.transform = `translateX(${initialTransformX}px)`;
        await sleep(500);
        splideList.style.transition = "";
    };

    useEffect(() => {
        if (!refSplide.current) return;
        if (!interactiveAnimation || isInteractiveAnimationAlreadyPlayed)
            return;
        if (placesOfCategory.length === 0) return;

        // 初めて複数の場所が表示されたときにのみ、アニメーションを表示する
        playInteractiveAnimation(refSplide.current.splide);

        // 再生し終える前に終了したとしても、再生済みとして扱う（連続クリックしたときに再生されないようにするため）
        setIsInteractiveAnimationAlreadyPlayed(true);
    }, [refSplide.current, category.name]);

    useEffect(() => {
        // カテゴリが切り替わったときは、初期ページに戻るようにする
        if (!refSplide.current) return;

        const splideList = getSplideList(refSplide.current.splide);
        if (!splideList) return;

        const { transition } = splideList.style;
        splideList.style.transition = "";
        refSplide.current.go(0);
        splideList.style.transition = transition;
    }, [category.name]);

    return (
        <SplideContainer
            ref={(splide) => {
                refSplide.current = splide;
            }}
            options={{
                type: "loop",
                arrows: placesOfCategory.length > 0 && isPC,
                drag: placesOfCategory.length > 0,
                pagination: false,
                rewind: false,
                lazyLoad: "nearby",
                perPage: 1,
                perMove: 1,
            }}
        >
            <SplideSlide>
                <CategorySelectDefaultPlaceThumbnail
                    imageUrl={category.defaultThumbnailUrl}
                />
            </SplideSlide>
            {placesOfCategory
                .filter((p) => p.images.length > 0)
                .map((place, index) => (
                    <SplideSlide key={index}>
                        <CategorySelectPlaceThumbnail
                            place={place}
                            category={{
                                id: category.name,
                                displayName: category.displayName,
                            }}
                            imageSize={ImageSize.Large}
                        />
                    </SplideSlide>
                ))}
        </SplideContainer>
    );
};

const SplideContainer = styled(Splide)`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;

    & > .splide__track {
        width: 100%;
        height: 100%;
    }

    & > .splide__track > .splide__list {
        width: 100%;
        height: 100%;
    }

    & > .splide__track > .splide__list > .splide__slide {
        width: 100%;
        height: 100%;
    }

    & > .splide__arrows {
        opacity: 0;
        width: 100%;
        height: 100%;
        display: flex;
        position: absolute;
        z-index: 99;

        &:hover {
            opacity: 1;
        }

        & > .splide__arrow--prev {
            justify-content: flex-start;
        }
        & > .splide__arrow--next {
            justify-content: flex-end;
        }
        & > .splide__arrow {
            position: initial;
            transform: none;
            background-color: transparent;
            z-index: 1;
            flex: 1;
            height: 100%;
            padding: 32px;
            border-radius: 0;
            transition: background-color 0.2s ease-in-out;

            &:disabled {
                opacity: 0;
            }

            &:hover {
                background-color: rgba(0, 0, 0, 0.05);
            }

            > svg {
                width: 12px;
                height: 12px;
            }
        }
    }
`;