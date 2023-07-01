import {Link} from "@chakra-ui/next-js";
import {Center, Image, Text, VStack} from "@chakra-ui/react";
import {Routes} from "src/view/constants/router";
import {RoundedButton} from "./RoundedButton";
import {Colors} from "src/view/constants/color";

export const NotFound = () => {
    return (
        <Center w="100%" h="100%">
            <VStack h="100%" maxW="600px" w="100%" py="32px" px="16px" justifyContent="space-between" userSelect="none">
                <Center flexDirection="column" flex={1} w="100%" px="16px">
                    <VStack color={Colors.primary["400"]} w="100%" alignItems="flex-start" spacing={0}>
                        <Text fontSize="160px" lineHeight={1} fontWeight="bold">404</Text>
                        <Text fontSize="32px" lineHeight={1}>Not Found</Text>
                    </VStack>
                    <Center w="100%">
                        <Image  w="100%" objectFit="cover" src="/images/404.png" alt="Not Found"/>
                    </Center>
                    <VStack spacing={0} w="100%" alignItems="flex-start" color="#222222">
                        <Text>申し訳ございません。</Text>
                        <Text>お探しのしおりの１ページが見つかりませんでした。</Text>
                    </VStack>
                </Center>
                <Link href={Routes.home} w="100%">
                    <RoundedButton>ホームに戻る</RoundedButton>
                </Link>
            </VStack>
        </Center>
    );
};