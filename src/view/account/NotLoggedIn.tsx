import { Center, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import OnTheWayIcon from "src/view/assets/svg/on_the_way.svg";
import { AppTrans } from "src/view/common/AppTrans";

type Props = {
    onLogin?: () => void;
};

export function NotLoggedIn({ onLogin }: Props) {
    const { t, i18n } = useTranslation();
    const text = useBreakpointValue({
        base: (
            <AppTrans
                i18nKey="account:loginTitle"
                values={{ br: <br /> }}
            />
        ),
        sm: <AppTrans i18nKey="account:loginTitle" values={{ br: "" }} />,
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
                    <Text>{t("account:loginDescription")}</Text>
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
