import { ImageLoaderProps } from "next/image";

export const appImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    const baseUrl = `${process.env.IMAGE_OPTIMIZATION_API_PROTOCOL}://${process.env.IMAGE_OPTIMIZATION_API_HOST}`;

    // なるべくキャッシュが利用されるように、100px単位で丸める
    const normalizedWidth = width < 100 ? 100 : Math.round(width / 100) * 100;

    const params = new URLSearchParams({
        url: src,
        width: normalizedWidth.toString(),
    });

    if (quality) {
        params.append("quality", quality.toString());
    }

    return `${baseUrl}/image?${params.toString()}`;
};
