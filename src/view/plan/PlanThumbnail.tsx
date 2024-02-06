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
    link?: string;
};

export const PlanThumbnail = ({
    images,
    imageSize = ImageSizes.Small,
    link,
}: Props) => {
    if (images.length === 0) {
        images.push(getDefaultPlaceImage());
    }

    return (
        <Box w="100%" h="300px">
            <ImageSliderPreview
                images={images}
                imageSize={imageSize}
                borderRadius="10px"
                href={link}
            />
        </Box>
    );
};
