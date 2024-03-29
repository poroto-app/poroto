import { Box, Center, HStack, Icon, VStack } from "@chakra-ui/react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useRef, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { IconType } from "react-icons";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { GooglePlaceReview } from "src/domain/models/GooglePlaceReview";
import { PlaceReview } from "src/view/plandetail/PlaceReview";
import { styled } from "styled-components";

type Props = {
    googlePlaceReviews: GooglePlaceReview[] | null;
};
export const PlaceInfoTabPanelReviews = ({ googlePlaceReviews }: Props) => {
    const refSplide = useRef<Splide>(null);
    const reviews = googlePlaceReviews;
    const [currentPage, setCurrentPage] = useState(0);
    const isPC = !isMobile && !isTablet;

    if (!reviews || reviews.length === 0)
        return (
            <Center w="100%" h="100%">
                レビューはありません
            </Center>
        );

    return (
        <SplideContainer
            ref={refSplide}
            options={{
                arrows: false,
                flickMaxPages: 1,
                flickPower: 10,
                focus: "center",
                gap: "8px",
                padding: {
                    right: "28px",
                    left: "28px",
                },
                perPage: 1,
            }}
            hasTrack={false}
            onMove={(splide) => setCurrentPage(splide.index)}
        >
            <VStack w="100%" h="100%" spacing={0}>
                <HStack
                    w="100%"
                    h="100%"
                    alignItems="center"
                    flex={1}
                    overflow="hidden"
                >
                    {isPC && (
                        <PageButton
                            icon={MdArrowBackIos}
                            disabled={currentPage === 0}
                            onClick={() => refSplide.current?.go("<")}
                        />
                    )}
                    <SplideTrack>
                        {reviews.map((review, index) => {
                            return (
                                <SplideSlide
                                    key={index}
                                    style={{ height: "100%" }}
                                >
                                    <PlaceReview
                                        text={review.text}
                                        authorName={review.authorName}
                                        authorUrl={review.authorUrl}
                                        authorPhotoUrl={review.authorPhotoUrl}
                                    />
                                </SplideSlide>
                            );
                        })}
                    </SplideTrack>
                    {isPC && (
                        <PageButton
                            icon={MdArrowForwardIos}
                            disabled={currentPage === reviews.length - 1}
                            onClick={() => refSplide.current?.go(">")}
                        />
                    )}
                </HStack>
                <Box
                    as="ul"
                    className="splide__pagination"
                    style={{ position: "initial" }}
                />
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
    return (
        <Center
            as="button"
            onClick={() => !disabled && onClick()}
            cursor={disabled ? "default" : "pointer"}
            opacity={disabled ? 0 : 1}
            borderRadius="100%"
            p="8px"
        >
            <Icon w="20px" y="20px" as={icon} />
        </Center>
    );
};

const SplideContainer = styled(Splide)`
    width: 100%;
    height: 100%;
    overflow: hidden;

    & > div > div > .splide__track {
        width: 100%;
        height: 100%;
    }
`;
