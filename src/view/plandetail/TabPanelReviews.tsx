import { Box, Center, HStack, Icon, VStack } from "@chakra-ui/react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useRef, useState } from "react";
import { IconType } from "react-icons";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Place } from "src/domain/models/Place";
import { PlaceReview } from "src/view/plandetail/PlaceReview";
import { styled } from "styled-components";

type Props = {
    place: Place;
};
export const TabPanelReviews = ({ place }: Props) => {
    const refSplide = useRef<Splide>(null);
    const reviews = place.googlePlaceReviews;
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <SplideContainer
            ref={refSplide}
            options={{
                arrows: false,
                height: "200px",
            }}
            hasTrack={false}
            onMoved={(splide) => setCurrentPage(splide.index)}
        >
            <VStack w="100%">
                <HStack w="100%" alignItems="center" flex={1}>
                    <PageButton
                        icon={MdArrowBackIos}
                        disabled={currentPage === 0}
                        onClick={() => refSplide.current?.go("<")}
                    />
                    <Box w="100%" h="100%" flex={1}>
                        <SplideTrack>
                            {place.googlePlaceReviews.map((review, index) => {
                                return (
                                    <SplideSlide key={index}>
                                        <PlaceReview
                                            text={review.text}
                                            authorName={review.authorName}
                                            authorUrl={review.authorUrl}
                                            authorPhotoUrl={
                                                review.authorPhotoUrl
                                            }
                                        />
                                    </SplideSlide>
                                );
                            })}
                        </SplideTrack>
                    </Box>
                    <PageButton
                        icon={MdArrowForwardIos}
                        disabled={currentPage === reviews.length - 1}
                        onClick={() => refSplide.current?.go(">")}
                    />
                </HStack>
                <Box as="ul" className="splide__pagination" />
            </VStack>
        </SplideContainer>
    );
};

const PageButton = ({
    icon,
    disabled,
    onClick,
}: {
    icon: IconType;
    disabled: boolean;
    onClick: () => void;
}) => {
    console.log(disabled);
    return (
        <Center
            as="button"
            onClick={onClick}
            backgroundColor={`rgba(0,0,0,0.1)`}
            opacity={disabled ? 0.5 : 1}
            borderRadius="100%"
            w="24px"
            h="24px"
        >
            <Icon w="8px" y="8px" as={icon} />
        </Center>
    );
};

const SplideContainer = styled(Splide)`
    width: 100%;
    overflow: hidden;

    & > .splide__pagination {
        position: initial;
    }

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
`;
