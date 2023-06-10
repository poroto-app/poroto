import { Center, VStack } from "@chakra-ui/react";
import { NavBar } from "src/view/common/NavBar";
import { useAppDispatch } from "src/redux/redux";
import {
    fetchCachedCreatedPlans,
    fetchPlanDetail,
    reduxPlanSelector,
} from "src/redux/plan";
import { LoadingModal } from "src/view/common/LoadingModal";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { PlaceMap } from "src/view/plan/PlaceMap";
import { PlanDuration } from "src/view/plan/PlanSummaryItem";
import { useLocation } from "src/view/hooks/useLocation";
import { SavePlanAsImageButton } from "src/view/plan/button/SavePlanAsImageButton";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { PlanPlaceList } from "src/view/plan/PlanPlaceList";
import {
    FooterHeight,
    PlanCandidateFooter,
} from "src/view/plan/PlanCandidateFooter";

const PlanDetail = () => {
    const { sessionId, planId } = useRouter().query;
    const dispatch = useAppDispatch();
    const { getCurrentLocation, location: currentLocation } = useLocation();
    const {
        preview: plan,
        createdBasedOnCurrentLocation,
        createPlanSession,
    } = reduxPlanSelector();

    useEffect(() => {
        if (!currentLocation) getCurrentLocation().then();
    }, [currentLocation]);

    // プラン候補のキャッシュが存在しない場合は取得する
    useEffect(() => {
        if (!sessionId || typeof sessionId !== "string") {
            return;
        }

        if (createPlanSession !== sessionId) {
            dispatch(fetchCachedCreatedPlans({ session: sessionId }));
        }
    }, [sessionId, createPlanSession]);

    // プランの詳細を取得する
    useEffect(() => {
        if (!createPlanSession) return;
        if (planId && typeof planId === "string") {
            dispatch(fetchPlanDetail({ planId }));
        }
    }, [planId, createPlanSession]);

    if (!plan) return <LoadingModal title="素敵なプランを読み込んでいます" />;

    return (
        <>
            <Center flexDirection="column" pb={`${FooterHeight}px`}>
                <NavBar title={plan.title} />
                <VStack
                    maxWidth="990px"
                    w="100%"
                    px="8px"
                    py="16px"
                    boxSizing="border-box"
                >
                    <PlanPlaceList
                        plan={plan}
                        createdBasedOnCurrentLocation={
                            createdBasedOnCurrentLocation
                        }
                    />
                    <VStack py="16px" w="100%" alignItems="flex-start">
                        <PlanDuration durationInMinutes={plan.timeInMinutes} />
                    </VStack>
                    <VStack w="100%">
                        <PlaceMap places={plan.places} />
                        <SavePlanAsImageButton plan={plan} />
                        <SearchRouteByGoogleMapButton
                            plan={plan}
                            currentLocation={currentLocation}
                            createdBasedOnCurrentLocation={
                                createdBasedOnCurrentLocation
                            }
                        />
                    </VStack>
                </VStack>
            </Center>
            <PlanCandidateFooter onSave={() => {}} />
        </>
    );
};

export default PlanDetail;
