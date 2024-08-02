import { Box } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { Plan } from "src/domain/models/Plan";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { PlanScreenShotComponent } from "src/view/plan/PlanScreenShotComponent";
import { PlanActionButton } from "src/view/plan/button/PlanActionButton";

type Props = {
    plan: Plan;
};

export function SavePlanAsImageButton({ plan }: Props) {
    const { t } = useAppTranslation();
    const plansRef = useRef<HTMLDivElement>();

    const handleOnClickSaveAsImage = async () => {
        // TODO: 外部から取得する画像は表示することができないため、
        // スクリーンショット用のコンポーネントを作成する
        if (!plansRef.current) return;
        const canvas = await html2canvas(plansRef.current);
        const targetImageUri = canvas.toDataURL("img/jpg");

        const downloadLink = document.createElement("a");
        if (typeof downloadLink.download === "string") {
            downloadLink.href = targetImageUri;
            downloadLink.download = `${plan.id}.jpg`;
            document.body.append(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } else {
            window.open(targetImageUri);
        }
    };

    return (
        <>
            <PlanActionButton
                text={t("plan:saveAsImage")}
                icon={MdOutlinePhotoCamera}
                onClick={handleOnClickSaveAsImage}
            />
            {/*スクリーンショット用のコンポーネントは見えないようにしておく*/}
            <Box position="fixed" top="-10000">
                <PlanScreenShotComponent plan={plan} ref={plansRef} />
            </Box>
        </>
    );
}
