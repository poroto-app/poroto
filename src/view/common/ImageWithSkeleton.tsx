import { Box, Image, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { Asset } from "src/view/constants/asset";

type Props = {
    src: string;
    isGoogleImage?: boolean;
    
    onClick?: () => void;
};

export function ImageWithSkeleton({ src, isGoogleImage: isGooglePhoto, onClick }: Props) {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <Box
            w="100%"
            h="100%"
            onClick={onClick}
            style={{ cursor: "pointer" }}
            position="relative"
        >
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
            {isGooglePhoto && (
                <Box
                    position="absolute"
                    display="flex"
                    bottom={0}
                    left={0}
                    right={0}
                    py="32px"
                    px="24px"
                    background="linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.30) 30%, rgba(0, 0, 0, 0.50) 100%)"
                >
                    <Image src={Asset.image.googleOnNonWhite} />
                </Box>
            )}
        </Box>
    );
}
