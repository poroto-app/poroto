import { Box, Center, HStack, Icon, Text } from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Place } from "src/domain/models/Place";
import { createArrayWithSize } from "src/domain/util/array";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { Size } from "src/view/constants/size";
import { isPC } from "src/view/constants/userAgent";

type Props = {
    places: Place[] | null;
};

export const NearbyPlaceList = ({ places }: Props) => {
    if (!places) {
        return (
            <Container>
                {createArrayWithSize(5).map((_, index) => (
                    <NearbyPlaceCardSkeleton key={index} />
                ))}
            </Container>
        );
    }

    // TODO: 要素が一つもないときの対応
    return (
        <Container>
            {places
                .filter((p) => p.images.length > 0)
                .map((place, index) => (
                    <NearbyPlaceCard place={place} key={index} />
                ))}
        </Container>
    );
};

const Container = ({ children }: { children: ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!containerRef.current) {
            return;
        }
        const container = containerRef.current;
        const scrollLeft = container.scrollLeft;
        const scrollAmount = 400;
        const newScrollLeft =
            scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
        container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    };

    return (
        <Box position="relative" w="100%">
            <HStack
                ref={containerRef}
                w="100%"
                px={isPC ? "16px" : 0}
                overflowX="auto"
                overflowY="hidden"
                scrollSnapType="x mandatory"
                sx={{
                    "::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {children}
            </HStack>
            <Box>
                <PageButton
                    left={0}
                    right="auto"
                    onClick={() => scroll("left")}
                >
                    <Icon as={MdArrowBackIos} />
                </PageButton>
                <PageButton
                    left="auto"
                    right={0}
                    onClick={() => scroll("right")}
                >
                    <Icon as={MdArrowForwardIos} />
                </PageButton>
            </Box>
        </Box>
    );
};

const PageButton = ({
    left,
    right,
    onClick,
    children,
}: {
    left: number | string;
    right: number | string;
    onClick?: () => void;
    children: ReactNode;
}) => {
    return (
        <Center
            visibility={isPC ? "visible" : "hidden"}
            position="absolute"
            top="50%"
            left={left}
            right={right}
            transform="translateY(-50%)"
            w="40px"
            h="40px"
            backgroundColor="white"
            borderRadius="100%"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.10)"
            onClick={onClick}
        >
            {children}
        </Center>
    );
};

const NearbyPlaceCard = ({ place }: { place: Place }) => {
    const image = place.images[0];
    return (
        <Box
            w={Size.PlanDetail.NearbyPlaceList.card.w}
            minW={Size.PlanDetail.NearbyPlaceList.card.w}
            h={Size.PlanDetail.NearbyPlaceList.card.h}
            borderRadius={Size.PlanDetail.NearbyPlaceList.card.borderRadius}
            overflow="hidden"
            position="relative"
            scrollSnapAlign="center"
        >
            <ImageWithSkeleton
                src={image.default}
                isGoogleImage={image.isGoogleImage}
                attributionToBottom={false}
            />
            <Box
                px="16px"
                pb="16px"
                pt="32px"
                color="white"
                position="absolute"
                right={0}
                bottom={0}
                left={0}
                background="linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.30) 30%, rgba(0, 0, 0, 0.50) 100%)"
            >
                <Text
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                >
                    {place.name}
                </Text>
            </Box>
        </Box>
    );
};

const NearbyPlaceCardSkeleton = () => {
    return (
        <Box
            w={Size.PlanDetail.NearbyPlaceList.card.w}
            minW={Size.PlanDetail.NearbyPlaceList.card.w}
            h={Size.PlanDetail.NearbyPlaceList.card.h}
            borderRadius={Size.PlanDetail.NearbyPlaceList.card.borderRadius}
            backgroundColor="gray.200"
        />
    );
};
