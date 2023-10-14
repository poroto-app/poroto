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
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const openModal = (image: ImageType) => {
        setSelectedImage(getImageSizeOf(ImageSizes.Large, image));
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <Container>
            <ImagePreviewContainer hasImage={images.length > 0}>
                {images.length > 0 && (
                    <PlaceImagesPreview
                        images={images}
                        onClickImage={openModal}
                    />
                )}
            </ImagePreviewContainer>
            <VStack flex={1} alignItems="flex-start">
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

const Container = styled.div`
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 16px;
    gap: 16px;
    background-color: #fbf2e7;

    // pcレイアウトの場合は横並びにする
    @media screen and (min-width: 700px) {
        flex-direction: row-reverse;
    }
`;

export const PlaceIcon = ({ category }: { category: PlaceCategory | null }) => {
    return <Icon w="24px" h="24px" as={getPlaceCategoryIcon(category)} />;
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

const ImagePreviewContainer = styled.div<{ hasImage: boolean }>`
    width: 100%;
    height: ${({ hasImage }) => (hasImage ? "200px" : "0")};
    @media screen and (min-width: 700px) {
        align-self: center;
        flex: 0.75;
        width: 350px;
        height: 250px;
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
    border-radius: 10px;
    cursor: pointer;

    & > .splide__track {
        height: 100%;
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
