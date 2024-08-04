import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { Link } from "solito/link";
import { ImageSizes, getImageSizeOf } from "src/domain/models/Image";
import { ImageSliderPreviewProps } from "src/types/props";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { XStack } from "tamagui";

export function ImageSliderPreview({
    images,
    imageSize = ImageSizes.Large,
    href,
    borderRadius,
    onClickImage,
}: ImageSliderPreviewProps) {
    return (
        <XStack
            borderRadius={borderRadius}
            width="100%"
            height="100%"
            overflow="hidden"
            cursor="pointer"
        >
            <LinkWrapper href={href}>
                <PagerView useNext initialPage={0} style={styles.pageView}>
                    {images.map((image, i) => (
                        <XStack key={i} width="100%" height="100%">
                            <ImageWithSkeleton
                                key={i}
                                src={getImageSizeOf(imageSize, image)}
                                isGoogleImage={image.isGoogleImage}
                                onClick={
                                    onClickImage && (() => onClickImage(image))
                                }
                            />
                        </XStack>
                    ))}
                </PagerView>
            </LinkWrapper>
        </XStack>
    );
}

const styles = StyleSheet.create({
    pageView: {
        width: "100%",
        height: "100%",
    },
});

function LinkWrapper({
    href,
    children,
}: {
    href?: string;
    children?: ReactNode;
}) {
    if (href)
        return (
            <Link
                href={href}
                viewProps={{ style: { width: "100%", height: "100%" } }}
            >
                {children}
            </Link>
        );
    return <>{children}</>;
}
