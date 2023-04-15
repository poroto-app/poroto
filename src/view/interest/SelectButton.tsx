import {IconType} from "react-icons";
import {Icon} from "@chakra-ui/react";
import styled from "styled-components";
import React from "react";

export const SelectButton = ({color, onClick, icon}: { color: string, onClick: () => void, icon: IconType }) => {
    return <Button color={color} onClick={onClick}>
        <Icon w="32px" h="32px" color={color} as={icon}/>
    </Button>
}


const Button = styled.button<{ color: string }>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: white;
  border: 2px solid ${({color}) => color};
  border-radius: 100px;
  padding: 8px;

  transition: all 0.2s;

  &:hover {
    background-color: ${({color}) => color};

    > svg {
      color: white;
    }
  }

  &:active {
    transform: scale(0.8);
  }
`;
