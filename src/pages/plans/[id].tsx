import { Center, useToast, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getPlanPriceRange } from "src/domain/models/Plan";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
    fetchPlacesNearbyPlanLocation,
    fetchPlan,
    reduxPlanSelector,
    setShowPlanCreatedModal,
} from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { ErrorPage } from "src/view/common/ErrorPage";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { NotFound } from "src/view/common/NotFound";
import { Size } from "src/view/constants/size";
import { isPC } from "src/view/constants/userAgent";
import { SavePlanAsImageButton } from "src/view/plan/button/SavePlanAsImageButton";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { PlaceMap } from "src/view/plan/PlaceMap";
import { PlanCreatedDialog } from "src/view/plan/PlanCreatedDialog";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { PlanDetailPageHeader } from "src/view/plandetail/header/PlanDetailPageHeader";
import { NearbyPlaceList } from "src/view/plandetail/NearbyPlaceList";
import { PlanInfoSection } from "src/view/plandetail/PlanInfoSection";
import { PlanPlaceList } from "src/view/plandetail/PlanPlaceList";

export default function PlanPage() {
    const { id } = useRouter().query;
    const dispatch = useAppDispatch();
    const {
        preview: plan,
        placesNearbyPlanLocation,
        fetchPlanRequestStatus,
        showPlanCreatedModal,
    } = reduxPlanSelector();
    const toast = useToast();

    const handleOnCopyPlanUrl = () => {
        const url: string = location.href;
        navigator.clipboard.writeText(url);

        toast({
            title: "しおりのURLをコピーしました",
            description: "作ったしおりを共有してみましょう！",
            status: "success",
            duration: 3000, // ポップアップが表示される時間（ミリ秒）
            isClosable: true,
        });
    };

    useEffect(() => {
        if (typeof id !== "string") return;
        dispatch(fetchPlan({ planId: id }));
        dispatch(fetchPlacesNearbyPlanLocation({ planId: id, limit: 10 }));

        return () => {
            // 他のページに遷移するときにモーダルを閉じる
            // (戻るボタンでトップページに遷移したときの対応)
            dispatch(setShowPlanCreatedModal(false));
        };
    }, [id]);

    if (
        !fetchPlanRequestStatus ||
        fetchPlanRequestStatus === RequestStatuses.PENDING
    )
        return <LoadingModal title="プランを読み込んでいます" />;

    if (fetchPlanRequestStatus === RequestStatuses.REJECTED)
        return <ErrorPage />;

    if (!plan) return <NotFound />;

    return (
        <Center flexDirection="column" pb="32px">
            <Head>
                <title>{plan.title} | poroto</title>
            </Head>
            <NavBar />
            <VStack
                w="100%"
                minH={!isPC && `calc(100vh - ${Size.NavBar.height})`}
            >
                <PlanDetailPageHeader
                    plan={plan}
                    /*TODO: ログインユーザーがLIKEした場所を反映できるようにする*/
                    likedPlaceIds={[]}
                    /*TODO: 非ログインユーザーの場合はログインを促すダイアログを表示する*/
                    onUpdateLikePlace={() => 0}
                    onCopyPlanUrl={handleOnCopyPlanUrl}
                />
            </VStack>
            <VStack
                maxWidth="990px"
                w="100%"
                px="0"
                py="16px"
                boxSizing="border-box"
                spacing="16px"
                pb="32px"
            >
                <PlanPageSection title="プランの情報">
                    <PlanInfoSection
                        durationInMinutes={plan.timeInMinutes}
                        priceRange={getPlanPriceRange(plan.places)}
                    />
                </PlanPageSection>
                <PlanPageSection title="プラン">
                    {/*TODO: ログインユーザーがLIKEした場所を反映できるようにする*/}
                    <PlanPlaceList plan={plan} likePlaceIds={[]} />
                </PlanPageSection>
                <PlanPageSection title="プラン内の場所">
                    <PlaceMap places={plan.places} />
                </PlanPageSection>
                <VStack w="100%" px="16px">
                    <SavePlanAsImageButton plan={plan} />
                    <SearchRouteByGoogleMapButton
                        plan={plan}
                        currentLocation={null}
                    />
                </VStack>
                {process.env.APP_ENV !== "production" && (
                    <PlanPageSection
                        title={`このプランの近くの場所から\n新しいプランを作って見ませんか？`}
                    >
                        <NearbyPlaceList places={placesNearbyPlanLocation} />
                    </PlanPageSection>
                )}
            </VStack>
            <PlanCreatedDialog
                visible={showPlanCreatedModal}
                onClickClose={() => dispatch(setShowPlanCreatedModal(false))}
                onClickCopyUrl={() => {
                    dispatch(setShowPlanCreatedModal(false));
                    handleOnCopyPlanUrl();
                }}
            />
        </Center>
    );
}
