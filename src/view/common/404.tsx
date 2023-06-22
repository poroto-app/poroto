import { Button, Center, Image, Text, VStack } from "@chakra-ui/react";
import styled from "styled-components";

const NotFoundPage = () => {
    return (
        <VStack h="100%" py="24px" px="16px" justifyContent="space-between">
            <VStack>
                <VStack>
                    <HeaderText>404</HeaderText>
                    <SubText>Not Found</SubText>
                </VStack>
                <StyledImageWrapper>
                    <StyledImage src="/images/404.png" alt="Not Found" />
                </StyledImageWrapper>
                <Center>
                    <ErrorMessage>
                        申し訳ございません
                        <br />
                        お探しのしおりの１ページが見つかりませんでした
                    </ErrorMessage>
                </Center>
            </VStack>
            <TopButtonWrapper>
                <TopButton>ホームに戻る</TopButton>
            </TopButtonWrapper>
        </VStack>
    );
};

const HeaderText = styled(Text)`
    font-size: 170px;
    font-weight: bold;
    color: #5f553b;
    font-family: "Roboto", sans-serif;
    margin: 0;
`;

const SubText = styled(Text)`
    font-size: 42px;
    color: #5f553b;
    margin: 0;
`;

const StyledImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 12px;
`;

const StyledImage = styled(Image)`
    max-height: 196px;
    width: 100%;
    object-fit: cover;
`;

const ErrorMessage = styled(Text)`
    font-size: 20px;
    text-align: left;
    margin: 0;
`;

const TopButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const TopButton = styled(Button)`
    font-family: "Roboto", sans-serif;
    font-size: 32px;
    font-weight: bold;
    background: linear-gradient(120deg, #e1c78c, #5e6382);
    color: #ffffff;
    width: 40%;
    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    outline: none;
    appearance: none;
`;

export default NotFoundPage;
