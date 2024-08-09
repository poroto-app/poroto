import { useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import { Time } from "src/constant/time";
import { ImageSizes, getImageSizeOf } from "src/domain/models/Image";
import { StoryImagePreviewProps } from "src/types/props";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { StoryImagePreviewTapPagerOverlay } from "src/view/plancandidate/StoryImagePreviewTapPagerOverlay";
import { XStack } from "tamagui";

export function StoryImagePreview({
    images,
    imageSize = ImageSizes.Large,
    tapControl = true,
    slideable = true,
    onActiveIndexChange,
    onClickFirstItem,
    onClickLastItem,
}: StoryImagePreviewProps) {
    const pagerViewRef = useRef<PagerView>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const handleOnPageSelected = (e: { position: number }) => {
        onActiveIndexChange?.(e.position);
        setCurrentPage(e.position);
    };

    const onClickNext = () => {
        if (!pagerViewRef.current || !slideable) return;

        const isLastPage = currentPage === images.length - 1;
        if (isLastPage && onClickLastItem) {
            onClickLastItem();
            setTimeout(() => {
                pagerViewRef.current.setPage(0);
            }, Time.PlanCandidateGallery.lastItemTransitionDelay);
        } else {
            pagerViewRef.current.setPage(currentPage + 1);
        }
    };

    const onClickPrev = () => {
        if (!pagerViewRef.current || !slideable) return;

        const isFirstPage = currentPage === 0;
        if (isFirstPage && onClickFirstItem) {
            onClickFirstItem();
        } else {
            pagerViewRef.current.setPage(currentPage - 1);
        }
    };

    return (
        <XStack w="100%" h="100%" position="relative" overflow="hidden">
            <PagerView
                ref={pagerViewRef}
                useNext
                initialPage={currentPage}
                onPageSelected={(e) =>
                    handleOnPageSelected({ position: e.nativeEvent.position })
                }
                style={{ flex: 1 }}
            >
                {images.map((image, i) => (
                    <ImageWithSkeleton
                        key={i}
                        isGoogleImage={image.isGoogleImage}
                        attributionToBottom={false}
                        attributionPaddingY="48px"
                        src={getImageSizeOf(imageSize, image)}
                    />
                ))}
            </PagerView>
            {tapControl && (
                <StoryImagePreviewTapPagerOverlay
                    onClickNext={onClickNext}
                    onClickPrev={onClickPrev}
                />
            )}
        </XStack>
    );
}
