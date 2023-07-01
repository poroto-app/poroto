import { Box, Center, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Place } from "src/domain/models/Place";
import { Plan } from "src/domain/models/Plan";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { copyObject } from "src/domain/util/object";
import {
    fetchCachedCreatedPlans,
    fetchPlanDetail,
    reduxPlanCandidateSelector,
    savePlanFromCandidate,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { AdInArticle } from "src/view/ad/AdInArticle";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { Routes } from "src/view/constants/router";
import { useLocation } from "src/view/hooks/useLocation";
import { SavePlanAsImageButton } from "src/view/plan/button/SavePlanAsImageButton";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { PlanEditorDialog } from "src/view/plan/edit/PlanEditorDialog";
import { PlaceMap } from "src/view/plan/PlaceMap";
import {
    FooterHeight,
    PlanCandidateFooter,
} from "src/view/plan/PlanCandidateFooter";
import { PlanPageSection } from "src/view/plan/PlanPageSection";
import { PlanPlaceList } from "src/view/plan/PlanPlaceList";
import { PlanSchedule } from "src/view/plan/PlanSchedule";
import { PlanDuration } from "src/view/plan/PlanSummaryItem";

const PlanDetail = () => {
    const router = useRouter();
    const { sessionId, planId } = router.query;
    const dispatch = useAppDispatch();
    const { getCurrentLocation, location: currentLocation } = useLocation();

    // TODO: DELETE ME
    const [places, setPlaces] = useState<Place[]>(null);

    const [isEditingPlan, setIsEditingPlan] = useState(false);
    const {
        preview: plan,
        createdBasedOnCurrentLocation,
        createPlanSession,
        savePlanFromCandidateRequestStatus,
    } = reduxPlanCandidateSelector();

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

    // TODO: DELETE ME
    useEffect(() => {
        if (!plan) return;
        setPlaces(plan.places);
    }, [plan]);

    // プランが保存され次第、ページ遷移を行う
    useEffect(() => {
        if (!plan) return;
        if (savePlanFromCandidateRequestStatus === RequestStatuses.FULFILLED) {
            router.push(Routes.plans.plan(plan.id));
        }
    }, [planId, savePlanFromCandidateRequestStatus]);

    const handleOnSavePlan = ({
        session,
        plan,
    }: {
        session: string;
        plan: Plan;
    }) => {
        dispatch(savePlanFromCandidate({ session, planId: plan.id }));
    };

    if (!plan) return <LoadingModal title="素敵なプランを読み込んでいます" />;

    return (
        <>
            <Center flexDirection="column" pb={`${FooterHeight}px`}>
                <NavBar title={plan.title} />
                <VStack
                    maxWidth="990px"
                    w="100%"
                    px="0"
                    py="16px"
                    boxSizing="border-box"
                >
                    <Box w="100%" px="8px">
                        <PlanPlaceList
                            plan={plan}
                            createdBasedOnCurrentLocation={
                                createdBasedOnCurrentLocation
                            }
                        />
                    </Box>
                    <AdInArticle
                        adSlot={
                            process.env.ADSENSE_SLOT_INARTICLE_PLAN_CANDIDATE
                        }
                    />
                    <VStack p="16px" w="100%" alignItems="flex-start">
                        <PlanDuration durationInMinutes={plan.timeInMinutes} />
                    </VStack>
                    <PlanPageSection title="スケジュール" accordion>
                        <PlanSchedule
                            plan={plan}
                            startFromCurrentLocation={
                                createdBasedOnCurrentLocation
                            }
                        />
                    </PlanPageSection>
                    <VStack w="100%" p="16px">
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
            <PlanCandidateFooter
                onSave={() =>
                    handleOnSavePlan({ session: createPlanSession, plan })
                }
                onEdit={() => setIsEditingPlan(true)}
            />
            {
                // TODO: productionでも利用できるようにする
                process.env.NODE_ENV !== "production" && (
                    <PlanEditorDialog
                        visible={isEditingPlan}
                        onClosed={() => setIsEditingPlan(false)}
                        places={places ?? []}
                        onReorderPlaces={(places) =>
                            setPlaces(copyObject(places))
                        }
                    />
                )
            }
        </>
    );
};

export default PlanDetail;
