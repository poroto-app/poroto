import { useAppTranslation } from "src/hooks/useAppTranslation";
import ServerDownIcon from "src/view/assets/svg/server_down.svg";
import { FailurePage } from "src/view/common/FailurePage";
import { RoundedButton } from "src/view/common/RoundedButton";

type Props = {
    navBar?: boolean;
    onReload?: () => void;
};

export function Error({ navBar, onReload }: Props) {
    const { t } = useAppTranslation();

    const handleOnReload = () => {
        onReload?.();
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    };

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
                <RoundedButton
                    label={t("common:reload")}
                    onClick={handleOnReload}
                />
            }
        />
    );
}
