import { Box } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { Plan } from "src/domain/models/Plan";
import { PlanActionButton } from "src/view/plan/button/PlanActionButton";
import { PlanScreenShotComponent } from "src/view/plan/PlanScreenShotComponent";

type Props = {
    plan: Plan;
};

export function SavePlanAsImageButton({ plan }: Props) {
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
            console.log(downloadLink);
            document.body.removeChild(downloadLink);
        } else {
            window.open(targetImageUri);
        }
    };

    return (
        <>
            <PlanActionButton
                text="画像で保存する"
                icon={MdPhotoCamera}
                onClick={handleOnClickSaveAsImage}
            />
            <Box position="fixed" top="-10000">
                {/*TODO: 実際の予算を入力する*/}
                <PlanScreenShotComponent
                    plan={plan}
                    money={{ start: 0 }}
                    ref={plansRef}
                />
            </Box>
        </>
    );
}
