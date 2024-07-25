import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRef, useState } from "react";
import { MdOutlineNearMe } from "react-icons/md";
import { createParam } from "solito";
import { useRouter } from "solito/router";
import { Colors } from "src/constant/color";
import { Size } from "src/constant/size";
import { isPC } from "src/constant/userAgent";
import { getPlanPriceRange } from "src/domain/models/Plan";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { hasValue } from "src/domain/util/null";
import { usePlaceLikeInPlanCandidate } from "src/hooks/usePlaceLikeInPlanCandidate";
import { usePlanCandidate } from "src/hooks/usePlanCandidate";
import { usePlanCandidateGalleryPageAutoScroll } from "src/hooks/usePlanCandidateGalleryPageAutoScroll";
import { usePlanCandidateSet } from "src/hooks/usePlanCandidateSet";
import { usePlanCreate } from "src/hooks/usePlanCreate";
import { usePlanPlaceAdd } from "src/hooks/usePlanPlaceAdd";
import { usePlanPlaceDelete } from "src/hooks/usePlanPlaceDelete";
import { usePlanPlaceReorder } from "src/hooks/usePlanPlaceReorder";
import { usePlanPlaceReplace } from "src/hooks/usePlanPlaceReplace";
import { resetCreatePlanFromPlaceRequestStatus } from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { AdInPlanDetail } from "src/view/ad/AdInPlanDetail";
import EmptyIcon from "src/view/assets/svg/empty.svg";
import { ButtonWithBlur } from "src/view/common/ButtonWithBlur";
import { ErrorPage } from "src/view/common/ErrorPage";
import { HorizontalScrollableList } from "src/view/common/HorizontalScrollableList";
import { Layout } from "src/view/common/Layout";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NotFound } from "src/view/common/NotFound";
import { SectionTitle } from "src/view/common/SectionTitle";
import { NavBar } from "src/view/navigation/NavBar";
import { PlaceCard } from "src/view/place/PlaceCard";
import { PlaceMap } from "src/view/plan/PlaceMap";
import { PlanFooter } from "src/view/plan/PlanFooter";
import { SavePlanAsImageButton } from "src/view/plan/button/SavePlanAsImageButton";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { AvailablePlaceSection } from "src/view/plan/candidate/AvailablePlaceSection";
import { GeneratingPlanDialog } from "src/view/plan/candidate/GeneratingPlanDialog";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { DialogAddPlace } from "src/view/plancandidate/DialogAddPlace";
import { DialogDeletePlace } from "src/view/plancandidate/DialogDeletePlace";
import { DialogReplacePlace } from "src/view/plancandidate/DialogReplacePlace";
import { PlanCandidatesGallery } from "src/view/plancandidate/PlanCandidatesGallery";
import { ReorderablePlaceDialog } from "src/view/plancandidate/ReorderablePlaceList";
import { CreatePlanDialog } from "src/view/plandetail/CreatePlanDialog";
import { PlanInfoSection } from "src/view/plandetail/PlanInfoSection";
import { PlanPlaceList } from "src/view/plandetail/PlanPlaceList";
import { PlanDetailPageHeader } from "src/view/plandetail/header/PlanDetailPageHeader";
import { PlanListSectionTitle } from "src/view/top/PlanListSectionTitle";

const { useParams } = createParam<{ sessionId?: string }>();

const SelectPlanPage = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const router = useRouter();
    const { sessionId } = useParams().params;
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
    const refPlanCandidateGallery = useRef<HTMLDivElement>(null);
    const {
        plansCreated,
        placesAvailableForPlan,
        isCreatingPlan,
        createPlanFromPlaceRequestStatus,
        createPlanFromLocationRequestStatus,
        fetchAvailablePlacesForPlanRequestStatus,
        fetchCachedCreatedPlansRequestStatus,
        createPlanCandidateFromPlace,
    } = usePlanCandidateSet({
        planCandidateSetId: sessionId as string,
        onCreatedPlanFromPlace: ({ plansCreated }) => {
            // プラン作成完了後、ページトップに移動し、作成されたプランを中央に表示
            setSelectedPlanIndex(plansCreated.length - 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
    });
    const { isPlanFooterVisible, planDetailPageRef, scrollToPlanDetailPage } =
        usePlanCandidateGalleryPageAutoScroll({
            planCandidateId: sessionId as string,
            // うまく動作しないことが多いので、一時的に JS によるスクロールスナップを行わない
            isScrollSnapEnabled: false,
        });

    const currentPlanId =
        hasValue(selectedPlanIndex) &&
        hasValue(plansCreated) &&
        plansCreated.length > selectedPlanIndex
            ? plansCreated[selectedPlanIndex].id
            : null;

    const handleOnCreatePlan = () => {
        // トップまでスクロール(1sスリープ)
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 200);

        // プラン作成中は最後のプランにフォーカスをさせる
        if (plansCreated?.length > 0) {
            setSelectedPlanIndex(plansCreated.length - 1);
        }
    };

    if (!plansCreated) {
        // ページ読み込み直後
        const isLoadingPlan =
            !fetchCachedCreatedPlansRequestStatus &&
            !createPlanFromLocationRequestStatus;
        // プラン作成中
        const isCreatingPlanFromLocation =
            createPlanFromLocationRequestStatus === RequestStatuses.PENDING;
        // プラン候補取得中
        const isFetchingPlanCandidate =
            fetchCachedCreatedPlansRequestStatus === RequestStatuses.PENDING;

        if (
            isLoadingPlan ||
            isCreatingPlanFromLocation ||
            isFetchingPlanCandidate
        )
            return <LoadingModal title={t("plan:createPlanInProgressTitle")} />;

        // プラン候補取得失敗
        if (fetchCachedCreatedPlansRequestStatus === RequestStatuses.REJECTED)
            return <ErrorPage />;

        // プラン候補が存在しない
        return <NotFound />;
    }

    // プラン生成に失敗した場合、他の場所からプランを作成できるようにする
    if (plansCreated.length === 0)
        return (
            <Layout navBar={<NavBar />}>
                <GeneratingPlanDialog
                    visible={[
                        RequestStatuses.PENDING,
                        RequestStatuses.REJECTED,
                    ].includes(createPlanFromPlaceRequestStatus)}
                    onClose={() =>
                        dispatch(resetCreatePlanFromPlaceRequestStatus())
                    }
                    failed={
                        createPlanFromPlaceRequestStatus ===
                        RequestStatuses.REJECTED
                    }
                />
                <VStack pb="48px" px="16px" w="100%">
                    <VStack py="100px" spacing="32px">
                        <Box w="100%" maxW="300px">
                            <EmptyIcon
                                viewBox="0 0 862.70323 644.78592"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </Box>
                        <VStack spacing="8px">
                            <Text fontSize="1.2rem" fontWeight="bold">
                                {t("plan:createPlanFailedTitle")}
                            </Text>
                            <Text>{t("plan:createPlanFailedDescription")}</Text>
                        </VStack>
                    </VStack>
                    <AvailablePlaceSection
                        places={placesAvailableForPlan}
                        isFetching={
                            fetchAvailablePlacesForPlanRequestStatus ===
                            RequestStatuses.PENDING
                        }
                        onClickPlace={(placeId) =>
                            createPlanCandidateFromPlace({ placeId })
                        }
                    />
                </VStack>
            </Layout>
        );

    return (
        <VStack w="100%" spacing={0}>
            <NavBar />
            <Center
                w="100%"
                h={`calc(100vh - ${Size.NavBar.height + "px"})`}
                px="16px"
                ref={refPlanCandidateGallery}
                overflowX="hidden"
            >
                <VStack spacing="32px">
                    <PlanCandidatesGallery
                        planCandidates={plansCreated}
                        activePlanIndex={selectedPlanIndex}
                        isCreating={isCreatingPlan}
                        onActiveIndexChange={setSelectedPlanIndex}
                    />
                    <ButtonWithBlur
                        px="16px"
                        py="16px"
                        backgroundColor="#84A6FF"
                        borderRadius="50px"
                        onClick={scrollToPlanDetailPage}
                    >
                        <Text color="white" fontWeight="bold" fontSize="18px">
                            {t("plan:showPlan")}
                        </Text>
                    </ButtonWithBlur>
                </VStack>
            </Center>
            <Box w="100%" overflowX="hidden" ref={planDetailPageRef}>
                <PlanDetailPage
                    planId={currentPlanId}
                    planCandidateSetId={sessionId as string}
                    isPlanFooterVisible={isPlanFooterVisible}
                    onCreatePlan={() => handleOnCreatePlan()}
                />
            </Box>
        </VStack>
    );
};

type Props = {
    planId: string | null;
    planCandidateSetId: string;
    isPlanFooterVisible: boolean;
    onCreatePlan?: () => void;
};

function PlanDetailPage({
    planId,
    planCandidateSetId,
    isPlanFooterVisible,
    onCreatePlan,
}: Props) {
    const { t } = useTranslation();
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

    const { createPlan, isCreatingPlan } = usePlanCreate({
        planCandidateSetId: planCandidateSetId,
        planId: planId,
    });

    if (isCreatingPlan) {
        return <LoadingModal title={t("plan:createPlanInProgressTitle")} />;
    }

    if (!plan || !planId) {
        return <></>;
    }

    return (
        <>
            <Center
                w="100%"
                flexDirection="column"
                pb={Size.PlanFooter.h + "px"}
            >
                <VStack
                    w="100%"
                    minH={!isPC && `calc(100vh - ${Size.PlanFooter.h + "px"})`}
                    scrollSnapAlign="start"
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
                    <PlanPageSection
                        sectionHeader={
                            <SectionTitle
                                title={t("plan:planInfo")}
                                px={Size.PlanDetail.px + "px"}
                            />
                        }
                    >
                        <VStack>
                            <PlanInfoSection
                                durationInMinutes={plan.timeInMinutes}
                                priceRange={getPlanPriceRange(plan.places)}
                            />
                            <AdInPlanDetail />
                        </VStack>
                    </PlanPageSection>
                    <PlanPageSection
                        sectionHeader={
                            <SectionTitle
                                title={t("plan:plan")}
                                px={Size.PlanDetail.px + "px"}
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
                                px={Size.PlanDetail.px + "px"}
                            />
                        }
                    >
                        <PlaceMap places={plan.places} />
                    </PlanPageSection>
                    <VStack w="100%" p="16px">
                        <SavePlanAsImageButton plan={plan} />
                        <SearchRouteByGoogleMapButton
                            plan={plan}
                            currentLocation={currentLocation}
                            createdBasedOnCurrentLocation={
                                createdBasedOnCurrentLocation
                            }
                        />
                    </VStack>
                    {destinationPlacesForPlanCandidate?.length > 0 && (
                        <PlanPageSection
                            contentPaddingX={0}
                            sectionHeader={
                                <PlanListSectionTitle
                                    title={t(
                                        "plan:createPlanFromOtherLocation"
                                    )}
                                    icon={MdOutlineNearMe}
                                    px={Size.PlanDetail.px + "px"}
                                    pt={0}
                                />
                            }
                        >
                            <HorizontalScrollableList
                                px={Size.PlanDetail.px + "px"}
                            >
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
                </VStack>
            </Center>
            <PlanFooter visible={isPlanFooterVisible}>
                <Button
                    variant="outline"
                    flex={1}
                    color={Colors.primary[400]}
                    borderColor={Colors.primary[400]}
                    borderRadius={20}
                    onClick={() => showReorderDialog()}
                >
                    {t("plan:reorderPlaces")}
                </Button>
                <Button
                    variant="solid"
                    flex={1}
                    color="white"
                    backgroundColor="#BF756E"
                    borderRadius={20}
                    onClick={() => createPlan({ planId: plan.id })}
                >
                    {t("plan:saveThisPlan")}
                </Button>
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

export default SelectPlanPage;
