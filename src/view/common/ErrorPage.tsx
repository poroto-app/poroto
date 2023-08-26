import { Link } from "@chakra-ui/next-js";
import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Notify from "src/view/assets/svg/notify.svg";
import { RoundedButton } from "src/view/common/RoundedButton";
import { Colors } from "src/view/constants/color";
import { Routes } from "src/view/constants/router";
import styled from "styled-components";

export function ErrorPage() {
    const router = useRouter();

    const handleReload = () => {
        router.reload();
    };

    return (
        <Center w="100%" h="100%" py="32px" px="16px">
            <VStack w="100%" h="100%" maxW="600px">
                <Center flexDirection="column" flex={1} w="100%" px="16px">
                    <VStack
                        color={Colors.primary["400"]}
                        w="100%"
                        alignItems="flex-start"
                        spacing={0}
                    >
                        <Text fontSize="32px" lineHeight={1}>
                            Server Error
                        </Text>
                        <Text fontSize="160px" lineHeight={1} fontWeight="bold">
                            505
                        </Text>
                        <Center w="100%"></Center>
                    </VStack>
                    <Box w="100%" my="32px">
                        <Notify
                            viewBox="0 0 790 512.20805"
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </Box>
                    <VStack
                        spacing={0}
                        w="100%"
                        alignItems="center"
                        color="rgba(0,0,0,.6)"
                    >
                        <Text>申し訳ございません。 </Text>
                        <Text>エラーが発生しました。</Text>
                    </VStack>
                </Center>
                <VStack w="100%">
                    <Button
                        w="100%"
                        variant="outline"
                        color={Colors.primary["400"]}
                        borderWidth="2px"
                        borderColor={Colors.primary["400"]}
                        borderRadius="50px"
                        onClick={handleReload}
                    >
                        再読込
                    </Button>
                    <Link
                        href={Routes.home}
                        w="100%"
                        _hover={{ textDecoration: "none" }}
                    >
                        <RoundedButton>ホームに戻る</RoundedButton>
                    </Link>
                </VStack>
            </VStack>
        </Center>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-width: 600px;
    padding: 32px 16px;
    user-select: none;
`;
