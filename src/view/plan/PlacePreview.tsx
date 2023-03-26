import { Box, HStack, Text, Image } from "@chakra-ui/react"
import styled from "styled-components"

type Props = {
    name: string,
    imageUrls: string[],
    tags: string[]
}

export const PlacePreview = ({ name, imageUrls, tags }: Props) => {
    return <Box>
        <ImagePreviewer>
            {
                imageUrls.map((imageUrl, i) => <Image
                    key={i} src={imageUrl}
                    objectFit="cover" w="100%" h="100%"
                />)
            }
        </ImagePreviewer>
        <Text>{name}</Text>
    </Box>
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