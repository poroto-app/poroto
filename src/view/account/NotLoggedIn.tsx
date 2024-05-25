import { Center, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import OnTheWayIcon from "src/view/assets/svg/on_the_way.svg";

type Props = {
    onLogin?: () => void;
};

export function NotLoggedIn({ onLogin }: Props) {
    const text = useBreakpointValue({
        base: (
            <>
                新しい景色に、
                <br />
                会いに行こう。
            </>
        ),
        sm: "新しい景色に、会いに行こう。",
    });

    return (
        <VStack w="100%" h="100%" spacing="32px">
            <Center flex={1} w="100%" p="16px">
                <OnTheWayIcon
                    style={{
                        width: "100%",
                        maxWidth: "100%",
                        height: "300px",
                    }}
                    viewBox="0 0 829 364.82907"
                />
            </Center>
            <VStack
                w="100%"
                px="32px"
                py="64px"
                maxW="750px"
                spacing="32px"
                backgroundColor="#BD9F8E"
                borderTopRadius="30px"
                color="white"
            >
                <VStack spacing="16px" w="100%" alignItems="flex-start">
                    <Text fontSize="32px" fontWeight="bold">
                        {text}
                    </Text>
                    <Text>
                        作成したプランやお気に入りの場所をいつでも見られるようになります。
                    </Text>
                </VStack>
                <Center
                    as="button"
                    w="100%"
                    px="16px"
                    py="8px"
                    backgroundColor="white"
                    borderRadius="5px"
                    onClick={onLogin}
                >
                    <Text color="#BD9F8E" fontWeight="bold" fontSize="18px">
                        ログイン
                    </Text>
                </Center>
            </VStack>
        </VStack>
    );
}
