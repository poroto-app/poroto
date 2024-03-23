import { Box, Center, HStack, Icon } from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { isPC } from "src/view/constants/userAgent";

type Props = {
    scrollAmount?: number;
    children?: ReactNode;
};

export const HorizontaScrollablelList = ({
    scrollAmount = 400,
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
