import React from "react";
import {Text} from "@chakra-ui/react";
import styled from "styled-components";

type Props = {
    message: string
}

export const AskInterestMessage = ({message}: Props) => {
    return <Container>
        <Text userSelect="none">{message}</Text>
    </Container>
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 32px 16px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 10px 10px 20px #e6e6e6,
    -10px -10px 20px #ffffff;
`