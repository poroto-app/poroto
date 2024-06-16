import { Link } from "@chakra-ui/next-js";
import { Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FailurePage } from "src/view/common/FailurePage";
import { Routes } from "src/view/constants/router";
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
            statusMessage="Not Found"
            statusDescription={t("common:notFound")}
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
