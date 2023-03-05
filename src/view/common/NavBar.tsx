import styled from "styled-components";
import {Text} from "@chakra-ui/react";

type Props = {
    title?: string
}

export const NavBar = ({title}: Props) => {
    return <Container>
        {
            title && <Text>{title}</Text>
        }
    </Container>
}

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  padding: 8px 16px;
  font-size: 0.95rem;
`;