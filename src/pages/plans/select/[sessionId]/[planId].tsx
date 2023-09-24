import { Box, Center, VStack } from "@chakra-ui/react";
import { getAuth } from "@firebase/auth";
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
    resetPlanCandidates,
    savePlanFromCandidate,
    updatePlacesOrderInPlanCandidate,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { AdInArticle } from "src/view/ad/AdInArticle";
import { ErrorPage } from "src/view/common/ErrorPage";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { NotFound } from "src/view/common/NotFound";
import { Routes } from "src/view/constants/router";
import { useLocation } from "src/view/hooks/useLocation";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { PlanEditorDialog } from "src/view/plan/edit/PlanEditorDialog";
import { PlaceMap } from "src/view/plan/PlaceMap";
import {
    FooterHeight,
    PlanCandidateFooter,
} from "src/view/plan/PlanCandidateFooter";
import { PlanPlaceList } from "src/view/plan/PlanPlaceList";
import { PlanSchedule } from "src/view/plan/PlanSchedule";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { PlanPageSectionSummary } from "src/view/plan/section/PlanPageSectionSummary";
import {PlanPageThumbnail} from "src/view/plan/PlanPageThumbnail";

const PlanDetail = () => {
    const router = useRouter();
    const { sessionId, planId } = router.query;
    const dispatch = useAppDispatch();
    const { getCurrentLocation, location: currentLocation } = useLocation();

    const [isEditingPlan, setIsEditingPlan] = useState(false);
    const {
        preview: plan,
        createdBasedOnCurrentLocation,
        createPlanSession,
        savePlanFromCandidateRequestStatus,
        fetchCachedCreatedPlansRequestStatus,
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

    // プランが保存され次第、ページ遷移を行う
    useEffect(() => {
        if (!plan) return;
        if (savePlanFromCandidateRequestStatus === RequestStatuses.FULFILLED) {
            router.push(Routes.plans.plan(plan.id)).then();
            // 戻ったときに再リダイレクトされないようにする
            dispatch(resetPlanCandidates());
        }
    }, [planId, savePlanFromCandidateRequestStatus]);

    const handleOnSavePlan = async ({
        session,
        plan,
    }: {
        session: string;
        plan: Plan;
    }) => {
        const auth = getAuth();
        const authToken = await auth.currentUser?.getIdToken(true);
        dispatch(
            savePlanFromCandidate({ session, planId: plan.id, authToken })
        );
    };

    const handleOnReorderPlaces = ({
        session,
        places,
    }: {
        session: string;
        places: Place[];
    }) => {
        dispatch(
            updatePlacesOrderInPlanCandidate({
                session,
                planId: plan.id,
                placeIds: places.map((place) => place.id),
            })
        );
    };

    if (!plan) {
        // プラン候補取得失敗
        if (fetchCachedCreatedPlansRequestStatus === RequestStatuses.REJECTED)
            return <ErrorPage />;

        // プラン候補が存在しない
        if (fetchCachedCreatedPlansRequestStatus === RequestStatuses.FULFILLED)
            return <NotFound />;

        return <LoadingModal title="素敵なプランを読み込んでいます" />;
    }

    return (
        <>
            <Center flexDirection="column" pb={`${FooterHeight}px`}>
                <NavBar />
                <VStack
                    maxWidth="990px"
                    w="100%"
                    px="0"
                    py="16px"
                    spacing="16px"
                    boxSizing="border-box"
                >
                    <PlanPageThumbnail plan={plan} />
                    <PlanPageSectionSummary
                        planDurationInMinutes={plan.timeInMinutes}
                    />
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
                    <PlanPageSection title="スケジュール" accordion>
                        <PlanSchedule
                            plan={plan}
                            startFromCurrentLocation={
                                createdBasedOnCurrentLocation
                            }
                        />
                    </PlanPageSection>
                    <PlanPageSection title="プラン内の場所">
                        <PlaceMap places={plan.places} />
                    </PlanPageSection>
                    <VStack w="100%" p="16px">
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
                process.env.APP_ENV !== "production" && (
                    <PlanEditorDialog
                        visible={isEditingPlan}
                        onClosed={() => setIsEditingPlan(false)}
                        places={copyObject(plan.places)}
                        onSave={(places) =>
                            handleOnReorderPlaces({
                                session: createPlanSession,
                                places,
                            })
                        }
                    />
                )
            }
        </>
    );
};

export default PlanDetail;
