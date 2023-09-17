import {
    Box,
    HStack,
    Icon,
    Image,
    Skeleton,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { GooglePlaceReview } from "src/domain/models/GooglePlaceReview";
import { Colors } from "src/view/constants/color";
import { PlaceReview } from "src/view/plan/PlaceReview";
import styled from "styled-components";

type Props = {
    name: string;
    imageUrls: string[];
    tags: string[];
    googlePlaceReviews?: GooglePlaceReview[];
};

export const PlacePreview = ({
    name,
    imageUrls,
    tags,
    googlePlaceReviews,
}: Props) => {
    return (
        <VStack alignItems="flex-start" w="100%">
            {imageUrls.length > 0 && (
                <ImagePreviewer>
                    <HStack h="100%">
                        {imageUrls.map((imageUrl, i) => (
                            <ImageWithSkeleton key={i} src={imageUrl} />
                        ))}
                    </HStack>
                </ImagePreviewer>
            )}
            <HStack>
                <Icon
                    w="24px"
                    h="24px"
                    color={Colors.primary["600"]}
                    as={MdOutlineLocationOn}
                />
                <Text fontSize="1.15rem">{name}</Text>
            </HStack>
            {tags.length > 0 && <TagList tags={tags} />}
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
    );
};

function TagList({ tags }: { tags: string[] }) {
    return (
        <HStack>
            {tags.map((tag, i) => (
                <Box
                    key={i}
                    border="1px solid rgba(0, 0, 0, .1)"
                    borderRadius="5px"
                    px="4px"
                    py="2px"
                >
                    <Text fontSize="0.95rem">{tag}</Text>
                </Box>
            ))}
        </HStack>
    );
}

const ImageWithSkeleton = ({ src }: { src: string }) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <Box
            w="200px"
            h="100%"
            position="relative"
            overflow="hidden"
            borderRadius="5px"
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
