import {Center, HStack, Icon, Text, VStack} from "@chakra-ui/react"
import {NavBar} from "src/view/common/NavBar"
import {PlacePreview} from "src/view/plan/PlacePreview"
import {useAppDispatch} from "src/redux/redux";
import {fetchPlanDetail, reduxPlanSelector} from "src/redux/plan";
import {LoadingModal} from "src/view/common/LoadingModal";
import {useEffect, useRef} from "react";
import {useRouter} from "next/router";
import {PlanActionButton} from "src/view/plan/Props";
import {MdPhotoCamera, MdSchedule} from "react-icons/md";
import html2canvas from "html2canvas";
import {IconType} from "react-icons";
import {DateHelper} from "src/domain/util/date";
import Link from "next/link";

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

    const generateGoogleMapUrl = (): string => {
        // SEE: https://developers.google.com/maps/documentation/urls/get-started?hl=ja#directions-action
        const url = new URL("https://www.google.com/maps/dir/");
        url.searchParams.set("api", "1");

        // TODO: 出発地点が現在地でなく、検索した場所のときは明示的に出発地点を設定する
        // baseUrl.searchParams.set("origin", `${plan.places[0].location.latitude},${plan.places[0].location.longitude}`);

        const waypoints = plan.places.slice(0, plan.places.length - 1)
            .map((waypoint) => `${waypoint.location.longitude},${waypoint.location.latitude}`)
            .join("|");
        url.searchParams.set("waypoints", waypoints)

        const destination = plan.places[plan.places.length - 1];
        url.searchParams.set("destination", `${destination.location.latitude},${destination.location.longitude}`);

        return url.href;
    };

    if (!plan) return <LoadingModal title="素敵なプランを読み込んでいます"/>

    return <Center flexDirection="column">
        <NavBar title={plan.title}/>
        <VStack maxWidth="990px" w="100%" px="8px" py="16px" boxSizing="border-box">
            <VStack py="16px" w="100%" alignItems="flex-start">
                <PlanSummaryItem
                    icon={MdSchedule}
                    text={`${plan.timeInMinutes.toFixed()}分 (~ ${DateHelper.dateToHHMM(DateHelper.add(new Date(), plan.timeInMinutes * DateHelper.Minute))})`}
                />
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
                <Link href={generateGoogleMapUrl()} target="_blank" style={{width: "100%"}}>
                    <PlanActionButton
                        text="Google Mapで経路を調べる"
                        color="#0F88E7"
                        imageUrl="/images/google_map_logo.png"
                    />
                </Link>
            </VStack>
        </VStack>
    </Center>
}

const PlanSummaryItem = ({text, icon}: { text: string, icon: IconType }) => {
    return <HStack w="100%" px="16px" py="4px" columnGap="20px" spacing={0}>
        <Icon w="24px" h="24px" color="#BD9F8E" as={icon}/>
        <Text color="rgba(0,0,0,.6)">{text}</Text>
    </HStack>
}

export default PlanDetail