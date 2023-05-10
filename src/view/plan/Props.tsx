import styled from "styled-components";
import {Icon, Text} from "@chakra-ui/react";
import {IconType} from "react-icons";
import React from "react";

type Props = {
    color: string
    text: string
    imageUrl?: string
    icon?: IconType
    onClick?: () => void
}

export const PlanActionButton = ({color, text, onClick, imageUrl, icon}: Props) => {
    return <BorderButton color={color} onClick={onClick}>
        {
            icon && <Icon w="32px" h="32px" color={color} as={icon}/>
        }
        {
            imageUrl && <IconImage src={imageUrl}/>
        }
        <Text flex={1}>{text}</Text>
    </BorderButton>;
}

const BorderButton = styled.div<{ color: string }>`
  border-width: 1px;
  border-style: solid;
  border-color: ${({color}) => color};
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

const IconImage = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;