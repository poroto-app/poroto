import { Link } from "@chakra-ui/next-js";
import { Box, Button, Center, VStack } from "@chakra-ui/react";
import { getAuth } from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getPlanPriceRange, Plan } from "src/domain/models/Plan";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { setShowPlanCreatedModal } from "src/redux/plan";
import {
    fetchCachedCreatedPlans,
    fetchPlanDetail,
    reduxPlanCandidateSelector,
    resetPlanCandidates,
    savePlanFromCandidate,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { AdInArticle } from "src/view/ad/AdInArticle";
import { ErrorPage } from "src/view/common/ErrorPage";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { NotFound } from "src/view/common/NotFound";
import { Colors } from "src/view/constants/color";
import { Routes } from "src/view/constants/router";
import { useLocation } from "src/view/hooks/useLocation";
import { usePlanPlaceDelete } from "src/view/hooks/usePlanPlaceDelete";
import { usePlanPlaceReplace } from "src/view/hooks/usePlanPlaceReplace";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { PlaceMap } from "src/view/plan/PlaceMap";
import { FooterHeight, PlanFooter } from "src/view/plan/PlanFooter";
import { PlanPageThumbnail } from "src/view/plan/PlanPageThumbnail";
import { PlanSchedule } from "src/view/plan/PlanSchedule";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { PlanPageSectionSummary } from "src/view/plan/section/PlanPageSectionSummary";
import { DialogDeletePlace } from "src/view/plancandidate/DialogDeletePlace";
import { DialogReplacePlace } from "src/view/plancandidate/DialogReplacePlace";
import { PlanPlaceList } from "src/view/plandetail/PlanPlaceList";

const PlanDetail = () => {
    const router = useRouter();
    const { sessionId, planId } = router.query;
    const dispatch = useAppDispatch();
    const { getCurrentLocation, location: currentLocation } = useLocation();

    const {
        showRelatedPlaces,
        onCloseDialogRelatedPlaces,
        replacePlace,
        placeIdToReplace,
        placesToReplace,
        isReplacingPlace,
        isDialogRelatedPlacesVisible,
    } = usePlanPlaceReplace({
        planCandidateId: sessionId as string,
        planId: planId as string,
    });

    const {
        deletePlaceFromPlan,
        showDialogToDelete,
        closeDialogToDelete,
        isDialogToDeletePlaceVisible,
        isDeletingPlace,
        placeToDelete,
    } = usePlanPlaceDelete({
        planCandidateId: sessionId as string,
        planId: planId as string,
    });
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
            dispatch(setShowPlanCreatedModal(true));
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
                <NavBar canGoBack />
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
                        planRange={getPlanPriceRange(plan.places)}
                    />
                    <Box w="100%" px="20px">
                        <PlanPlaceList
                            plan={plan}
                            createdBasedOnCurrentLocation={
                                createdBasedOnCurrentLocation
                            }
                            onClickShowRelatedPlaces={(placeId) =>
                                showRelatedPlaces(placeId)
                            }
                            onClickDeletePlace={(placeId) =>
                                showDialogToDelete({ placeIdToDelete: placeId })
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
            <PlanFooter>
                <Link
                    href={Routes.plans.planCandidate.edit(
                        createPlanSession,
                        plan.id
                    )}
                    flex={1}
                >
                    <Button
                        variant="outline"
                        w="100%"
                        borderColor={Colors.primary["400"]}
                        color={Colors.primary["400"]}
                        borderRadius={10}
                        borderWidth="2px"
                    >
                        編集
                    </Button>
                </Link>
                <Button
                    variant="solid"
                    flex={1}
                    color="white"
                    backgroundColor={Colors.primary["400"]}
                    borderRadius={10}
                    onClick={() =>
                        handleOnSavePlan({ session: createPlanSession, plan })
                    }
                >
                    しおりとして保存
                </Button>
            </PlanFooter>
            {/*Dialog*/}
            <DialogReplacePlace
                placesInPlan={plan.places}
                placesToReplace={placesToReplace}
                placeIdToBeReplaced={placeIdToReplace}
                isReplacingPlace={isReplacingPlace}
                isDialogVisible={isDialogRelatedPlacesVisible}
                onReplacePlace={({ placeIdToDeleted, placeIdToAdd }) =>
                    replacePlace({
                        placeIdToDelete: placeIdToDeleted,
                        placeIdToAdd: placeIdToAdd,
                    })
                }
                onCloseDialog={onCloseDialogRelatedPlaces}
            />
            <DialogDeletePlace
                placeToDelete={placeToDelete}
                isDialogVisible={isDialogToDeletePlaceVisible}
                isDeleting={isDeletingPlace}
                onDelete={deletePlaceFromPlan}
                onClose={closeDialogToDelete}
            />
        </>
    );
};

export default PlanDetail;
