import {IconType} from "react-icons";
import styled from "styled-components";
import {ButtonProps, Icon, Text} from "@chakra-ui/react";
import React from "react";

type Props = {
    text: string;
    icon?: IconType;
    onClick?: () => void;
    disabled?: boolean;
} & ButtonProps

export function Button({text, icon, onClick, disabled}: Props) {
    return <RoundedButton onClick={onClick} disabled={disabled ?? false}>
        {
            icon && <Icon mb="6px" w="32px" h="32px" as={icon}/>
        }
        <Text>{text}</Text>
    </RoundedButton>
}

const RoundedButton = styled.div<{ disabled: boolean }>`
  background-color: ${({disabled}) => disabled ? "#8b8b8b" : "#539565"};
  border-radius: 10px;
  color: white;
  cursor: ${({disabled}) => disabled ? "default" : "pointer"};
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
  padding: 4px 8px;
  width: 100%;
`;
