import {Center, VStack} from "@chakra-ui/react"
import {NavBar} from "src/view/common/NavBar"
import {PlacePreview} from "src/view/plan/PlacePreview"
import {useAppDispatch} from "src/redux/redux";
import {fetchPlanDetail, reduxPlanSelector} from "src/redux/plan";
import {LoadingModal} from "src/view/common/LoadingModal";
import {useEffect, useRef} from "react";
import {useRouter} from "next/router";
import {PlanActionButton} from "src/view/plan/Props";
import {MdPhotoCamera} from "react-icons/md";
import html2canvas from "html2canvas";
import {MdSchedule} from "react-icons/md";
import { PlanDuration, PlanSummaryItem } from "src/view/plan/PlanSummaryItem";

const PlanDetail = () => {

    const {id} = useRouter().query;
    const dispatch = useAppDispatch();
    const {preview: plan} = reduxPlanSelector();
    const plansRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (id && typeof id === "string") {
            dispatch(fetchPlanDetail({planId: id}));
        }
    }, [id]);

    const handleOnClickSaveAsImage = async () => {
        // TODO: 外部から取得する画像は表示することができないため、
        // スクリーンショット用のコンポーネントを作成する
        if (!plansRef.current) return;
        const canvas = await html2canvas(plansRef.current);
        const targetImageUri = canvas.toDataURL("img/jpg");

        const downloadLink = document.createElement("a");
        if (typeof downloadLink.download === "string") {
            downloadLink.href = targetImageUri;
            downloadLink.download = `${id}.jpg`;
            document.body.append(downloadLink);
            downloadLink.click();
            console.log(downloadLink);
            document.body.removeChild(downloadLink);
        } else {
            window.open(targetImageUri);
        }
    }

    if (!plan) return <LoadingModal title="素敵なプランを読み込んでいます"/>

    return <Center flexDirection="column">
        <NavBar title={plan.title}/>
        <VStack maxWidth="990px" w="100%" px="8px" py="16px" boxSizing="border-box">
            <VStack py="16px" w="100%" alignItems="flex-start">
                <PlanDuration durationInMinutes={plan.timeInMinutes} />
            </VStack>
            <VStack spacing={8} w="100%" ref={plansRef}>
                {
                    plan.places.map((place, i) => <PlacePreview
                        key={i}
                        name={place.name}
                        imageUrls={place.imageUrls}
                        tags={place.tags}
                    />)
                }
            </VStack>
            <VStack w="100%">
                <PlanActionButton
                    text="画像で保存する" color="#539565" icon={MdPhotoCamera}
                    onClick={handleOnClickSaveAsImage}
                />
            </VStack>
        </VStack>
    </Center>
}

export default PlanDetail