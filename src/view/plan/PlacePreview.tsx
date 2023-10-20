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
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useState } from "react";
import { GooglePlaceReview } from "src/domain/models/GooglePlaceReview";
import {
    getImageSizeOf,
    Image as ImageType,
    ImageSizes,
} from "src/domain/models/Image";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";
import { PlaceReview } from "src/view/plan/PlaceReview";
import styled from "styled-components";

type Props = {
    name: string;
    images: ImageType[];
    googlePlaceReviews?: GooglePlaceReview[];
    categories: PlaceCategory[];
    showRelatedPlaces?: boolean;
    onClickShowRelatedPlaces?: () => void;
};

export const PlacePreview = ({
    name,
    images,
    googlePlaceReviews,
    categories,
    onClickShowRelatedPlaces,
}: Props) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const openModal = (image: ImageType) => {
        setSelectedImage(getImageSizeOf(ImageSizes.Large, image));
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <Container
            hasImages={images.length > 0}
            backgroundColor="#fbf2e7"
            borderRadius="20px"
            w="100%"
            overflow="hidden"
        >
            <ImagePreviewContainer hasImage={images.length > 0}>
                {images.length > 0 && (
                    <PlaceImagesPreview
                        images={images}
                        onClickImage={openModal}
                    />
                )}
            </ImagePreviewContainer>
            <VStack flex={1} alignItems="flex-start" w="100%" p="16px">
                <HStack>
                    <PlaceIcon
                        category={categories.length > 0 ? categories[0] : null}
                    />
                    <Text
                        fontSize="1.15rem"
                        as="h2"
                        fontWeight="bold"
                        color="#222222"
                    >
                        {name}
                    </Text>
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    // pcレイアウトの場合は横並びにする
    @media screen and (min-width: 700px) {
        flex-direction: row-reverse;
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

function PlaceImagesPreview({
    images,
    onClickImage,
}: {
    images: ImageType[];
    onClickImage: (image: ImageType) => void;
}) {
    return (
        <SlideContainer
            options={{
                drag: images.length > 1,
                arrows: images.length > 1,
                lazyLoad: "nearby",
            }}
        >
            {images.map((image, i) => (
                <SlideItem key={i}>
                    <ImageWithSkeleton
                        key={i}
                        src={getImageSizeOf(ImageSizes.Large, image)}
                        onClick={() => onClickImage(image)}
                    />
                </SlideItem>
            ))}
        </SlideContainer>
    );
}

const SlideContainer = styled(Splide)`
    width: 100%;
    height: 100%;
    cursor: pointer;

    & > .splide__track {
        height: 100%;
    }

    & > .splide__arrows {
        opacity: 0;

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

        border-radius: 10px;
        overflow: hidden;
    }
`;

const SlideItem = styled(SplideSlide)`
    width: 100%;
    height: 100%;
`;
