import { Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import MobileLogin from "src/view/assets/svg/mobile_login.svg";
import { RoundedButton } from "src/view/common/RoundedButton";

type Props = {
    onLogin?: () => void;
};

export const LoginCallMessage = ({ onLogin }: Props) => {
    const { t } = useTranslation();
    return (
        <VStack
            w="100%"
            border="1px solid #C4B8A7"
            px="16px"
            pt="8px"
            pb="16px"
            borderRadius="10px"
            spacing="16px"
        >
            <VStack
                w="100%"
                flexDir={{
                    base: "column",
                    md: "row",
                }}
                spacing="16px"
            >
                <MobileLogin
                    viewBox="0 0 708 555.86743"
                    style={{
                        maxHeight: "200px",
                        maxWidth: "250px",
                    }}
                />
                <VStack w="100%" spacing={0} alignItems="flex-start">
                    <Text fontSize="1.2rem" fontWeight="bold">
                        {t("plan:loginRecommendationTitle")}
                    </Text>
                    <Text flex={1}>
                        {t("plan:loginRecommendationDescription")}
                    </Text>
                </VStack>
            </VStack>
            <RoundedButton color="#BF756E" onClick={onLogin}>
                {t("account:login")}
            </RoundedButton>
        </VStack>
    );
};
