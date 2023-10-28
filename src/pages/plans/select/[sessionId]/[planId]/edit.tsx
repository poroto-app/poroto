import { Link } from "@chakra-ui/next-js";
import { Button, Center, Icon, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
    fetchCachedCreatedPlans,
    fetchPlanDetail,
    reduxPlanCandidateSelector,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { ErrorPage } from "src/view/common/ErrorPage";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { NotFound } from "src/view/common/NotFound";
import { Colors } from "src/view/constants/color";
import { Routes } from "src/view/constants/router";
import { useLocation } from "src/view/hooks/useLocation";
import { usePlanPlaceAdd } from "src/view/hooks/usePlanPlaceAdd";
import { usePlanPlaceReplace } from "src/view/hooks/usePlanPlaceReplace";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { PlaceMap } from "src/view/plan/PlaceMap";
import { FooterHeight, PlanFooter } from "src/view/plan/PlanFooter";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { DialogAddPlace } from "src/view/plancandidate/DialogAddPlace";
import { DialogReplacePlace } from "src/view/plancandidate/DialogReplacePlace";
import { EditPlanCandidatePlaceListItem } from "src/view/plancandidate/EditPlanCandidatePlaceListItem";

const PlanEdit = () => {
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
        addPlaceToPlan,
        showPlacesToAdd,
        onCloseDialogToAddPlace,
        isDialogToAddPlaceVisible,
        placesToAdd,
        isAddingPlace,
    } = usePlanPlaceAdd({
        planCandidateId: sessionId as string,
        planId: planId as string,
    });

    const {
        preview: plan,
        createdBasedOnCurrentLocation,
        createPlanSession,
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
                    alignItems="flex-start"
                >
                    <PlanPageSection title="Edit">
                        <VStack spacing="16px">
                            {plan.places.map((place, i) => (
                                <EditPlanCandidatePlaceListItem
                                    key={place.id}
                                    place={place}
                                    onClickShowRelatedPlaces={showRelatedPlaces}
                                />
                            ))}
                            {/*TODO: すべての箇所で場所を追加できるようにする*/}
                            <AddPlaceButton onClick={showPlacesToAdd} />
                        </VStack>
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
            {/*Dialogs*/}
            <DialogReplacePlace
                placesInPlan={plan.places}
                placesToReplace={placesToReplace}
                placeIdToReplace={placeIdToReplace}
                isReplacingPlace={isReplacingPlace}
                isDialogVisible={isDialogRelatedPlacesVisible}
                onReplacePlace={({ placeIdToBeReplaced, placeIdToReplace }) =>
                    replacePlace({
                        placeIdToReplace: placeIdToBeReplaced,
                        placeIdToAdd: placeIdToReplace,
                    })
                }
                onCloseDialog={onCloseDialogRelatedPlaces}
            />
            <DialogAddPlace
                placesToAdd={placesToAdd}
                isDialogVisible={isDialogToAddPlaceVisible}
                isAddingPlace={isAddingPlace}
                onAddPlaceToPlan={({ placeIdToAdd }) =>
                    addPlaceToPlan({ placeIdToAdd })
                }
                onCloseDialog={onCloseDialogToAddPlace}
            />
            {/*Footer*/}
            <PlanFooter>
                <Link
                    flex={1}
                    href={Routes.plans.planCandidate.plan(
                        createPlanSession,
                        plan.id
                    )}
                >
                    <Button
                        w="100%"
                        variant="outline"
                        borderWidth="2px"
                        borderColor={Colors.primary["400"]}
                        color={Colors.primary["400"]}
                        borderRadius={10}
                    >
                        保存
                    </Button>
                </Link>
            </PlanFooter>
        </>
    );
};

const AddPlaceButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Center
            w="100%"
            px="16px"
            py="4px"
            as="button"
            border={`2px solid ${Colors.primary["400"]}`}
            borderRadius="20px"
            onClick={onClick}
        >
            <Icon as={MdAdd} color={Colors.primary["700"]} />
        </Center>
    );
};

export default PlanEdit;
