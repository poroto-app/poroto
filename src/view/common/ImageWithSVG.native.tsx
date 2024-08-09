import { Image } from "expo-image";
import { ImageWithSVGProps } from "src/types/props";

/**
 * SVGを含む画像を表示するためのコンポーネント
 * （NativeだとSVG画像を通常のImageコンポーネントで表示することができない）
 * **/
export function ImageWithSVG({
    src,
    w,
    h,
    maxWidth,
    maxHeight,
    objectFit,
}: ImageWithSVGProps) {
    return (
        <Image
            source={src}
            style={{
                width: w,
                height: h,
                maxWidth: maxWidth,
                maxHeight: maxHeight,
                objectFit: objectFit,
            }}
        />
    );
}
