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
    Skeleton,
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const openModal = (imageSrc: string) => {
        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };

    return (
        <VStack alignItems="flex-start" w="100%">
            {images.length > 0 && (
                <ImagePreviewer>
                    <HStack h="100%">
                        {images.map((image, i) => (
                            <ImageWithSkeleton
                                key={i}
                                src={getImageSizeOf(ImageSizes.Small, image)}
                                onClick={() =>
                                    openModal(
                                        getImageSizeOf(ImageSizes.Large, image)
                                    )
                                }
                            />
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
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
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

const ImageWithSkeleton = ({
    src,
    onClick,
}: {
    src: string;
    onClick?: () => void;
}) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <Box
            w="200px"
            h="100%"
            position="relative"
            overflow="hidden"
            borderRadius="5px"
            onClick={onClick}
            style={{ cursor: "pointer" }}
        >
            <Skeleton
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                left={0}
                transition="opacity .3s"
                opacity={isLoading ? 1 : 0}
            />
            <Image
                src={src}
                objectFit="cover"
                w={isLoading ? "0" : "100%"}
                h="100%"
                onLoad={() => setIsLoading(false)}
                scrollSnapAlign="start"
            />
        </Box>
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
