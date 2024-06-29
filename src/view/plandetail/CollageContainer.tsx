import { Box, Center } from "@chakra-ui/react";
import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
    children?: ReactNode;
};

// 親要素の高さにあわせて、自動的にコラージュ画像をスケールする
export function CollageContainer({ children }: Props) {
    const collageContainerRef = useRef<HTMLDivElement>(null);
    const collageRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (collageContainerRef.current && collageRef.current) {
                const containerHeight =
                    collageContainerRef.current.clientHeight;
                const collageHeight = collageRef.current.clientHeight;
                const scaleValue = containerHeight / collageHeight;
                setScale(scaleValue);
            }
        };
        const resizeObserver = new ResizeObserver(handleResize);

        if (collageContainerRef.current) {
            resizeObserver.observe(collageContainerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <Box w="100%" position="relative" ref={collageContainerRef}>
            <Center
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                transform={`scale(${scale})`}
            >
                <Box ref={collageRef}>{children}</Box>
            </Center>
        </Box>
    );
}
