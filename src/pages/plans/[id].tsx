import { Box, Center, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getPlanPriceRange } from "src/domain/models/Plan";
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
import { SavePlanAsImageButton } from "src/view/plan/button/SavePlanAsImageButton";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { PlaceMap } from "src/view/plan/PlaceMap";
import { PlanCreatedDialog } from "src/view/plan/PlanCreatedDialog";
import { PlanPageThumbnail } from "src/view/plan/PlanPageThumbnail";
import { PlanPlaceList } from "src/view/plan/PlanPlaceList";
import { PlanSchedule } from "src/view/plan/PlanSchedule";
import { FooterHeight, PlanShareFooter } from "src/view/plan/PlanShareFooter";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { PlanPageSectionSummary } from "src/view/plan/section/PlanPageSectionSummary";

export default function PlanPage() {
    const { id } = useRouter().query;
    const dispatch = useAppDispatch();
    const {
        preview: plan,
        fetchPlanRequestStatus,
        showPlanCreatedModal,
    } = reduxPlanSelector();

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

    const priceRange = getPlanPriceRange(plan.places);

    return (
        <Center flexDirection="column" pb={`${FooterHeight}px`}>
            <NavBar />
            <VStack
                maxWidth="990px"
                w="100%"
                px="0"
                py="16px"
                boxSizing="border-box"
                spacing="16px"
                pb="32px"
            >
                <PlanPageThumbnail plan={plan} />
                <PlanPageSectionSummary
                    planDurationInMinutes={plan.timeInMinutes}
                    planMinBudget={priceRange.min}
                    planMaxBudget={priceRange.max}
                />
                <Box w="100%" px="20px">
                    <PlanPlaceList plan={plan} />
                </Box>
                <PlanPageSection title="スケジュール" accordion>
                    <PlanSchedule plan={plan} />
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
            <PlanShareFooter />
            <PlanCreatedDialog
                visible={showPlanCreatedModal}
                onClickClose={() => dispatch(setShowPlanCreatedModal(false))}
            />
        </Center>
    );
}
