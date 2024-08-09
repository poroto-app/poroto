import { ImageWithSVGProps } from "src/types/props";
import { Image } from "tamagui";

export function ImageWithSVG({
    src,
    w,
    h,
    maxWidth,
    maxHeight,
    alt,
    objectFit,
}: ImageWithSVGProps) {
    return (
        <Image
            src={src}
            w={w}
            h={h}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            alt={alt}
            objectFit={objectFit}
            resizeMode={objectFit}
        />
    );
}
