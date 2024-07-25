import { Button } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Link } from "solito/link";
import { Colors } from "src/constant/color";
import { Routes } from "src/constant/router";
import Notify from "src/view/assets/svg/notify.svg";
import { FailurePage } from "src/view/common/FailurePage";
import { RoundedButton } from "src/view/common/RoundedButton";

type Props = {
    navBar?: boolean;
};

export function ErrorPage({ navBar }: Props) {
    const router = useRouter();
    const { t } = useTranslation();

    const handleReload = () => {
        // TODO: native対応
        router.reload();
    };

    return (
        <FailurePage
            navBar={navBar}
            title="505"
            statusMessage={t("error:serverErrorStatusMessage")}
            statusDescription={t("error:serverErrorDescription")}
            image={
                <Notify
                    viewBox="0 0 790 512.20805"
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            }
            actions={
                <>
                    <Button
                        w="100%"
                        variant="outline"
                        color={Colors.primary["400"]}
                        borderWidth="2px"
                        borderColor={Colors.primary["400"]}
                        borderRadius="50px"
                        onClick={handleReload}
                    >
                        {t("common:reload")}
                    </Button>
                    <Link
                        href={Routes.home}
                        viewProps={{ style: { width: "100%" } }}
                    >
                        <RoundedButton>{t("common:backToHome")}</RoundedButton>
                    </Link>
                </>
            }
        />
    );
}
