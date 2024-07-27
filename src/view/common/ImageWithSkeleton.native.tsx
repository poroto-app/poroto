import { ImageWithSkeletonProps } from "src/types/props";
import { Image } from "tamagui";

export function ImageWithSkeleton({
    src,
    alt,
    w = "100%",
    h = "100%",
    isGoogleImage: isGooglePhoto,
    attributionToBottom = true,
    attributionPaddingY = "24px",
    onClick,
}: ImageWithSkeletonProps) {
    //  TODO: Skeleton表示に対応
    //  TODO: GoogleのAttributionを表示
    return (
        <Image
            src={src}
            alt={alt}
            objectFit="cover"
            w={w}
            h={h}
            onPress={onClick}
        />
    );
}
