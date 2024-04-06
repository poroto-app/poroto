import { Box, HStack } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useEffect, useRef } from "react";
import {
    ImageSize,
    ImageSizes,
    Image as ImageType,
    getImageSizeOf,
} from "src/domain/models/Image";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { styled } from "styled-components";

type Props = {
    images: ImageType[];
    imageSize?: ImageSize;
    tapControl?: boolean;
    slideable?: boolean;
    onActiveIndexChange?: (index: number) => void;
};

export function StoryImagePreview({
    images,
    imageSize = ImageSizes.Large,
    tapControl = true,
    slideable = true,
    onActiveIndexChange,
}: Props) {
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
        refSplide.current.go(refSplide.current.splide.index + 1);
    };

    const onClickPrev = () => {
        if (!refSplide.current || !slideable) return;
        refSplide.current.go(refSplide.current.splide.index - 1);
    };

    return (
        <Box w="100%" h="100%" overflow="hidden" position="relative">
            <SlideContainer
                ref={(splide) => (refSplide.current = splide)}
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
                <HStack
                    position="absolute"
                    top={0}
                    right={0}
                    bottom={0}
                    left={0}
                >
                    <Box w="100%" h="100%" onClick={onClickPrev} />
                    <Box w="100%" h="100%" onClick={onClickNext} />
                </HStack>
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
        top: 0.5em;
        bottom: initial !important;
        // :not(is-overflow) となっても表示されるようにする
        display: flex !important;
    }

    & > .splide__pagination > li {
        flex: 1;
        padding: 0 1px;
    }

    & > .splide__pagination > li > .splide__pagination__page {
        width: 100%;
        height: 4px;
        border-radius: 10px;
        transform: scale(1);
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);
    }
`;
