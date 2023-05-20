import {IconType} from "react-icons";
import styled from "styled-components";
import {ButtonProps, Icon, Text} from "@chakra-ui/react";
import React from "react";

type Props = {
    text: string;
    icon?: IconType;
    onClick?: () => void;
} & ButtonProps

export function Button({text, icon, onClick}: Props) {
    return <RoundedButton onClick={onClick}>
        {
            icon && <Icon w="32px" h="32px" as={icon}/>
        }
        <Text>{text}</Text>
    </RoundedButton>
}

const RoundedButton = styled.div`
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
`;
