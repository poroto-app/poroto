import {LocationCategory} from "src/domain/models/LocationCategory";
import styled from "styled-components";
import {HStack, Text, VStack} from "@chakra-ui/react";

type Props = {
    category: LocationCategory,
    onClickYes: (category: LocationCategory) => void,
    onClickNo: (category: LocationCategory) => void,
}
export const CategorySelect = ({category, onClickYes, onClickNo}: Props) => {
    return <VStack h="100%" w="100%">
        <ThumbnailCard>
            <Thumbnail src={category.thumbnail}/>
            <Text py={4}>{category.name}</Text>
        </ThumbnailCard>
        <HStack>
            <button onClick={() => onClickYes(category)}>Yes</button>
            <button onClick={() => onClickNo(category)}>No</button>
        </HStack>
    </VStack>
}

const ThumbnailCard = styled.div`
  border: 1px solid rgba(0, 0, 0, .1);
  border-radius: 15px;
  display: flex;
  box-shadow: 20px 20px 60px #d9d9d9,
    -20px -20px 60px #ffffff;
  flex-direction: column;
  align-items: center;
  flex: 1;
  overflow: hidden;
  width: 100%;
`;

const Thumbnail = styled.img`
  width: 100%;
  object-fit: cover;
  flex: 1;
`;