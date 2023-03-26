import { Box, HStack, Text, Image, VStack } from "@chakra-ui/react"
import styled from "styled-components"

type Props = {
    name: string,
    imageUrls: string[],
    tags: string[]
}

export const PlacePreview = ({ name, imageUrls, tags }: Props) => {
    return <VStack alignItems="flex-start">
        <ImagePreviewer>
            {
                imageUrls.map((imageUrl, i) => <Image
                    key={i} src={imageUrl}
                    objectFit="cover" w="100%" h="100%"
                />)
            }
        </ImagePreviewer>
        <Text>{name}</Text>
        <HStack>
            {
                tags.map((tag, i) => <Box
                    key={i}
                    border="1px solid rgba(0, 0, 0, .1)" borderRadius="5px"
                    px="4px" py="2px"
                >
                    <Text>{tag}</Text>
                </Box>)
            }
        </HStack>
    </VStack>
}

const ImagePreviewer = styled.div`
    display: flex;
    column-gap: 4px;

    width: 100%;
    height: 200px;
    overflow-x: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;