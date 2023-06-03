import { Box, HStack, Image, Skeleton, Text, VStack } from "@chakra-ui/react";
import styled from "styled-components";
import { useState } from "react";

type Props = {
    name: string;
    imageUrls: string[];
    tags: string[];
};

export const PlacePreview = ({ name, imageUrls, tags }: Props) => {
    return (
        <VStack alignItems="flex-start" w="100%">
            <ImagePreviewer>
                {imageUrls.map((imageUrl, i) => (
                    <ImageWithSkeleton key={i} src={imageUrl} />
                ))}
            </ImagePreviewer>
            <Text fontSize="1.15rem">{name}</Text>
            <TagList tags={tags} />
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
        <>
            {isLoading && (
                <Box>
                    <Skeleton w="200px" h="100%" flex={1} />
                </Box>
            )}
            <Image
                src={src}
                objectFit="cover"
                w={isLoading ? 0 : "100%"}
                h="100%"
                scrollSnapAlign="start"
                onLoad={() => setIsLoading(false)}
            />
        </>
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
