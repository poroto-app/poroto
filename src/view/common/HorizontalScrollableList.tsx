import { Box, Center, HStack, Icon } from "@chakra-ui/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { isPC } from "src/constant/userAgent";
import { HorizontalScrollableListProps } from "src/types/props";

export const HorizontalScrollableList = ({
    scrollAmount = 400,
    pageButtonOffsetY = 0,
    px = 0,
    spacing,
    alignItems = "flex-start",
    pageButtonVisible = isPC,
    roundedEdgeCorner = isPC,
    edgeCornerRadius = 20,
    pageButtonOpacity = 1,
    children,
}: HorizontalScrollableListProps) => {
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
                px={px + "px"}
                spacing={spacing}
                borderRadius={roundedEdgeCorner ? edgeCornerRadius + "px" : 0}
                overflowX="auto"
                overflowY="hidden"
                alignItems={alignItems}
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
                    opacity={pageButtonOpacity}
                    onClick={() => scroll("left")}
                >
                    <Icon as={MdArrowBackIos} />
                </PageButton>
                <PageButton
                    left="auto"
                    right={0}
                    offsetY={pageButtonOffsetY}
                    visible={pageButtonVisible}
                    opacity={pageButtonOpacity}
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
    opacity,
    onClick,
    children,
}: {
    left: number | string;
    right: number | string;
    offsetY: number;
    visible: boolean;
    opacity: number;
    onClick?: () => void;
    children: ReactNode;
}) => {
    return (
        <Center
            visibility={visible ? "visible" : "hidden"}
            opacity={opacity}
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
