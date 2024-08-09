import { Colors } from "src/constant/color";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { isPC } from "src/constant/userAgent";
import { getPlanPriceRange } from "src/domain/models/Plan";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { usePlaceLikeInPlanCandidate } from "src/hooks/usePlaceLikeInPlanCandidate";
import { usePlanCandidate } from "src/hooks/usePlanCandidate";
import { usePlanPlaceAdd } from "src/hooks/usePlanPlaceAdd";
import { usePlanPlaceDelete } from "src/hooks/usePlanPlaceDelete";
import { usePlanPlaceReorder } from "src/hooks/usePlanPlaceReorder";
import { usePlanPlaceReplace } from "src/hooks/usePlanPlaceReplace";
import { usePlanSave } from "src/hooks/usePlanSave";
import { AdInPlanDetail } from "src/view/ad/AdInPlanDetail";
import { HorizontalScrollableList } from "src/view/common/HorizontalScrollableList";
import { LoadingModal } from "src/view/common/LoadingModal";
import { RoundedButton } from "src/view/common/RoundedButton";
import { SectionTitle } from "src/view/common/SectionTitle";
import { PlaceCard } from "src/view/place/PlaceCard";
import { PlaceMap } from "src/view/plan/PlaceMap";
import { PlanFooter } from "src/view/plan/PlanFooter";
import { SavePlanAsImageButton } from "src/view/plan/button/SavePlanAsImageButton";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { DialogAddPlace } from "src/view/plancandidate/DialogAddPlace";
import { DialogDeletePlace } from "src/view/plancandidate/DialogDeletePlace";
import { DialogReplacePlace } from "src/view/plancandidate/DialogReplacePlace";
import { ReorderablePlaceDialog } from "src/view/plancandidate/ReorderablePlaceList";
import { CreatePlanDialog } from "src/view/plandetail/CreatePlanDialog";
import { PlanInfoSection } from "src/view/plandetail/PlanInfoSection";
import { PlanPlaceList } from "src/view/plandetail/PlanPlaceList";
import { PlanDetailPageHeader } from "src/view/plandetail/header/PlanDetailPageHeader";
import { PlanListSectionTitleCreatePlanFromOtherLocation } from "src/view/top/PlanListSectionTitle";
import { isWeb, YStack } from "tamagui";

// TODO: Nativeもこれを利用する
export function PlanDetailPage({
    planId,
    planCandidateSetId,
    isPlanFooterVisible,
    onCreatePlan,
}: {
    planId: string | null;
    planCandidateSetId: string;
    isPlanFooterVisible: boolean;
    onCreatePlan?: () => void;
}) {
    const { t } = useAppTranslation();

    const {
        plan,
        currentLocation,
        createdBasedOnCurrentLocation,
        destinationPlacesForPlanCandidate,
        placeToCreatePlan,
        onSelectDestinationPlace,
        onCloseCreatePlanFromPlace,
        onCreatePlanFromPlace,
    } = usePlanCandidate({
        planId: planId,
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
        planCandidateId: planCandidateSetId,
        planId: planId,
    });

    const {
        placesReordered,
        isReorderDialogVisible,
        showReorderDialog,
        closeReorderDialog,
        handleOnReorderPlaces,
        handleOptimizeRoute,
    } = usePlanPlaceReorder({ planId });

    const {
        deletePlaceFromPlan,
        showDialogToDelete,
        closeDialogToDelete,
        isDialogToDeletePlaceVisible,
        isDeletingPlace,
        placeToDelete,
    } = usePlanPlaceDelete({
        planCandidateId: planCandidateSetId,
        planId: planId,
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
        planCandidateId: planCandidateSetId,
        planId: planId,
    });

    const { likedPlaceIdsInPlanCandidate, updateLikeAtPlace } =
        usePlaceLikeInPlanCandidate();

    const { savePlan, isSavingPlan } = usePlanSave({
        planCandidateSetId: planCandidateSetId,
        planId: planId,
    });

    const planDetailHeaderHeight = () => {
        if (isWeb) {
            if (isPC) return;
            return `calc(100vh - ${Size.PlanFooter.h + "px"})`;
        }
    };

    if (isSavingPlan) {
        return <LoadingModal title={t("plan:savePlanInProgressTitle")} />;
    }

    if (!plan || !planId) {
        return <></>;
    }

    return (
        <>
            <YStack
                w="100%"
                pb={Size.PlanFooter.h}
                alignItems="center"
                justifyContent="center"
            >
                <YStack w="100%" minHeight={planDetailHeaderHeight()}>
                    <PlanDetailPageHeader
                        plan={plan}
                        likedPlaceIds={likedPlaceIdsInPlanCandidate}
                        onUpdateLikePlace={(placeId, isLiked) =>
                            updateLikeAtPlace({ placeId, like: isLiked })
                        }
                    />
                </YStack>
                <YStack
                    maxWidth={Size.mainContentWidth}
                    w="100%"
                    px={0}
                    py={Padding.p16}
                    gap={Padding.p16}
                >
                    <PlanPageSection
                        sectionHeader={
                            <SectionTitle
                                title={t("plan:planInfo")}
                                px={Size.PlanDetail.px}
                            />
                        }
                    >
                        <YStack>
                            <PlanInfoSection
                                durationInMinutes={plan.timeInMinutes}
                                priceRange={getPlanPriceRange(plan.places)}
                            />
                            <AdInPlanDetail />
                        </YStack>
                    </PlanPageSection>
                    <PlanPageSection
                        sectionHeader={
                            <SectionTitle
                                title={t("plan:plan")}
                                px={Size.PlanDetail.px}
                            />
                        }
                    >
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
                        sectionHeader={
                            <SectionTitle
                                title={t("plan:placesInPlan")}
                                description={t(
                                    "plan:clickMarkerToShowPlaceDetail"
                                )}
                                px={Size.PlanDetail.px}
                            />
                        }
                    >
                        <PlaceMap places={plan.places} />
                    </PlanPageSection>
                    <YStack w="100%" p={Padding.p16}>
                        <SavePlanAsImageButton plan={plan} />
                        <SearchRouteByGoogleMapButton
                            plan={plan}
                            currentLocation={currentLocation}
                            createdBasedOnCurrentLocation={
                                createdBasedOnCurrentLocation
                            }
                        />
                    </YStack>
                    {destinationPlacesForPlanCandidate?.length > 0 && (
                        <PlanPageSection
                            contentPaddingX={0}
                            sectionHeader={
                                <PlanListSectionTitleCreatePlanFromOtherLocation />
                            }
                        >
                            <HorizontalScrollableList px={Size.PlanDetail.px}>
                                {destinationPlacesForPlanCandidate.map(
                                    (place, index) => (
                                        <PlaceCard
                                            key={index}
                                            place={place}
                                            onClick={() =>
                                                onSelectDestinationPlace(
                                                    place.id
                                                )
                                            }
                                        />
                                    )
                                )}
                            </HorizontalScrollableList>
                        </PlanPageSection>
                    )}
                </YStack>
            </YStack>
            <PlanFooter visible={isPlanFooterVisible}>
                <RoundedButton
                    flex={1}
                    outlined
                    color={Colors.primary[400]}
                    label={t("plan:reorderPlaces")}
                    onClick={() => showReorderDialog()}
                />
                <RoundedButton
                    flex={1}
                    color="#BF756E"
                    label={t("plan:saveThisPlan")}
                    onClick={() => savePlan({ planId: plan.id })}
                />
            </PlanFooter>
            {/*Dialog*/}
            <CreatePlanDialog
                place={placeToCreatePlan}
                onClickClose={() => onCloseCreatePlanFromPlace()}
                onClickCreatePlan={(place) => {
                    onCreatePlanFromPlace({
                        planCandidateSetId: planCandidateSetId,
                        placeId: place.id,
                    });
                    onCreatePlan?.();
                }}
            />
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
            <ReorderablePlaceDialog
                visible={isReorderDialogVisible}
                places={placesReordered}
                transitions={plan.transitions}
                onReorderPlaces={(places) =>
                    handleOnReorderPlaces({
                        placeIds: places.map((p) => p.id),
                        planCandidateSetId,
                        planId,
                    })
                }
                onAutoReorderPlaces={() =>
                    handleOptimizeRoute({
                        planCandidateSetId,
                        planId,
                    })
                }
                onClose={closeReorderDialog}
            />
        </>
    );
}
