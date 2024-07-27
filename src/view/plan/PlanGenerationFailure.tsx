import { Link } from "@chakra-ui/next-js";
import { Image } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { ReactNode } from "react";
import { Routes } from "src/constant/router";
import { FailurePage } from "src/view/common/FailurePage";
import { RoundedButton } from "../common/RoundedButton";

type Props = {
    navBar?: ReactNode;
};

export const PlanGenerationFailure = ({ navBar }: Props) => {
    const { t } = useTranslation();
    return (
        <FailurePage
            title="Sorry"
            navBar={navBar}
            statusDescription={t("plan:createPlanFailed")}
            image={
                <Image
                    w="100%"
                    objectFit="cover"
                    src="/images/NotFound.jpg"
                    alt="Not Found"
                />
            }
            actions={
                <Link
                    href={Routes.home}
                    w="100%"
                    _hover={{ textDecoration: "none" }}
                >
                    <RoundedButton>{t("common:backToHome")}</RoundedButton>
                </Link>
            }
        />
    );
};
