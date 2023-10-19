import { Box, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { MdCheck, MdClose } from "react-icons/md";
import { LocationCategory } from "src/domain/models/LocationCategory";
import { SelectButton } from "src/view/interest/SelectButton";
import styled from "styled-components";

type Props = {
    category: LocationCategory;
    onClickYes: (category: LocationCategory) => void;
    onClickNo: (category: LocationCategory) => void;
};
export const CategorySelect = ({ category, onClickYes, onClickNo }: Props) => {
    return (
        <VStack h="100%" w="100%" spacing={6}>
            <ThumbnailCard>
                <Box
                    w="100%"
                    h="100%"
                    flex={1}
                    position="relative"
                    overflow="hidden"
                >
                    {category.thumbnail ? (
                        <Thumbnail src={category.thumbnail} />
                    ) : (
                        <DefaultThumbnail
                            imageUrl={category.defaultThumbnailUrl}
                        />
                    )}
                </Box>
                <Text fontSize="1.25rem" py={4}>
                    {category.displayName}
                </Text>
            </ThumbnailCard>
            <HStack w="100%">
                <SelectButton
                    color="#E96479"
                    onClick={() => onClickNo(category)}
                    icon={MdClose}
                />
                <SelectButton
                    color="#7DB9B6"
                    onClick={() => onClickYes(category)}
                    icon={MdCheck}
                />
            </HStack>
        </VStack>
    );
};

const ThumbnailCard = styled.div`
    border: 1.5px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 0 60px 20px rgba(187, 160, 166, 0.1);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    overflow: hidden;
    width: 100%;
    height: 100%;
    max-height: 100%;
`;

// MEMO: 画像が読み込まれたときに、画像のアスペクト比に応じてコンポーネントの高さが変化してしまうのを防ぐために
// 親要素に対してposition: relativeを指定して、子要素に対してposition: absoluteを指定している
const Thumbnail = styled.img`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
`;

const DefaultThumbnail = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <Center w="100%" h="100%" px="32px" py="32px">
            <Image src={imageUrl} maxW="600px" maxH="400px" h="100%" w="100%" />
        </Center>
    );
};
