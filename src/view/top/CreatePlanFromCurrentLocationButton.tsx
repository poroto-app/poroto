import { Icon, Text } from "@chakra-ui/react";
import { MdOutlinePlace } from "react-icons/md";
import React from "react";
import styled from "styled-components";

type Props = {
    onClick: () => void;
};
export const CreatePlanFromCurrentLocationButton = ({ onClick }: Props) => {
    return (
        <Button onClick={onClick}>
            <Icon w="32px" h="32px" as={MdOutlinePlace} />
            <Text>現在地からプランを作成</Text>
        </Button>
    );
};

const Button = styled.div`
    background-color: #539565;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    display: flex;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    column-gap: 8px;
    padding: 4px 8px;
    width: 100%;
    transition: 0.2s ease-in;
`;
