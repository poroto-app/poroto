import { Button, Center, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getPlanPriceRange } from "src/domain/models/Plan";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { reduxAuthSelector } from "src/redux/auth";
import {
    autoReorderPlacesInPlanCandidate,
    fetchCachedCreatedPlans,
    reduxPlanCandidateSelector,
    updatePreviewPlanId,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { AdInPlanDetail } from "src/view/ad/AdInPlanDetail";
import { ErrorPage } from "src/view/common/ErrorPage";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { NotFound } from "src/view/common/NotFound";
import { Colors } from "src/view/constants/color";
import { Routes } from "src/view/constants/router";
import { Size } from "src/view/constants/size";
import { isPC } from "src/view/constants/userAgent";
import { useLocation } from "src/view/hooks/useLocation";
import { usePlaceLikeInPlanCandidate } from "src/view/hooks/usePlaceLikeInPlanCandidate";
import { usePlanCreate } from "src/view/hooks/usePlanCreate";
import { usePlanPlaceAdd } from "src/view/hooks/usePlanPlaceAdd";
import { usePlanPlaceDelete } from "src/view/hooks/usePlanPlaceDelete";
import { usePlanPlaceReplace } from "src/view/hooks/usePlanPlaceReplace";
import useUploadImage from "src/view/hooks/useUploadImage";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { PlaceMap } from "src/view/plan/PlaceMap";
import { FooterHeight, PlanFooter } from "src/view/plan/PlanFooter";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { DialogAddPlace } from "src/view/plancandidate/DialogAddPlace";
import { DialogDeletePlace } from "src/view/plancandidate/DialogDeletePlace";
import { DialogReplacePlace } from "src/view/plancandidate/DialogReplacePlace";
import { PlanDetailPageHeader } from "src/view/plandetail/header/PlanDetailPageHeader";
import { PlanInfoSection } from "src/view/plandetail/PlanInfoSection";
import { PlanPlaceList } from "src/view/plandetail/PlanPlaceList";

const PlanDetail = () => {
    const router = useRouter();
    const { sessionId, planId } = router.query;
    const dispatch = useAppDispatch();
    const { getCurrentLocation, location: currentLocation } = useLocation();
    const { user, firebaseIdToken } = reduxAuthSelector();
    const uploadImageProps = useUploadImage();

    const { createPlan, savePlanFromCandidateRequestStatus } = usePlanCreate({
        planCandidateSetId: sessionId as string,
        planId: planId as string,
    });

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
        addPlaceToPlan,
        showPlacesToAdd,
        onCloseDialogToAddPlace,
        basePlaceIdToAdd,
        isDialogToAddPlaceVisible,
        placesToAdd,
        isAddingPlace,
    } = usePlanPlaceAdd({
        planCandidateId: sessionId as string,
        planId: planId as string,
    });

    const { likedPlaceIdsInPlanCandidate, updateLikeAtPlace } =
        usePlaceLikeInPlanCandidate();

    const {
        preview: plan,
        createdBasedOnCurrentLocation,
        createPlanSession,
        fetchCachedCreatedPlansRequestStatus,
    } = reduxPlanCandidateSelector();

    useEffect(() => {
        if (!currentLocation) getCurrentLocation().then();
    }, [currentLocation]);

    useEffect(() => {
        if (!sessionId || typeof sessionId !== "string") {
            return;
        }

        // プラン候補のキャッシュが存在しない場合は取得する
        if (!plan) {
            dispatch(
                fetchCachedCreatedPlans({
                    session: sessionId,
                    userId: user?.id,
                    firebaseIdToken,
                })
            );
        }
    }, [sessionId, plan?.id]);

    useEffect(() => {
        if (!sessionId || typeof sessionId !== "string") {
            return;
        }

        // ログイン状態が変化したら、必ずプラン候補を取得する
        dispatch(
            fetchCachedCreatedPlans({
                session: sessionId,
                userId: user?.id,
                firebaseIdToken,
            })
        );
    }, [planId, user?.id, firebaseIdToken]);

    // プランの詳細を取得する
    useEffect(() => {
        if (!createPlanSession) return;
        if (planId && typeof planId === "string") {
            dispatch(updatePreviewPlanId({ planId }));
        }
    }, [planId, createPlanSession]);

    const handleOptimizeRoute = ({
        planCandidateId,
        planId,
    }: {
        planCandidateId: string;
        planId: string;
    }): void => {
        dispatch(autoReorderPlacesInPlanCandidate({ planId, planCandidateId }));
    };

    if (savePlanFromCandidateRequestStatus === RequestStatuses.PENDING) {
        return <LoadingModal title="プランを作成しています" />;
    }

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
                <NavBar
                    canGoBack
                    defaultPath={Routes.plans.planCandidate.index(
                        sessionId as string
                    )}
                />
                <VStack
                    w="100%"
                    minH={
                        !isPC &&
                        `calc(100vh - ${Size.NavBar.height} - ${FooterHeight}px)`
                    }
                >
                    <PlanDetailPageHeader
                        plan={plan}
                        likedPlaceIds={likedPlaceIdsInPlanCandidate}
                        onUpdateLikePlace={(placeId, isLiked) =>
                            updateLikeAtPlace({ placeId, like: isLiked })
                        }
                    />
                </VStack>
                <VStack
                    maxWidth="990px"
                    w="100%"
                    px="0"
                    py="16px"
                    spacing="16px"
                    boxSizing="border-box"
                >
                    <PlanPageSection title="プランの情報">
                        <VStack>
                            <PlanInfoSection
                                durationInMinutes={plan.timeInMinutes}
                                priceRange={getPlanPriceRange(plan.places)}
                            />
                            <AdInPlanDetail />
                        </VStack>
                    </PlanPageSection>
                    <PlanPageSection title="プラン">
                        <PlanPlaceList
                            plan={plan}
                            likePlaceIds={likedPlaceIdsInPlanCandidate}
                            createdBasedOnCurrentLocation={
                                createdBasedOnCurrentLocation
                            }
                            uploadPlaceImage={uploadImageProps}
                            onClickAddPlace={({ previousPlaceId }) =>
                                showPlacesToAdd({
                                    basePlaceIdToAdd: previousPlaceId,
                                })
                            }
                            onClickShowRelatedPlaces={(placeId) =>
                                showRelatedPlaces(placeId)
                            }
                            onClickDeletePlace={(placeId) =>
                                showDialogToDelete({ placeIdToDelete: placeId })
                            }
                            onUpdateLikeAtPlace={updateLikeAtPlace}
                        />
                    </PlanPageSection>
                    <PlanPageSection
                        title="プラン内の場所"
                        description="マーカーをクリックすると場所の詳細が表示されます"
                    >
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
                <Button
                    variant="solid"
                    flex={1}
                    color="white"
                    backgroundColor={Colors.primary["400"]}
                    borderRadius={10}
                    onClick={() =>
                        handleOptimizeRoute({
                            planCandidateId: sessionId as string,
                            planId: planId as string,
                        })
                    }
                >
                    歩く距離を最短にする
                </Button>
                <Button
                    variant="solid"
                    flex={1}
                    color="white"
                    backgroundColor={Colors.primary["400"]}
                    borderRadius={10}
                    onClick={() => createPlan({ planId: plan.id })}
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
            <DialogAddPlace
                placesRecommended={placesToAdd?.placesRecommend}
                placesWithCategories={placesToAdd?.placesGroupedByCategories}
                isDialogVisible={isDialogToAddPlaceVisible}
                isAddingPlace={isAddingPlace}
                onAddPlaceToPlan={({ placeIdToAdd }) =>
                    basePlaceIdToAdd &&
                    addPlaceToPlan({
                        placeIdToAdd,
                        previousPlaceId: basePlaceIdToAdd,
                    })
                }
                onCloseDialog={onCloseDialogToAddPlace}
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
