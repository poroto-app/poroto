import { useTranslation } from "next-i18next";
import ServerDownIcon from "src/view/assets/svg/server_down.svg";
import { FailurePage } from "src/view/common/FailurePage";
import { RoundedButton } from "src/view/common/RoundedButton";

type Props = {
    navBar?: boolean;
};

export function Error({ navBar }: Props) {
    const { t } = useTranslation();
    return (
        <FailurePage
            navBar={navBar}
            title={t("error:errorTitle")}
            statusDescription={t("error:errorDescription")}
            smallTitle={true}
            image={
                <ServerDownIcon
                    viewBox="0 0 1119.60911 699"
                    style={{
                        width: "100%",
                        height: "300px",
                    }}
                />
            }
            actions={
                <RoundedButton onClick={() => window.location.reload()}>
                    {t("common:reload")}
                </RoundedButton>
            }
        />
    );
}
