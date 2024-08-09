import { Box } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useEffect, useRef } from "react";
import { Time } from "src/constant/time";
import { ImageSizes, getImageSizeOf } from "src/domain/models/Image";
import { StoryImagePreviewProps } from "src/types/props";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { StoryImagePreviewTapPagerOverlay } from "src/view/plancandidate/StoryImagePreviewTapPagerOverlay";
import { styled } from "styled-components";

export function StoryImagePreview({
    images,
    imageSize = ImageSizes.Large,
    tapControl = true,
    slideable = true,
    onActiveIndexChange,
    onClickFirstItem,
    onClickLastItem,
}: StoryImagePreviewProps) {
    const refSplide = useRef<Splide | null>(null);

    useEffect(() => {
        if (!refSplide.current || !onActiveIndexChange) return;

        const onUpdateIndex = (index: number, prev: number, dest: number) => {
            onActiveIndexChange(index);
        };

        const splide = refSplide.current.splide.on("move", onUpdateIndex);

        return () => {
            splide.off("move");
        };
    }, [refSplide.current, onActiveIndexChange]);

    const onClickNext = () => {
        if (!refSplide.current || !slideable) return;

        const isLastPage = refSplide.current.splide.index + 1 === images.length;
        if (isLastPage && onClickLastItem) {
            onClickLastItem();
            setTimeout(() => {
                refSplide.current.go(refSplide.current.splide.index + 1);
            }, Time.PlanCandidateGallery.lastItemTransitionDelay);
        } else {
            refSplide.current.go(refSplide.current.splide.index + 1);
        }
    };

    const onClickPrev = () => {
        if (!refSplide.current || !slideable) return;

        const isFirstPage = refSplide.current.splide.index === 0;
        if (isFirstPage && onClickFirstItem) {
            onClickFirstItem();
        } else {
            refSplide.current.go(refSplide.current.splide.index - 1);
        }
    };

    return (
        <Box w="100%" h="100%" overflow="hidden" position="relative">
            <SlideContainer
                ref={(splide) => {
                    refSplide.current = splide;
                }}
                options={{
                    type: "loop",
                    arrows: false,
                    rewind: false,
                    width: "100%",
                    height: "100%",
                    autoWidth: true,
                    autoHeight: true,
                    lazyLoad: "nearby",
                }}
            >
                {images.map((image, i) => (
                    <SplideSlide key={i}>
                        <ImageWithSkeleton
                            isGoogleImage={image.isGoogleImage}
                            attributionToBottom={false}
                            attributionPaddingY="48px"
                            src={getImageSizeOf(imageSize, image)}
                        />
                    </SplideSlide>
                ))}
            </SlideContainer>
            {tapControl && (
                <StoryImagePreviewTapPagerOverlay
                    onClickNext={onClickNext}
                    onClickPrev={onClickPrev}
                />
            )}
        </Box>
    );
}

const SlideContainer = styled(Splide)`
    width: 100%;
    height: 100%;
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

    & > .splide__pagination {
        visibility: hidden;
    }
`;
