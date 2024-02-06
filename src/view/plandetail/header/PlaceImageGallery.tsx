import { Box, Center, HStack, Icon, Image, Text } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect, useRef } from "react";
import { IconType } from "react-icons";
import {
    MdArrowBackIos,
    MdArrowForwardIos,
    MdLocationOn,
} from "react-icons/md";
import { getImageSizeOf, ImageSizes } from "src/domain/models/Image";
import { Place } from "src/domain/models/Place";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { Size } from "src/view/constants/size";

type Props = {
    places: Place[];
    currentPage: number;
    onPageChange: (page: number) => void;
};
export const PlaceImageGallery = ({
    places,
    currentPage,
    onPageChange,
}: Props) => {
    const refSplide = useRef<Splide>(null);

    useEffect(() => {
        refSplide.current?.go(currentPage);
    }, [currentPage]);

    return (
        <Box position="relative">
            <AmbientBackgroundImage
                scale={5}
                margin={100}
                blur={5}
                src={getImageSizeOf(
                    ImageSizes.Large,
                    places[currentPage].images[0]
                )}
            />
            <Box
                position="relative"
                alignSelf="center"
                borderRadius="20px"
                overflow="hidden"
                w="100%"
                h={Size.PlanDetailHeader.imageH}
                maxW={Size.PlanDetailHeader.maxW}
            >
                <Splide
                    ref={refSplide}
                    onMove={(splide) => onPageChange(splide.index)}
                    options={{
                        arrows: false,
                        drag: places.length > 1,
                        lazyLoad: "nearby",
                        pagination: false,
                        perPage: 1,
                        type: "slide",
                        height: Size.PlanDetailHeader.imageH,
                    }}
                >
                    {places.map((place, i) => (
                        <SplideSlide
                            key={i}
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "relative",
                            }}
                        >
                            <ImageWithSkeleton
                                key={i}
                                src={getImageSizeOf(
                                    ImageSizes.Large,
                                    place.images[0]
                                )}
                                isGoogleImage={place.images[0].isGoogleImage}
                            />
                            <HStack
                                position="absolute"
                                backgroundColor="white"
                                borderRadius="5px"
                                px="4px"
                                py="2px"
                                top="16px"
                                left="16px"
                                userSelect="none"
                            >
                                <Icon as={MdLocationOn} color="#E1A766" />
                                <Text fontSize="14px">{place.name}</Text>
                            </HStack>
                        </SplideSlide>
                    ))}
                </Splide>
                <HStack
                    position="absolute"
                    bottom={0}
                    right={0}
                    px="16px"
                    py="16px"
                    zIndex={1}
                >
                    <SplidePageArrow
                        icon={MdArrowBackIos}
                        disabled={currentPage === 0}
                        onClick={() => refSplide.current?.go("<")}
                    />
                    <SplidePageArrow
                        icon={MdArrowForwardIos}
                        disabled={currentPage === places.length - 1}
                        onClick={() => refSplide.current?.go(">")}
                    />
                </HStack>
            </Box>
        </Box>
    );
};

function AmbientBackgroundImage({
    src,
    scale,
    margin,
    blur,
}: {
    src: string;
    scale: number;
    margin: number;
    blur: number;
}) {
    return (
        <Center
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            w="100%"
            h={`calc(${Size.PlanDetailHeader.imageH})`}
        >
            <Image
                w={`calc(${100 / scale}% + ${margin / scale}px)`}
                h={`calc(${100 / scale}% + ${margin / scale}px)`}
                objectFit="cover"
                backgroundColor="black"
                transform={`scale(${scale})`}
                filter={`blur(${blur}px)`}
                src={src}
            />
        </Center>
    );
}

const SplidePageArrow = ({
    icon,
    disabled,
    onClick,
}: {
    icon: IconType;
    disabled: boolean;
    onClick: () => void;
}) => {
    return (
        <Center
            as="button"
            backgroundColor="rgba(0,0,0,.6)"
            onClick={() => !disabled && onClick()}
            cursor={disabled ? "default" : "pointer"}
            opacity={disabled ? 0.6 : 1}
            borderRadius="100%"
            w="40px"
            h="40px"
        >
            <Icon w="32px" y="32px" as={icon} color="white" />
        </Center>
    );
};
