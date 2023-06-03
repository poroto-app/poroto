import { Box, Center, VStack } from "@chakra-ui/react";
import { NavBar } from "src/view/common/NavBar";
import { PlacePreview } from "src/view/plan/PlacePreview";
import { useAppDispatch } from "src/redux/redux";
import { fetchPlanDetail, reduxPlanSelector } from "src/redux/plan";
import { LoadingModal } from "src/view/common/LoadingModal";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { PlanActionButton } from "src/view/plan/Props";
import { MdPhotoCamera } from "react-icons/md";
import html2canvas from "html2canvas";
import { PlaceMap } from "src/view/plan/PlaceMap";
import Link from "next/link";
import { PlanDuration } from "src/view/plan/PlanSummaryItem";
import { PlanScreenShotComponent } from "src/view/plan/PlanScreenShotComponent";
import { generateGoogleMapUrl } from "src/domain/util/googleMap";
import { useLocation } from "src/view/hooks/useLocation";

const PlanDetail = () => {
    const { id } = useRouter().query;
    const dispatch = useAppDispatch();
    const { getCurrentLocation, location: currentLocation } = useLocation();
    const { preview: plan, createdBasedOnCurrentLocation } =
        reduxPlanSelector();
    const plansRef = useRef<HTMLDivElement>();

    const startLocationOfRoute =
        currentLocation && createdBasedOnCurrentLocation
            ? currentLocation
            : undefined;

    useEffect(() => {
        if (!currentLocation) getCurrentLocation().then();
    }, [currentLocation]);

    useEffect(() => {
        if (id && typeof id === "string") {
            dispatch(fetchPlanDetail({ planId: id }));
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
    };

    if (!plan) return <LoadingModal title="素敵なプランを読み込んでいます" />;

    return (
        <>
            <Center flexDirection="column">
                <NavBar title={plan.title} />
                <VStack
                    maxWidth="990px"
                    w="100%"
                    px="8px"
                    py="16px"
                    boxSizing="border-box"
                >
                    <VStack py="16px" w="100%" alignItems="flex-start">
                        <PlanDuration durationInMinutes={plan.timeInMinutes} />
                    </VStack>
                    <VStack spacing={8} w="100%">
                        {
                            createdBasedOnCurrentLocation && <PlacePreview name="現在地" imageUrls={[]} tags={[]} />
                        }
                        {plan.places.map((place, i) => (
                            <PlacePreview
                                key={i}
                                name={place.name}
                                imageUrls={place.imageUrls}
                                tags={place.tags}
                            />
                        ))}
                    </VStack>
                    <VStack w="100%">
                        <PlaceMap places={plan.places} />
                        <PlanActionButton
                            text="画像で保存する"
                            color="#539565"
                            icon={MdPhotoCamera}
                            onClick={handleOnClickSaveAsImage}
                        />
                        <Link
                            href={generateGoogleMapUrl({
                                locations: plan.places.map(
                                    (place) => place.location
                                ),
                                startLocation: startLocationOfRoute,
                            })}
                            target="_blank"
                            style={{ width: "100%" }}
                        >
                            <PlanActionButton
                                text="Google Mapで経路を調べる"
                                color="#0F88E7"
                                imageUrl="/images/google_map_logo.png"
                            />
                        </Link>
                    </VStack>
                </VStack>
            </Center>
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
};

export default PlanDetail;
