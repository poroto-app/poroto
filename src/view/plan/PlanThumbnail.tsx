import {
    getDefaultPlaceImage,
    Image,
    ImageSize,
    ImageSizes,
} from "src/domain/models/Image";
import { ImageSliderPreview } from "src/view/common/ImageSliderPreview";
import { XStack } from "tamagui";

type Props = {
    images: Image[];
    imageSize?: ImageSize;
    h?: number;
    link?: string;
    draggable?: boolean;
};

export const PlanThumbnail = ({
    images,
    imageSize = ImageSizes.Small,
    h = 300,
    link,
    draggable,
}: Props) => {
    if (images.length === 0) {
        images.push(getDefaultPlaceImage());
    }

    return (
        <XStack w="100%" h={h}>
            <ImageSliderPreview
                images={images}
                imageSize={imageSize}
                borderRadius={10}
                href={link}
                draggable={draggable}
            />
        </XStack>
    );
};
