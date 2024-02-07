import { Box, Center, useToast, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
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
import { SavePlanAsImageButton } from "src/view/plan/button/SavePlanAsImageButton";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { PlaceMap } from "src/view/plan/PlaceMap";
import { PlanCreatedDialog } from "src/view/plan/PlanCreatedDialog";
import { FooterHeight } from "src/view/plan/PlanFooter";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { PlanDetailPageHeader } from "src/view/plandetail/header/PlanDetailPageHeader";
import { PlanPlaceList } from "src/view/plandetail/PlanPlaceList";

export default function PlanPage() {
    const { id } = useRouter().query;
    const dispatch = useAppDispatch();
    const {
        preview: plan,
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
        <Center flexDirection="column" pb={`${FooterHeight}px`}>
            <Head>
                <title>{plan.title} | poroto</title>
            </Head>
            <NavBar />
            <Box
                w="100%"
                h={`calc(100vh - ${Size.NavBar.height})`}
                minH="700px"
                maxH="850px"
            >
                <PlanDetailPageHeader
                    plan={plan}
                    /*TODO: ログインユーザーがLIKEした場所を反映できるようにする*/
                    likedPlaceIds={[]}
                    /*TODO: 非ログインユーザーの場合はログインを促すダイアログを表示する*/
                    onUpdateLikePlace={() => 0}
                    onCopyPlanUrl={handleOnCopyPlanUrl}
                />
            </Box>
            <VStack
                maxWidth="990px"
                w="100%"
                px="0"
                py="16px"
                boxSizing="border-box"
                spacing="16px"
                pb="32px"
            >
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
