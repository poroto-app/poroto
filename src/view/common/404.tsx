import { Box, Button, Image, Text, VStack } from "@chakra-ui/react";
import styled from "styled-components";

import notFoundImage from "./404.png";

const NotFoundPage = () => {
    return (
        <Container>
            <VStack>
                <HeaderTextWrapper>
                    <HeaderText>404</HeaderText>
                    <SubText>Not Found</SubText>
                </HeaderTextWrapper>
                <StyledImageWrapper>
                    <StyledImage src={notFoundImage} alt="Not Found" />
                </StyledImageWrapper>
                <ErrorMessageWrapper>
                    <ErrorMessage>
                        申し訳ございません
                        <br />
                        お探しのしおりの１ページが見つかりませんでした
                    </ErrorMessage>
                </ErrorMessageWrapper>
            </VStack>
            <TopButtonWrapper>
                <TopButton>Top</TopButton>
            </TopButtonWrapper>
        </Container>
    );
};

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    padding: 24px 16px;
`;

const HeaderTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
`;

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
    width: auto;
`;

const ErrorMessageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
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
`;

export default NotFoundPage;
