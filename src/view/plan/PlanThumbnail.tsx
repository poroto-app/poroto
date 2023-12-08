import { Link } from "@chakra-ui/next-js";
import { Box } from "@chakra-ui/react";
import "@splidejs/splide/css";
import { ReactNode } from "react";
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
            <LinkWrapper href={link}>
                <ImageSliderPreview
                    images={images}
                    imageSize={imageSize}
                    borderRadius="10px"
                />
            </LinkWrapper>
        </Box>
    );
};

function LinkWrapper({
    href,
    children,
}: {
    href?: string;
    children?: ReactNode;
}) {
    if (href)
        return (
            <Link href={href} w="100%" h="100%">
                {children}
            </Link>
        );
    return <>{children}</>;
}
