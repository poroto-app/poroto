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
    fitHeight?: boolean;
    borderRadius?: number;
    center?: boolean;
};

export const PlanActionButton = ({
    color,
    center,
    text,
    onClick,
    imageUrl,
    icon,
    filled,
    fitHeight,
    borderRadius,
}: Props) => {
    return (
        <BorderButton
            color={color}
            center={center}
            filled={filled ?? false}
            borderRadius={borderRadius ?? 2}
            fitHeight={fitHeight}
            onClick={onClick}
        >
            {icon && (
                <Icon
                    w="32px"
                    h="32px"
                    color={filled ? "white" : color}
                    as={icon}
                />
            )}
            {imageUrl && <IconImage src={imageUrl} filled={filled} />}
            <Text>{text}</Text>
        </BorderButton>
    );
};

const BorderButton = styled.div<{
    color: string;
    filled: boolean;
    borderRadius: number;
    fitHeight?: boolean;
    center: boolean;
}>`
    color: ${({ filled }) => (filled ? "white" : "black")};
    border-width: 1px;
    border-style: solid;
    border-color: ${({ color, filled }) => (filled ? "white" : color)};
    background-color: ${({ color, filled }) => (filled ? color : "white")};
    border-radius: ${({ borderRadius }) => borderRadius}px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    column-gap: 16px;
    align-items: center;
    justify-content: ${({ center }) => (center ? "center" : "flex-start")};
    font-weight: bold;
    padding: 4px 16px;
    height: ${({ fitHeight }) => (fitHeight ? "100%" : undefined)};
    width: 100%;
`;

const IconImage = styled.img<{ filled: boolean }>`
    width: 32px;
    height: 32px;
    object-fit: contain;
    border-radius: 5px;
    background: ${({ filled }) => (filled ? "white" : undefined)};
`;
