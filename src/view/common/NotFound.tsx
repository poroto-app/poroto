import { Link } from "@chakra-ui/next-js";
import { Image } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { Routes } from "src/constant/router";
import { FailurePage } from "src/view/common/FailurePage";
import { RoundedButton } from "./RoundedButton";

type Props = {
    navBar?: boolean;
};

export const NotFound = ({ navBar }: Props) => {
    const { t } = useTranslation();
    return (
        <FailurePage
            navBar={navBar}
            title="404"
            statusMessage={t("error:notFoundStatusMessage")}
            statusDescription={t("error:notFoundDescription")}
            image={
                <Image
                    w="100%"
                    objectFit="cover"
                    src="/images/404.png"
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
