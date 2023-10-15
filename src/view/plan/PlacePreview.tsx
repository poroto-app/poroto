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
import { Colors } from "src/view/constants/color";
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";
import { PlaceReview } from "src/view/plan/PlaceReview";
import styled from "styled-components";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";

type Props = {
    name: string;
    images: ImageType[];
    googlePlaceReviews?: GooglePlaceReview[];
    categories: PlaceCategory[];
};

export const PlacePreview = ({
    name,
    images,
    googlePlaceReviews,
    categories,
}: Props) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const openModal = (imageSrc: string) => {
        setSelectedImage(imageSrc);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <VStack alignItems="flex-start" w="100%">
            {images.length > 0 && (
                <ImagePreviewer>
                    <HStack h="100%">
                        {images.map((image, i) => (
                            <Box
                                key={i}
                                w="200px"
                                h="100%"
                                position="relative"
                                overflow="hidden"
                                borderRadius="5px"
                            >
                                <ImageWithSkeleton
                                    src={getImageSizeOf(
                                        ImageSizes.Small,
                                        image
                                    )}
                                    onClick={() =>
                                        openModal(
                                            getImageSizeOf(
                                                ImageSizes.Large,
                                                image
                                            )
                                        )
                                    }
                                />
                            </Box>
                        ))}
                    </HStack>
                </ImagePreviewer>
            )}
            <HStack>
                <PlaceIcon
                    category={categories.length > 0 ? categories[0] : null}
                />
                <Text fontSize="1.15rem">{name}</Text>
            </HStack>
            {/* TODO: すべてのレビューの情報を表示する */}
            {googlePlaceReviews &&
                googlePlaceReviews.length > 0 &&
                googlePlaceReviews[0].text && (
                    <PlaceReview
                        authorName={googlePlaceReviews[0].authorName}
                        authorUrl={googlePlaceReviews[0].authorUrl}
                        text={googlePlaceReviews[0].text}
                    />
                )}

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
        </VStack>
    );
};

export const PlaceIcon = ({ category }: { category: PlaceCategory | null }) => {
    return (
        <Icon
            w="24px"
            h="24px"
            color={Colors.primary["600"]}
            as={getPlaceCategoryIcon(category)}
        />
    );
};

const ImagePreviewer = styled.div`
    display: flex;
    column-gap: 4px;

    width: 100%;
    height: 200px;
    overflow-x: scroll;
    scroll-snap-type: x proximity;

    &::-webkit-scrollbar {
        display: none;
    }
`;
