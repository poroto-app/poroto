import { Link } from "@chakra-ui/next-js";
import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { getPlanPriceRange } from "src/domain/models/Plan";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { notEmpty } from "src/domain/util/null";
import { resetCreatePlanFromPlaceRequestStatus } from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { AdInPlanDetail } from "src/view/ad/AdInPlanDetail";
import EmptyIcon from "src/view/assets/svg/empty.svg";
import { ButtonWithBlur } from "src/view/common/ButtonWithBlur";
import { ErrorPage } from "src/view/common/ErrorPage";
import { Layout } from "src/view/common/Layout";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { NotFound } from "src/view/common/NotFound";
import { Colors } from "src/view/constants/color";
import { Routes } from "src/view/constants/router";
import { Size } from "src/view/constants/size";
import { isPC } from "src/view/constants/userAgent";
import { usePlaceLikeInPlanCandidate } from "src/view/hooks/usePlaceLikeInPlanCandidate";
import { usePlanCandidate } from "src/view/hooks/usePlanCandidate";
import { usePlanCandidateGalleryPageAutoScroll } from "src/view/hooks/usePlanCandidateGalleryPageAutoScroll";
import { usePlanCandidateSet } from "src/view/hooks/usePlanCandidateSet";
import { usePlanCreate } from "src/view/hooks/usePlanCreate";
import { usePlanPlaceAdd } from "src/view/hooks/usePlanPlaceAdd";
import { usePlanPlaceDelete } from "src/view/hooks/usePlanPlaceDelete";
import { usePlanPlaceReorder } from "src/view/hooks/usePlanPlaceReorder";
import { usePlanPlaceReplace } from "src/view/hooks/usePlanPlaceReplace";
import { PlaceMap } from "src/view/plan/PlaceMap";
import { FooterHeight, PlanFooter } from "src/view/plan/PlanFooter";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { AvailablePlaceSection } from "src/view/plan/candidate/AvailablePlaceSection";
import { GeneratingPlanDialog } from "src/view/plan/candidate/GeneratingPlanDialog";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { DialogAddPlace } from "src/view/plancandidate/DialogAddPlace";
import { DialogDeletePlace } from "src/view/plancandidate/DialogDeletePlace";
import { DialogReplacePlace } from "src/view/plancandidate/DialogReplacePlace";
import { PlanCandidatesGallery } from "src/view/plancandidate/PlanCandidatesGallery";
import { PlanInfoSection } from "src/view/plandetail/PlanInfoSection";
import { PlanPlaceList } from "src/view/plandetail/PlanPlaceList";
import { PlanDetailPageHeader } from "src/view/plandetail/header/PlanDetailPageHeader";

// TODO: 編集途中でログインした場合は、いいねした場所を引き継げるようにする
const SelectPlanPage = () => {
    const dispatch = useAppDispatch();

    const router = useRouter();
    const { sessionId } = router.query;
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
    const refPlanCandidateGallery = useRef<HTMLDivElement>(null);
    const { planDetailPageRef } = usePlanCandidateGalleryPageAutoScroll();

    const {
        plansCreated,
        placesAvailableForPlan,
        createPlanFromPlaceRequestStatus,
        createPlanFromLocationRequestStatus,
        fetchAvailablePlacesForPlanRequestStatus,
        fetchCachedCreatedPlansRequestStatus,
        createPlanCandidateFromPlace,
    } = usePlanCandidateSet({
        planCandidateSetId: sessionId as string,
        onCreatedPlanFromPlace: ({ plansCreated }) => {
            setSelectedPlanIndex(plansCreated.length - 1);

            // プラン一覧の上部にスクロールする
            refPlanCandidateGallery.current?.scrollIntoView();
        },
    });

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
            return <LoadingModal title="プランを作成しています" />;

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
                                プランを作成できませんでした
                            </Text>
                            <Text>
                                他の場所からプランを作成してみませんか？
                            </Text>
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
        <VStack w="100%">
            <NavBar />
            <Center
                w="100%"
                h={`calc(100vh - ${Size.NavBar.height} - ${FooterHeight}px)`}
                px="16px"
                py="16px"
                ref={refPlanCandidateGallery}
                overflowX="hidden"
            >
                <VStack spacing="32px" my="32px">
                    <PlanCandidatesGallery
                        planCandidates={plansCreated}
                        activePlanIndex={selectedPlanIndex}
                        onActiveIndexChange={setSelectedPlanIndex}
                    />
                    <Link
                        href={Routes.plans.planCandidate.plan(
                            sessionId as string,
                            plansCreated[selectedPlanIndex].id
                        )}
                    >
                        <ButtonWithBlur
                            px="16px"
                            py="16px"
                            backgroundColor="#84A6FF"
                            borderRadius="50px"
                        >
                            <Text
                                color="white"
                                fontWeight="bold"
                                fontSize="18px"
                            >
                                プランをみてみる
                            </Text>
                        </ButtonWithBlur>
                    </Link>
                </VStack>
            </Center>
            {notEmpty(selectedPlanIndex) &&
                plansCreated &&
                plansCreated.length > selectedPlanIndex && (
                    <Box w="100%" overflowX="hidden" ref={planDetailPageRef}>
                        <PlanDetailPage
                            planId={plansCreated[selectedPlanIndex].id}
                            planCandidateSetId={sessionId as string}
                        />
                    </Box>
                )}
        </VStack>
    );
};

type Props = {
    planId: string;
    planCandidateSetId: string;
};

function PlanDetailPage({ planId, planCandidateSetId }: Props) {
    const { plan, currentLocation, createdBasedOnCurrentLocation } =
        usePlanCandidate({
            planCandidateSetId: planCandidateSetId,
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

    const { handleOptimizeRoute } = usePlanPlaceReorder();

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

    const { createPlan, savePlanFromCandidateRequestStatus } = usePlanCreate({
        planCandidateSetId: planCandidateSetId,
        planId: planId,
    });

    if (!plan) {
        return <></>;
    }

    return (
        <>
            <Center w="100%" flexDirection="column" pb={`${FooterHeight}px`}>
                <VStack
                    w="100%"
                    minH={!isPC && `calc(100vh - ${FooterHeight}px)`}
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
                            planCandidateId: planCandidateSetId,
                            planId: planId,
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
}

export default SelectPlanPage;
