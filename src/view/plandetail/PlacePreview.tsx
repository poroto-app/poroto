import { ReactNode, useState } from "react";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import {
    getImageSizeOf,
    ImageSizes,
    Image as ImageType,
} from "src/domain/models/Image";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { PriceRange } from "src/domain/models/PriceRange";
import { hasValue } from "src/domain/util/null";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { ImageSliderPreview } from "src/view/common/ImageSliderPreview";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { RoundedButton } from "src/view/common/RoundedButton";
import {
    PlaceChipActionCamera,
    PlaceChipActionCameraProps,
    PlaceChipActionDelete,
    PlaceChipActionGoogleMaps,
    PlaceChipActionInstagram,
    PlaceChipActionShowRelatedPlaces,
} from "src/view/plandetail/PlaceChipContextAction";
import { PlaceInfoTab } from "src/view/plandetail/PlaceInfoTab";
import { PlaceLikeButton } from "src/view/plandetail/PlaceLikeButton";
import { Dialog, Text, XStack, YStack } from "tamagui";

type Props = {
    placeId: string;
    googlePlaceId: string;
    name: string;
    images: ImageType[];
    categories: PlaceCategory[];
    priceRange: PriceRange | null;
    like: boolean;
    likeCount: number;
    estimatedStayDuration: number;
    showRelatedPlaces?: boolean;
    onClickShowRelatedPlaces?: () => void;
    onClickDeletePlace?: () => void;
    uploadPlaceImage?: PlaceChipActionCameraProps;
} & PlaceActionHandler;

export type PlaceActionHandler = {
    onUpdateLikeAtPlace?: (input: { like: boolean; placeId: string }) => void;
};

// TODO: 削除や追加のパラメータをCallback関数単体ではなく、PlaceChipActionXXXPropsのようなまとまりで受け取る
export const PlacePreview = ({
    placeId,
    googlePlaceId,
    name,
    images,
    categories,
    priceRange,
    like,
    likeCount,
    estimatedStayDuration,
    uploadPlaceImage,
    onClickShowRelatedPlaces,
    onClickDeletePlace,
    onUpdateLikeAtPlace,
}: Props) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { gtSm } = useMediaQuery();
    const isEmptyLocation =
        images.length === 0 && categories.length === 0 && !priceRange;

    const openModal = (image: ImageType) => {
        setSelectedImage(getImageSizeOf(ImageSizes.Large, image));
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    // TODO: ダブルタップでいいねできるようにする
    const handleDoubleClick = () => {
        onUpdateLikeAtPlace?.({ like: !like, placeId });
    };

    if (isEmptyLocation) {
        return (
            <Container p={Padding.p16} w="100%">
                <XStack>
                    <Text
                        fontSize={18}
                        tag="h2"
                        fontWeight="bold"
                        color="#222222"
                    >
                        {name}
                    </Text>
                </XStack>
            </Container>
        );
    }

    return (
        <Container>
            <ImagePreviewContainer hasImage={images.length > 0}>
                {images.length > 0 && (
                    <ImageSliderPreview
                        images={images}
                        onClickImage={openModal}
                        borderRadius={gtSm ? 20 : 0}
                    />
                )}
            </ImagePreviewContainer>
            <YStack
                flex={1}
                alignItems="flex-start"
                w="100%"
                py={Padding.p16}
                overflow="hidden"
            >
                <XStack w="100%" px={Size.PlaceCard.px}>
                    <Text
                        fontSize={18}
                        tag="h2"
                        fontWeight="bold"
                        color="#222222"
                        flex={1}
                    >
                        {name}
                    </Text>
                    {onUpdateLikeAtPlace && (
                        <PlaceLikeButton
                            isLiked={like}
                            likeCount={likeCount}
                            onUpdateLike={(like) =>
                                onUpdateLikeAtPlace({ like, placeId })
                            }
                        />
                    )}
                </XStack>
                <PlaceInfoTab
                    tabHSpacing={Size.PlaceCard.px}
                    categories={categories}
                    priceRange={priceRange}
                    estimatedStayDuration={estimatedStayDuration}
                />
                <XStack
                    w="100%"
                    px={Size.PlaceCard.px}
                    flexWrap={gtSm ? "wrap" : "nowrap"}
                    gap={Padding.p4}
                >
                    {onClickShowRelatedPlaces && (
                        <PlaceChipActionShowRelatedPlaces
                            onClick={onClickShowRelatedPlaces}
                        />
                    )}
                    <PlaceChipActionInstagram placeName={name} />
                    <PlaceChipActionGoogleMaps
                        placeName={name}
                        googlePlaceId={googlePlaceId}
                    />
                    {onClickDeletePlace && (
                        <PlaceChipActionDelete onClick={onClickDeletePlace} />
                    )}
                    {uploadPlaceImage && uploadPlaceImage.canUpload && (
                        <PlaceChipActionCamera {...uploadPlaceImage} />
                    )}
                </XStack>
            </YStack>
            <ImagePreviewDialog imageUrl={selectedImage} onClose={closeModal} />
        </Container>
    );
};

function Container({
    p,
    w = "100%",
    children,
}: {
    p?: number;
    w?: "100%" | number;
    children?: ReactNode;
}) {
    return (
        <YStack
            p={p}
            borderRadius={20}
            width={w}
            overflow="hidden"
            backgroundColor="white"
            shadowColor="#f0dfca"
            shadowOffset={{ width: 0, height: 0 }}
            shadowRadius={20}
            shadowOpacity={1}
            alignItems="flex-start"
            $gtSm={{
                flexDirection: "row",
                alignItems: "stretch",
            }}
        >
            {children}
        </YStack>
    );
}

function ImagePreviewContainer({
    hasImage,
    children,
}: {
    hasImage: boolean;
    children?: ReactNode;
}) {
    return (
        <YStack
            width="100%"
            height={hasImage ? 200 : "0"}
            $gtSm={{
                alignSelf: "center",
                flex: 0.75,
                minWidth: 400,
                height: hasImage ? 250 : 0,
                padding: Padding.p16,
            }}
        >
            {children}
        </YStack>
    );
}

// TODO: 複数の画像をプレビューできるようにする
function ImagePreviewDialog({
    imageUrl,
    onClose,
}: {
    imageUrl: string | null;
    onClose: () => void;
}) {
    const { t } = useAppTranslation();
    return (
        <Dialog
            open={hasValue(imageUrl)}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <Dialog.Portal
                paddingHorizontal={Padding.p16}
                paddingVertical={Padding.p16}
            >
                <Dialog.Overlay
                    animation="slow"
                    opacity={0.9}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />
                <Dialog.Content
                    width="100%"
                    height={600}
                    maxWidth={600}
                    maxHeight="100%"
                    animation={[
                        "fast",
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                    enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                    gap={Padding.p16}
                >
                    <ImageWithSkeleton src={imageUrl} objectFit="contain" />
                    <RoundedButton
                        label={t("common:close")}
                        onClick={onClose}
                    />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
}
