import { Center, Icon, VStack } from "@chakra-ui/react";
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
import { useLocation } from "src/view/hooks/useLocation";
import { usePlanPlaceReplace } from "src/view/hooks/usePlanPlaceReplace";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { PlaceMap } from "src/view/plan/PlaceMap";
import { FooterHeight } from "src/view/plan/PlanCandidateFooter";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { DialogRelatedPlaces } from "src/view/plancandidate/DialogRelatedPlaces";
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
                                <VStack key={i} w="100%" spacing="16px">
                                    <EditPlanCandidatePlaceListItem
                                        place={place}
                                        onClickShowRelatedPlaces={
                                            showRelatedPlaces
                                        }
                                    />
                                    <Center
                                        w="100%"
                                        px="16px"
                                        py="4px"
                                        as="button"
                                        border={`2px solid ${Colors.primary["400"]}`}
                                        borderRadius="20px"
                                    >
                                        <Icon
                                            as={MdAdd}
                                            color={Colors.primary["700"]}
                                        />
                                    </Center>
                                </VStack>
                            ))}
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
            <DialogRelatedPlaces
                visible={isDialogRelatedPlacesVisible}
                dialogTitle={`「${
                    plan.places.find((p) => p.id === placeIdToReplace)?.name
                }」に関連する場所`}
                placeNameToBeUpdated={
                    plan.places.find((p) => p.id === placeIdToReplace)?.name
                }
                places={placesToReplace}
                updating={isReplacingPlace}
                onClickRelatedPlace={(placeId) =>
                    placeIdToReplace &&
                    replacePlace({
                        placeIdToReplace: placeIdToReplace,
                        placeIdToAdd: placeId,
                    })
                }
                onClose={() => onCloseDialogRelatedPlaces()}
            />
        </>
    );
};

export default PlanEdit;
