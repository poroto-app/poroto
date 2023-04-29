import styled from "styled-components";
import {HStack, Text} from "@chakra-ui/react";
import React from "react";

type Props = {
    title?: string
}

export const NavBar = ({title}: Props) => {
    return <Container>
        <HStack w="100%" maxW="990px">
            {
                title && <Text>{title}</Text>
            }
        </HStack>
    </Container>
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  padding: 8px 16px;
  font-size: 0.95rem;
  width: 100%;
`;