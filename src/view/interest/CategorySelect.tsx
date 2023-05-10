import { LocationCategory } from "src/domain/models/LocationCategory";
import styled from "styled-components";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { MdCheck, MdClose } from "react-icons/md";
import React from "react";
import { SelectButton } from "src/view/interest/SelectButton";

type Props = {
    category: LocationCategory;
    onClickYes: (category: LocationCategory) => void;
    onClickNo: (category: LocationCategory) => void;
};
export const CategorySelect = ({ category, onClickYes, onClickNo }: Props) => {
    return (
        <VStack h="100%" w="100%" spacing={6}>
            <ThumbnailCard>
                <Thumbnail src={category.thumbnail} />
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
`;

const Thumbnail = styled.img`
    width: 100%;
    object-fit: cover;
    flex: 1;
    overflow: hidden;
`;
