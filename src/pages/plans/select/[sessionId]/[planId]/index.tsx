import { Button, Center, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getPlanPriceRange } from "src/domain/models/Plan";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { AdInPlanDetail } from "src/view/ad/AdInPlanDetail";
import { ErrorPage } from "src/view/common/ErrorPage";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { NotFound } from "src/view/common/NotFound";
import { Colors } from "src/view/constants/color";
import { Routes } from "src/view/constants/router";
import { Size } from "src/view/constants/size";
import { isPC } from "src/view/constants/userAgent";
import { usePlaceLikeInPlanCandidate } from "src/view/hooks/usePlaceLikeInPlanCandidate";
import { usePlanCandidate } from "src/view/hooks/usePlanCandidate";
import { usePlanCreate } from "src/view/hooks/usePlanCreate";
import { usePlanPlaceAdd } from "src/view/hooks/usePlanPlaceAdd";
import { usePlanPlaceDelete } from "src/view/hooks/usePlanPlaceDelete";
import { usePlanPlaceReorder } from "src/view/hooks/usePlanPlaceReorder";
import { usePlanPlaceReplace } from "src/view/hooks/usePlanPlaceReplace";
import { PlaceMap } from "src/view/plan/PlaceMap";
import { FooterHeight, PlanFooter } from "src/view/plan/PlanFooter";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { DialogAddPlace } from "src/view/plancandidate/DialogAddPlace";
import { DialogDeletePlace } from "src/view/plancandidate/DialogDeletePlace";
import { DialogReplacePlace } from "src/view/plancandidate/DialogReplacePlace";
import { PlanInfoSection } from "src/view/plandetail/PlanInfoSection";
import { PlanPlaceList } from "src/view/plandetail/PlanPlaceList";
import { PlanDetailPageHeader } from "src/view/plandetail/header/PlanDetailPageHeader";

const PlanDetail = () => {
    const router = useRouter();
    const { sessionId, planId } = router.query;

    const { createPlan, savePlanFromCandidateRequestStatus } = usePlanCreate({
        planCandidateSetId: sessionId as string,
        planId: planId as string,
    });

    const {
        plan,
        currentLocation,
        createdBasedOnCurrentLocation,
        fetchCachedCreatedPlansRequestStatus,
    } = usePlanCandidate({
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

    const { handleOptimizeRoute } = usePlanPlaceReorder();

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
                transitions={placesToAdd?.transitions}
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
