import { Center, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import { Trans, useTranslation } from "react-i18next";
import { TranslationNameSpaces } from "src/locales/i18n";
import OnTheWayIcon from "src/view/assets/svg/on_the_way.svg";

type Props = {
    onLogin?: () => void;
};

export function NotLoggedIn({ onLogin }: Props) {
    const { t, i18n } = useTranslation();
    const text = useBreakpointValue({
        base: (
            <Trans
                t={t}
                tOptions={{
                    ns: TranslationNameSpaces,
                }}
                i18nKey="account:promptLoginTitle"
                values={{ br: "<br/>" }}
            />
        ),
        sm: (
            <Trans
                t={t}
                tOptions={{
                    ns: TranslationNameSpaces,
                }}
                i18nKey="account:promptLoginTitle"
                values={{ br: "" }}
            />
        ),
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
                        {t("account:loginByGoogle")}
                    </Text>
                </Center>
            </VStack>
        </VStack>
    );
}
