import { Box, Center, HStack, Icon } from "@chakra-ui/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { isPC } from "src/view/constants/userAgent";

type Props = {
    scrollAmount?: number;
    pageButtonOffsetY?: number;
    px?: number | string;
    pageButtonVisible?: boolean;
    roundedEdgeCorner?: boolean;
    edgeCornerRadius?: number;
    children?: ReactNode;
};

export const HorizontalScrollableList = ({
    scrollAmount = 400,
    pageButtonOffsetY = 0,
    px = 0,
    pageButtonVisible = isPC,
    roundedEdgeCorner = isPC,
    edgeCornerRadius = 20,
    children,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

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

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const isInside =
                    event.clientX >= rect.left &&
                    event.clientX <= rect.right &&
                    event.clientY >= rect.top &&
                    event.clientY <= rect.bottom;
                setIsHovered(isInside);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <Box position="relative" w="100%">
            <HStack
                ref={containerRef}
                w="100%"
                px={px}
                borderRadius={roundedEdgeCorner ? edgeCornerRadius + "px" : 0}
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
            <Box opacity={isHovered ? 1 : 0} transition="all 0.2s ease-in-out">
                <PageButton
                    left={0}
                    right="auto"
                    offsetY={pageButtonOffsetY}
                    visible={pageButtonVisible}
                    onClick={() => scroll("left")}
                >
                    <Icon as={MdArrowBackIos} />
                </PageButton>
                <PageButton
                    left="auto"
                    right={0}
                    offsetY={pageButtonOffsetY}
                    visible={pageButtonVisible}
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
    visible,
    onClick,
    children,
}: {
    left: number | string;
    right: number | string;
    offsetY: number;
    visible: boolean;
    onClick?: () => void;
    children: ReactNode;
}) => {
    return (
        <Center
            visibility={visible ? "visible" : "hidden"}
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
