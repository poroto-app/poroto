import { Box, Center, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { fetchPlan, reduxPlanSelector } from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { SavePlanAsImageButton } from "src/view/plan/button/SavePlanAsImageButton";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { PlaceMap } from "src/view/plan/PlaceMap";
import { PlanPlaceList } from "src/view/plan/PlanPlaceList";
import { PlanSchedule } from "src/view/plan/PlanSchedule";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { PlanPageSectionSummary } from "src/view/plan/section/PlanPageSectionSummary";

export default function PlanPage() {
    const { id } = useRouter().query;
    const dispatch = useAppDispatch();
    const { preview: plan } = reduxPlanSelector();

    useEffect(() => {
        if (typeof id !== "string") return;
        dispatch(fetchPlan({ planId: id }));
    }, [id]);

    if (!plan) return <LoadingModal title="プランを読み込んでいます" />;

    return (
        <Center flexDirection="column">
            <NavBar title={plan.title} />
            <VStack
                maxWidth="990px"
                w="100%"
                px="0"
                py="16px"
                boxSizing="border-box"
                spacing="16px"
            >
                <PlanPageSectionSummary
                    planDurationInMinutes={plan.timeInMinutes}
                />
                <Box px="8px">
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
        </Center>
    );
}
