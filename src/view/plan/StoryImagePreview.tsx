import { Box, HStack, Image } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useRef } from "react";
import {
    getImageSizeOf,
    Image as ImageType,
    ImageSize,
    ImageSizes,
} from "src/domain/models/Image";
import { styled } from "styled-components";

export function StoryImagePreview({
    images,
    imageSize = ImageSizes.Large,
    tapControl = true,
    slideable = true,
}: {
    images: ImageType[];
    imageSize?: ImageSize;
    tapControl?: boolean;
    slideable?: boolean;
}) {
    const refSplide = useRef<Splide | null>(null);

    const onClickNext = () => {
        if (!refSplide.current || !slideable) return;
        console.log(refSplide.current.splide.index);
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
                        <Box w="100%" h="100%">
                            <Image
                                src={getImageSizeOf(imageSize, image)}
                                w="100%"
                                h="100%"
                                objectFit="cover"
                            />
                        </Box>
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
