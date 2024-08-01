import { useTranslation } from "next-i18next";
import { Link } from "solito/link";
import { Colors } from "src/constant/color";
import { Routes } from "src/constant/router";
import { useAppRouter } from "src/hooks/useAppRouter";
import Notify from "src/view/assets/svg/notify.svg";
import { FailurePage } from "src/view/common/FailurePage";
import { RoundedButton } from "src/view/common/RoundedButton";

type Props = {
    navBar?: boolean;
};

export function ErrorPage({ navBar }: Props) {
    const router = useAppRouter();
    const { t } = useTranslation();

    const handleReload = () => {
        router.reload().then();
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
                    <RoundedButton
                        w="100%"
                        outlined={true}
                        color={Colors.primary["400"]}
                        onClick={handleReload}
                    >
                        {t("common:reload")}
                    </RoundedButton>
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
