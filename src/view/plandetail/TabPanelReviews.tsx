import { Center, HStack, Icon } from "@chakra-ui/react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useRef, useState } from "react";
import { IconType } from "react-icons";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { GooglePlaceReview } from "src/domain/models/GooglePlaceReview";
import { PlaceReview } from "src/view/plandetail/PlaceReview";
import { styled } from "styled-components";

type Props = {
    googlePlaceReviews: GooglePlaceReview[];
};
export const TabPanelReviews = ({ googlePlaceReviews }: Props) => {
    const refSplide = useRef<Splide>(null);
    const reviews = googlePlaceReviews;
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <SplideContainer
            ref={refSplide}
            options={{
                arrows: false,
                pagination: false,
                height: "100%",
                flickMaxPages: 1,
                flickPower: 10,
            }}
            hasTrack={false}
            onMove={(splide) => setCurrentPage(splide.index)}
        >
            <HStack w="100%" h="100%" alignItems="center" flex={1}>
                <PageButton
                    icon={MdArrowBackIos}
                    disabled={currentPage === 0}
                    onClick={() => refSplide.current?.go("<")}
                />
                <SplideTrack>
                    {reviews.map((review, index) => {
                        return (
                            <SplideSlide
                                key={index}
                                style={{ height: "100%", width: "100%" }}
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
                <PageButton
                    icon={MdArrowForwardIos}
                    disabled={currentPage === reviews.length - 1}
                    onClick={() => refSplide.current?.go(">")}
                />
            </HStack>
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
            backgroundColor="#efd8be"
            opacity={disabled ? 0 : 1}
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
    height: 100%;
    overflow: hidden;

    & > div > .splide__track {
        width: 100%;
        height: 100%;
    }
`;
