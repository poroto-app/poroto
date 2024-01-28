import { Link } from "@chakra-ui/next-js";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { ReactNode } from "react";
import {
    getImageSizeOf,
    Image as ImageType,
    ImageSize,
    ImageSizes,
} from "src/domain/models/Image";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import styled from "styled-components";
type Props = {
    images: ImageType[];
    imageSize?: ImageSize;
    href?: string;
    borderRadius?: number | string;
    onClickImage?: (image: ImageType) => void;
};

export function ImageSliderPreview({
    images,
    imageSize = ImageSizes.Large,
    href,
    borderRadius,
    onClickImage,
}: Props) {
    return (
        <SlideContainer
            style={{ borderRadius: borderRadius }}
            options={{
                drag: images.length > 1,
                arrows: images.length > 1,
                lazyLoad: "nearby",
            }}
        >
            {images.map((image, i) => (
                <SlideItem key={i}>
                    <LinkWrapper href={href}>
                        <ImageWithSkeleton
                            key={i}
                            src={getImageSizeOf(imageSize, image)}
                            isGoogleImage={image.isGoogleImage}
                            onClick={() => onClickImage && onClickImage(image)}
                        />
                    </LinkWrapper>
                </SlideItem>
            ))}
        </SlideContainer>
    );
}

const SlideContainer = styled(Splide)`
    width: 100%;
    height: 100%;
    cursor: pointer;
    overflow: hidden;

    & > .splide__track {
        height: 100%;
    }

    & > .splide__arrows {
        opacity: 0;

        // 左右に表示される矢印
        & > .splide__arrow {
            background-color: white;
            box-shadow: 0 0 0 1px transparent, 0 0 0 4px transparent,
                0 2px 4px rgba(0, 0, 0, 0.18);
            z-index: 1;

            &:disabled {
                opacity: 0;
            }

            &:hover {
                opacity: 1;
                z-index: 99;
            }

            > svg {
                width: 12px;
                height: 12px;
            }
        }
    }

    // pcでホバーをしたときだけ矢印を表示する
    @media screen and (min-width: 700px) {
        &:hover {
            & > .splide__arrows {
                opacity: 1;
            }
        }
    }
`;

const SlideItem = styled(SplideSlide)`
    width: 100%;
    height: 100%;
`;

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
