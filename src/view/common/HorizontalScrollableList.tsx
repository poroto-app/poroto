import { Box, Center, HStack, Icon } from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { isPC } from "src/view/constants/userAgent";

type Props = {
    scrollAmount?: number;
    pageButtonOffsetY?: number;
    px?: number | string;
    children?: ReactNode;
};

export const HorizontalScrollableList = ({
    scrollAmount = 400,
    pageButtonOffsetY = 0,
    px = 0,
    children,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!containerRef.current) {
            return;
        }
        const container = containerRef.current;
        const scrollLeft = container.scrollLeft;
        const newScrollLeft =
            scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
        container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    };

    return (
        <Box position="relative" w="100%">
            <HStack
                ref={containerRef}
                w="100%"
                px={px}
                overflowX="auto"
                overflowY="hidden"
                alignItems="flex-start"
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
                    offsetY={pageButtonOffsetY}
                    onClick={() => scroll("left")}
                >
                    <Icon as={MdArrowBackIos} />
                </PageButton>
                <PageButton
                    left="auto"
                    right={0}
                    offsetY={pageButtonOffsetY}
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
    offsetY,
    onClick,
    children,
}: {
    left: number | string;
    right: number | string;
    offsetY: number;
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
            transform={`translateY(calc(-50% + ${offsetY}px))`}
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
