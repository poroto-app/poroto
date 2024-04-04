import { Box } from "@chakra-ui/react";
import "@splidejs/splide/css";
import {
    getDefaultPlaceImage,
    Image,
    ImageSize,
    ImageSizes,
} from "src/domain/models/Image";
import { ImageSliderPreview } from "src/view/common/ImageSliderPreview";

type Props = {
    images: Image[];
    imageSize?: ImageSize;
    h?: string | number;
    link?: string;
    draggable?: boolean;
};

export const PlanThumbnail = (
    {
        images,
        imageSize = ImageSizes.Small,
        h = "300px",
        link,
        draggable,
    }: Props
) => {
    if (images.length === 0) {
        images.push(getDefaultPlaceImage());
    }

    return (
        <Box w="100%" h={h}>
            <ImageSliderPreview
                images={images}
                imageSize={imageSize}
                borderRadius="10px"
                href={link}
                draggable={draggable}
            />
        </Box>
    );
};
