import { Box, Center, HStack, Icon, Image } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect, useRef } from "react";
import { IconType } from "react-icons";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { ImageSizes, getImageSizeOf } from "src/domain/models/Image";
import { Place } from "src/domain/models/Place";
import { Padding } from "src/view/constants/padding";
import { Size } from "src/view/constants/size";
import { PlanHeaderPlaceCard } from "src/view/plandetail/header/PlanHeaderPlaceCard";

type Props = {
    places: Place[];
    currentPage: number;
    likedPlaceIds: string[];
    onUpdateLikePlace: (placeId: string, isLiked: boolean) => void;
    onPageChange: (page: number) => void;
};
export const PlaceImageGallery = ({
    places,
    likedPlaceIds,
    currentPage,
    onPageChange,
    onUpdateLikePlace,
}: Props) => {
    const refSplide = useRef<Splide>(null);

    useEffect(() => {
        refSplide.current?.go(currentPage);
    }, [currentPage]);

    return (
        <Box position="relative" w={Size.PlanDetailHeader.image.maxW + "px"}>
            <AmbientBackgroundImage
                scale={1.5}
                margin={4}
                blur={20}
                contrast={120}
                src={getImageSizeOf(
                    ImageSizes.Large,
                    places[currentPage].images[0]
                )}
            />
            <Box
                position="relative"
                alignSelf="center"
                overflow="hidden"
                w={`min(100%, ${Size.PlanDetailHeader.image.maxW}px)`}
                h={Size.PlanDetailHeader.image.h + "px"}
                maxW={Size.PlanDetailHeader.image.maxW + "px"}
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
                        height: Size.PlanDetailHeader.image.h + "px",
                        gap: Padding.p32,
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
                            <PlanHeaderPlaceCard
                                key={i}
                                place={place}
                                isLiked={likedPlaceIds.some(
                                    (id) => id === places[currentPage].id
                                )}
                                likeCount={places[currentPage].likeCount}
                                onUpdateLike={(like) =>
                                    onUpdateLikePlace(
                                        places[currentPage].id,
                                        like
                                    )
                                }
                            />
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
    contrast,
}: {
    src: string;
    scale: number;
    margin: number;
    blur: number;
    contrast: number;
}) {
    return (
        <Center
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            w="100%"
            h={`calc(${Size.PlanDetailHeader.image.h + "px"})`}
        >
            <Image
                w={`calc(${100 / scale}% + ${margin / scale}px)`}
                h={`calc(${100 / scale}% + ${margin / scale}px)`}
                objectFit="cover"
                backgroundColor="black"
                transform={`scale(${scale})`}
                filter={`contrast(${contrast}%)  blur(${blur}px)`}
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
