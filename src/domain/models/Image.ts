export type Image = {
    default: string;
    isGoogleImage: boolean;
    small: string | null;
    large: string | null;
};

export const ImageSizes = {
    Default: "Default",
    Small: "Small",
    Large: "Large",
};
export type ImageSize = (typeof ImageSizes)[keyof typeof ImageSizes];

export function getImageSizeOf(size: ImageSize, image: Image): string {
    switch (size) {
        case ImageSizes.Default:
            return image.default;
        case ImageSizes.Small:
            return image.small ?? image.default;
        case ImageSizes.Large:
            return image.large ?? image.default;
        default:
            return image.default;
    }
}

export const getDefaultPlaceImage = (): Image => {
    return {
        isGoogleImage: false,
        default: "/images/NotFound.jpg",
        small: "/images/NotFound.jpg",
        large: "/images/NotFound.jpg",
    };
};
