import { Link } from "solito/link";
import { Routes } from "src/constant/router";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import TakenIcon from "src/view/assets/svg/taken.svg";
import { FailurePage } from "src/view/common/FailurePage";
import { RoundedButton } from "./RoundedButton";

type Props = {
    navBar?: boolean;
};

export const NotFound = ({ navBar }: Props) => {
    const { t } = useAppTranslation();
    return (
        <FailurePage
            navBar={navBar}
            title="404"
            statusMessage={t("error:notFoundStatusMessage")}
            statusDescription={t("error:notFoundDescription")}
            image={
                <TakenIcon
                    width="100%"
                    height="auto"
                    viewBox="0 0 672.5315 738.39398"
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
