import { Image } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { Link } from "solito/link";
import { Routes } from "src/constant/router";
import { FailurePage } from "src/view/common/FailurePage";
import { RoundedButton } from "../common/RoundedButton";

type Props = {
    navBar?: boolean;
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
                    viewProps={{ style: { width: "100%" } }}
                >
                    <RoundedButton>{t("common:backToHome")}</RoundedButton>
                </Link>
            }
        />
    );
};
