import {
    Box,
    Center,
    HStack,
    Icon,
    Image as ChakraImage,
    Text,
    VStack,
} from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Splide as SplideCore } from "@splidejs/splide";
import "@splidejs/splide/css";
import { useEffect, useRef, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { MdCheck, MdClose } from "react-icons/md";
import { ImageSize } from "src/data/graphql/generated";
import { getImageSizeOf, ImageSizes } from "src/domain/models/Image";
import { LocationCategory } from "src/domain/models/LocationCategory";
import { LocationCategoryWithPlace } from "src/domain/models/LocationCategoryWithPlace";
import { Place } from "src/domain/models/Place";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { SelectButton } from "src/view/interest/SelectButton";
import { styled } from "styled-components";
import { getPlaceCategoryIcon } from "../plan/PlaceCategoryIcon";

/**
 * @param interactiveAnimation trueの場合、スライドして切り替わることを示すためのアニメーションを表示する
 */
type Props = {
    category: LocationCategoryWithPlace;
    interactiveAnimation?: boolean;
    onClickYes: (category: LocationCategory) => void;
    onClickNo: (category: LocationCategory) => void;
};
export const CategorySelect = ({
    category,
    interactiveAnimation = true,
    onClickYes,
    onClickNo,
}: Props) => {
    const [
        isInteractiveAnimationAlreadyPlayed,
        setIsInteractiveAnimationAlreadyPlayed,
    ] = useState(false);
    const thumbnailImageSize: ImageSize = ImageSizes.Large as ImageSize;
    const isPC = !isMobile && !isTablet;
    const placesOfCategory = category.places.filter(
        (place) => place.images.length > 0
    );
    const refSplide = useRef<Splide | null>(null);

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
        <VStack h="100%" w="100%" spacing={6}>
            <VStack
                w="100%"
                h="100%"
                maxH="100%"
                border="1.5px solid rgba(0, 0, 0, 0.15)"
                boxShadow="0 0 60px 20px rgba(187, 160, 166, 0.1)"
                borderRadius="15px"
                flex={1}
                overflow="hidden"
                pos="relative"
            >
                <Box
                    w="100%"
                    h="100%"
                    flex={1}
                    position="relative"
                    overflow="hidden"
                >
                    <SplideContainer
                        ref={(splide) => (refSplide.current = splide)}
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
                            <DefaultThumbnail
                                imageUrl={category.defaultThumbnailUrl}
                            />
                        </SplideSlide>
                        {placesOfCategory.map((place, index) => (
                            <SplideSlide key={index}>
                                <PlaceThumbnail
                                    place={place}
                                    category={{ id: category.name, displayName: category.displayName }}
                                    imageSize={thumbnailImageSize}
                                />
                            </SplideSlide>
                        ))}
                    </SplideContainer>
                </Box>
                <Text fontSize="1.25rem" py={4}>
                    {category.displayName}
                </Text>
            </VStack>
            <HStack w="100%">
                <SelectButton
                    color="#E96479"
                    onClick={() => onClickNo(category)}
                    icon={MdClose}
                />
                <SelectButton
                    color="#7DB9B6"
                    onClick={() => onClickYes(category)}
                    icon={MdCheck}
                />
            </HStack>
        </VStack>
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

function PlaceThumbnail({
    place,
    category,
    imageSize,
}: {
    place: Place;
    category: PlaceCategory;
    imageSize: ImageSize;
}) {
    return (
        <Box w="100%" h="100%" position="relative">
            <ImageWithSkeleton
                src={getImageSizeOf(imageSize, place.images[0])}
            />
            <Box
                position="absolute"
                right={0}
                bottom={0}
                left={0}
                px="16px"
                pb="16px"
                pt="48px"
                background="linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.20) 20%, rgba(0, 0, 0, 0.50) 40%, rgba(0, 0, 0, 0.80) 100%)"
            >
                <HStack>
                    <Icon
                        w="24px"
                        h="24px"
                        color="white"
                        as={getPlaceCategoryIcon(category)}
                    />
                    <Text color="white">{place.name}</Text>
                </HStack>
            </Box>
        </Box>
    );
}

const DefaultThumbnail = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <Center
            w="100%"
            h="100%"
            px="32px"
            py="32px"
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
            userSelect="none"
        >
            <ChakraImage
                src={imageUrl}
                maxW="600px"
                maxH="400px"
                h="100%"
                w="100%"
            />
        </Center>
    );
};
