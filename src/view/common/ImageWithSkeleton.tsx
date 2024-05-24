import { Box, Image, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { Asset } from "src/view/constants/asset";

type Props = {
    src: string;
    alt?: string;
    isGoogleImage?: boolean;
    attributionToBottom?: boolean;
    attributionPaddingY?: string;
    onClick?: () => void;
};

export function ImageWithSkeleton({
    src,
    alt,
    isGoogleImage: isGooglePhoto,
    attributionToBottom = true,
    attributionPaddingY = "24px",
    onClick,
}: Props) {
    const gradationBackground = attributionToBottom
        ? "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.30) 30%, rgba(0, 0, 0, 0.50) 100%)"
        : "linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.30) 30%, rgba(0, 0, 0, 0.50) 100%)";

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
                alt={alt}
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
                    top={attributionToBottom ? "auto" : 0}
                    bottom={attributionToBottom ? 0 : "auto"}
                    left={0}
                    right={0}
                    pt={attributionToBottom ? "32px" : attributionPaddingY}
                    pb={attributionToBottom ? attributionPaddingY : "32px"}
                    px="24px"
                    background={gradationBackground}
                >
                    {/*背景色を出さないように指定するときは、画像の上に別で文字を配置するために背景色を指定しているとき*/}
                    {/*その場合は、Googleのロゴがそれに隠れないようにｚIndexを指定する*/}
                    <Image src={Asset.image.googleOnNonWhite} />
                </Box>
            )}
        </Box>
    );
}
