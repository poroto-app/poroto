import { Link } from "solito/link";
import { Colors } from "src/constant/color";
import { Routes } from "src/constant/router";
import { useAppRouter } from "src/hooks/useAppRouter";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import Notify from "src/view/assets/svg/notify.svg";
import { FailurePage } from "src/view/common/FailurePage";
import { RoundedButton } from "src/view/common/RoundedButton";
import { isWeb } from "tamagui";

type Props = {
    navBar?: boolean;
};

export function ErrorPage({ navBar }: Props) {
    const router = useAppRouter();
    const { t } = useAppTranslation();

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
                    width={isWeb ? "100%" : 300}
                    height={isWeb ? "100%" : 300}
                />
            }
            actions={
                <>
                    <RoundedButton
                        w="100%"
                        label={t("common:reload")}
                        outlined={true}
                        color={Colors.primary["400"]}
                        onClick={handleReload}
                    />
                    <Link
                        href={Routes.home}
                        viewProps={{ style: { width: "100%" } }}
                    >
                        <RoundedButton label={t("common:backToHome")} />
                    </Link>
                </>
            }
        />
    );
}
