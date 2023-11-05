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
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";
import { PlaceInfoTab } from "src/view/plandetail/PlaceInfoTab";
import styled from "styled-components";

type Props = {
    name: string;
    images: ImageType[];
    googlePlaceReviews?: GooglePlaceReview[];
    categories: PlaceCategory[];
    priceRange: PriceRange | null;
    showRelatedPlaces?: boolean;
    onClickShowRelatedPlaces?: () => void;
};

export const PlacePreview = ({
    name,
    images,
    googlePlaceReviews,
    categories,
    priceRange,
    onClickShowRelatedPlaces,
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
        <Container>
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
                p="16px"
                overflow="hidden"
            >
                <Text
                    fontSize="1.15rem"
                    as="h2"
                    fontWeight="bold"
                    color="#222222"
                >
                    {name}
                </Text>
                <PlaceInfoTab
                    categories={categories}
                    googlePlaceReviews={googlePlaceReviews}
                    priceRange={priceRange}
                />
                <VStack w="100%" mt="auto">
                    {onClickShowRelatedPlaces && (
                        <Box
                            color="#AB7129"
                            as="button"
                            fontWeight="bold"
                            fontSize="16px"
                            onClick={onClickShowRelatedPlaces}
                        >
                            関連した場所を表示
                        </Box>
                    )}
                </VStack>
            </VStack>
            {/* 画像を拡大表示するためのモーダル */}
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
    background-color: #fbf2e7;
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