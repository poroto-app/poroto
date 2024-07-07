import { ImageLoaderProps } from "next/image";

export const appImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    const baseUrl = `${process.env.IMAGE_OPTIMIZATION_API_PROTOCOL}://${process.env.IMAGE_OPTIMIZATION_API_HOST}`;
    const params = new URLSearchParams({
        url: src,
        width: width.toString(),
    });

    if (quality) {
        params.append("quality", quality.toString());
    }

    return `${baseUrl}/image?${params.toString()}`;
};
