import { Text } from "@chakra-ui/react";
import styled from "styled-components";

type Props = {
    message: string;
};

export const MessageCard = ({ message }: Props) => {
    return (
        <Container>
            <Text userSelect="none">{message}</Text>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 32px 16px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background-color: white;
`;
