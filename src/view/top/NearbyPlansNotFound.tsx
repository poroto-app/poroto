import { Link } from "@chakra-ui/next-js";
import { Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import IconTraveling from "src/view/assets/svg/traveling.svg";
import { RoundedButton } from "src/view/common/RoundedButton";
import { Routes } from "src/view/constants/router";

export const NearbyPlansNotFound = () => {
    const { t } = useTranslation();

    return (
        <VStack w="100%" spacing="32px">
            <IconTraveling
                viewBox="0 0 731.67 435.03"
                style={{
                    height: 200,
                    maxWidth: "100%",
                }}
            />
            <VStack spacing={0}>
                <Text fontSize="12px" color="rgba(0,0,0,.6)">
                    {t("plan:nearbyPlansEmptyTitle")}
                </Text>
                <Text fontSize="20px" fontWeight="bold">
                    {t("plan:nearbyPlansEmptyDescription")}
                </Text>
            </VStack>
            <Link href={Routes.plans.interest({})} w="100%" maxW="400px">
                <RoundedButton>{t("plan:createPlan")}</RoundedButton>
            </Link>
        </VStack>
    );
};
