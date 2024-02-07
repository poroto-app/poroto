import {
    Box,
    HStack,
    Icon,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    useMediaQuery,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { GooglePlaceReview } from "src/domain/models/GooglePlaceReview";
import {
    getImageSizeOf,
    Image as ImageType,
    ImageSizes,
} from "src/domain/models/Image";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { PriceRange } from "src/domain/models/PriceRange";
import { ImageSliderPreview } from "src/view/common/ImageSliderPreview";
import { Size } from "src/view/constants/size";
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";
import {
    PlaceChipActionCamera,
    PlaceChipActionDelete,
    PlaceChipActionGoogleMaps,
    PlaceChipActionInstagram,
    PlaceChipActionShowRelatedPlaces,
} from "src/view/plandetail/PlaceChipContextAction";
import { PlaceInfoTab } from "src/view/plandetail/PlaceInfoTab";
import { PlaceLikeButton } from "src/view/plandetail/PlaceLikeButton";
import styled from "styled-components";

type Props = {
    placeId: string;
    googlePlaceId: string;
    name: string;
    images: ImageType[];
    googlePlaceReviews?: GooglePlaceReview[];
    categories: PlaceCategory[];
    priceRange: PriceRange | null;
    like: boolean;
    likeCount: number;
    estimatedStayDuration: number;
    showRelatedPlaces?: boolean;
    onClickShowRelatedPlaces?: () => void;
    onClickDeletePlace?: () => void;
} & PlaceActionHandler;

export type PlaceActionHandler = {
    onUpdateLikeAtPlace?: (input: { like: boolean; placeId: string }) => void;
};

// TODO: Propsの型を共通して定義できるようにする
export const PlacePreview = ({
    placeId,
    googlePlaceId,
    name,
    images,
    googlePlaceReviews,
    categories,
    priceRange,
    like,
    likeCount,
    estimatedStayDuration,
    onClickShowRelatedPlaces,
    onClickDeletePlace,
    onUpdateLikeAtPlace,
}: Props) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
    const isEmptyLocation =
        images.length === 0 &&
        googlePlaceReviews.length == 0 &&
        categories.length === 0 &&
        !priceRange;

    const openModal = (image: ImageType) => {
        setSelectedImage(getImageSizeOf(ImageSizes.Large, image));
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const handleDoubleClick = () => {
        onUpdateLikeAtPlace?.({ like: !like, placeId });
    };

    if (isEmptyLocation) {
        return (
            <Container p="16px" w="100%">
                <HStack>
                    <Text
                        fontSize="1.15rem"
                        as="h2"
                        fontWeight="bold"
                        color="#222222"
                    >
                        {name}
                    </Text>
                </HStack>
            </Container>
        );
    }

    return (
        <Container onDoubleClick={handleDoubleClick}>
            <ImagePreviewContainer hasImage={images.length > 0}>
                {images.length > 0 && (
                    <ImageSliderPreview
                        images={images}
                        onClickImage={openModal}
                        borderRadius={isLargerThan700 ? 20 : 0}
                    />
                )}
            </ImagePreviewContainer>
            <VStack
                flex={1}
                alignItems="flex-start"
                w="100%"
                py="16px"
                overflow="hidden"
            >
                <HStack w="100%" px={Size.PlaceCardPaddingH}>
                    <Text
                        fontSize="1.15rem"
                        as="h2"
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
                </HStack>
                <PlaceInfoTab
                    tabHSpaacing={Size.PlaceCardPaddingH}
                    categories={categories}
                    googlePlaceReviews={googlePlaceReviews}
                    priceRange={priceRange}
                    estimatedStayDuration={estimatedStayDuration}
                />
                <HStack
                    w="100%"
                    px={Size.PlaceCardPaddingH}
                    flexWrap={isLargerThan700 ? "wrap" : "nowrap"}
                    overflowX="auto"
                    spacing="4px"
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
                    <PlaceChipActionCamera onClick={() => 0} />
                </HStack>
            </VStack>
            <Modal isOpen={!!selectedImage} onClose={closeModal} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody py="48px" px="16px">
                        {selectedImage && (
                            <Image
                                src={selectedImage}
                                objectFit="contain"
                                w="100%"
                                maxH="80vh"
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    );
};

const Container = styled(Box)`
    border-radius: 20px;
    width: 100%;
    overflow: hidden;
    background-color: white;
    box-shadow: 0px 0px 20px 0px #f0dfca;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    // pcレイアウトの場合は横並びにする
    @media screen and (min-width: 700px) {
        flex-direction: row;
        align-items: stretch;
    }
`;

export const PlaceIcon = ({ category }: { category: PlaceCategory | null }) => {
    return <Icon w="24px" h="24px" as={getPlaceCategoryIcon(category)} />;
};

const ImagePreviewContainer = styled.div<{ hasImage: boolean }>`
    width: 100%;
    height: ${({ hasImage }) => (hasImage ? "200px" : "0")};

    @media screen and (min-width: 700px) {
        align-self: center;
        flex: 0.75;
        width: 350px;
        height: ${({ hasImage }) => (hasImage ? "250px" : "0")};
        padding: 16px;
    }
`;
