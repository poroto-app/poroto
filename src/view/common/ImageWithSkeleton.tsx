import { Box, Image, Skeleton } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
    src: string;
    onClick?: () => void;
};

export function ImageWithSkeleton({ src, onClick }: Props) {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <Box w="100%" h="100%" onClick={onClick} style={{ cursor: "pointer" }} position="relative">
            <Skeleton
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                left={0}
                transition="opacity .3s"
                opacity={isLoading ? 1 : 0}
            />
            <Image
                src={src}
                objectFit="cover"
                w={isLoading ? "0" : "100%"}
                h="100%"
                onLoad={() => setIsLoading(false)}
                scrollSnapAlign="start"
            />
        </Box>
    );
}
