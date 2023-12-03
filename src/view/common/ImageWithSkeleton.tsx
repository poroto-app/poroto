import { Box, Image, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { Asset } from "src/view/constants/asset";
import { zIndex } from "src/view/constants/zIndex";

type Props = {
    src: string;
    isGoogleImage?: boolean;
    attributionToLeft?: boolean;
    attributionShadowBackground?: boolean;
    attributionPaddingY?: string;
    onClick?: () => void;
};

export function ImageWithSkeleton({
    src,
    isGoogleImage: isGooglePhoto,
    attributionToLeft = true,
    attributionShadowBackground = true,
    attributionPaddingY = "32px",
    onClick,
}: Props) {
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
                    justifyContent={
                        attributionToLeft ? "flex-start" : "flex-end"
                    }
                    bottom={0}
                    left={0}
                    right={0}
                    py={attributionPaddingY}
                    px="24px"
                    background={
                        attributionShadowBackground &&
                        "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.30) 30%, rgba(0, 0, 0, 0.50) 100%)"
                    }
                >
                    {/*背景色を出さないように指定するときは、画像の上に別で文字を配置するために背景色を指定しているとき*/}
                    {/*その場合は、Googleのロゴがそれに隠れないようにｚIndexを指定する*/}
                    <Image
                        zIndex={
                            !attributionShadowBackground &&
                            zIndex.googleAttribution
                        }
                        src={Asset.image.googleOnNonWhite}
                    />
                </Box>
            )}
        </Box>
    );
}
