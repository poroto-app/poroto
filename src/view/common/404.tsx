import { Link } from "@chakra-ui/next-js";
import { Center, Image, Text, VStack } from "@chakra-ui/react";
import { Routes } from "src/view/constants/router";
import styled from "styled-components";
import { RoundedButton } from "./RoundedButton";

const NotFoundPage = () => {
    return (
        <Center w="100%">
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
                <Link href={Routes.home} w="100%">
                    <RoundedButton>ホームに戻る</RoundedButton>
                </Link>
            </VStack>
        </Center>
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

export default NotFoundPage;
