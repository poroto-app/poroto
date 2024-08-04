import { ImageWithSkeletonProps } from "src/types/props";
import {Image, View} from "tamagui";

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
        <View
            w={w}
            h={h}
            overflow="hidden"
            onPress={onClick}
        >
            <Image
                src={src}
                alt={alt}
                w="100%"
                h="100%"
                objectFit="cover"
            />
        </View>
    );
}
