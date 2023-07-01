import { Link } from "@chakra-ui/next-js";
import { Center, Image, Text, VStack } from "@chakra-ui/react";
import { Colors } from "src/view/constants/color";
import { Routes } from "src/view/constants/router";
import styled from "styled-components";
import { RoundedButton } from "./RoundedButton";

export const NotFound = () => {
    return (
        <Center w="100%" h="100%">
            <Container>
                <Center flexDirection="column" flex={1} w="100%" px="16px">
                    <VStack
                        color={Colors.primary["400"]}
                        w="100%"
                        alignItems="flex-start"
                        spacing={0}
                    >
                        <Text fontSize="160px" lineHeight={1} fontWeight="bold">
                            404
                        </Text>
                        <Text fontSize="32px" lineHeight={1}>
                            Not Found
                        </Text>
                    </VStack>
                    <Image
                        w="100%"
                        objectFit="cover"
                        src="/images/404.png"
                        alt="Not Found"
                    />
                    <VStack
                        spacing={0}
                        w="100%"
                        alignItems="flex-start"
                        color="#222222"
                    >
                        <Text>申し訳ございません。</Text>
                        <Text>
                            お探しのしおりの１ページが見つかりませんでした。
                        </Text>
                    </VStack>
                </Center>
                <Link
                    href={Routes.home}
                    w="100%"
                    _hover={{ textDecoration: "none" }}
                >
                    <RoundedButton>ホームに戻る</RoundedButton>
                </Link>
            </Container>
        </Center>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-width: 600px;
    padding: 32px 16px;
    user-select: none;
`;
