import styled from "styled-components";
import { Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import React from "react";

type Props = {
    color: string;
    text: string;
    imageUrl?: string;
    icon?: IconType;
    onClick?: () => void;
    filled?: boolean;
};

export const PlanActionButton = ({
    color,
    text,
    onClick,
    imageUrl,
    icon,
    filled,
}: Props) => {
    return (
        <BorderButton color={color} filled={filled ?? false} onClick={onClick}>
            {icon && (
                <Icon
                    w="32px"
                    h="32px"
                    color={filled ? "white" : color}
                    as={icon}
                />
            )}
            {imageUrl && <IconImage src={imageUrl} filled={filled} />}
            <Text flex={1}>{text}</Text>
        </BorderButton>
    );
};

const BorderButton = styled.div<{ color: string; filled: boolean }>`
    color: ${({ filled }) => (filled ? "white" : "black")};
    border-width: 1px;
    border-style: solid;
    border-color: ${({ color, filled }) => (filled ? "white" : color)};
    background-color: ${({ color, filled }) => (filled ? color : "white")};
    border-radius: 2px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    column-gap: 16px;
    align-items: center;
    font-weight: bold;
    padding: 4px 16px;
    width: 100%;
`;

const IconImage = styled.img<{ filled: boolean }>`
    width: 32px;
    height: 32px;
    object-fit: contain;
    border-radius: 5px;
    background: ${({ filled }) => (filled ? "white" : undefined)};
`;
