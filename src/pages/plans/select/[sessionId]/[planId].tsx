import { Center, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Place } from "src/domain/models/Place";
import { Plan } from "src/domain/models/Plan";
import { copyObject } from "src/domain/util/object";
import {
    fetchCachedCreatedPlans,
    fetchPlanDetail,
    reduxPlanSelector,
    savePlanFromCandidate,
} from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { useLocation } from "src/view/hooks/useLocation";
import { SavePlanAsImageButton } from "src/view/plan/button/SavePlanAsImageButton";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { PlanEditorDialog } from "src/view/plan/edit/PlanEditorDialog";
import { PlaceMap } from "src/view/plan/PlaceMap";
import {
    FooterHeight,
    PlanCandidateFooter,
} from "src/view/plan/PlanCandidateFooter";
import { PlanPlaceList } from "src/view/plan/PlanPlaceList";
import { PlanDuration } from "src/view/plan/PlanSummaryItem";

const PlanDetail = () => {
    const { sessionId, planId } = useRouter().query;
    const dispatch = useAppDispatch();
    const { getCurrentLocation, location: currentLocation } = useLocation();

    // TODO: DELETE ME
    const [places, setPlaces] = useState<Place[]>(null);

    const [isEditingPlan, setIsEditingPlan] = useState(false);
    const {
        preview: plan,
        createdBasedOnCurrentLocation,
        createPlanSession,
    } = reduxPlanSelector();

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

    const handleOnSavePlan = ({
        session,
        plan,
    }: {
        session: string;
        plan: Plan;
    }) => {
        // TODO: 作成が完了したら、プランのページに遷移させる
        dispatch(savePlanFromCandidate({ session, planId: plan.id }));
        // TODO: DELETE ME
        alert("プランを保存しました");
    };

    if (!plan) return <LoadingModal title="素敵なプランを読み込んでいます" />;

    return (
        <>
            <Center flexDirection="column" pb={`${FooterHeight}px`}>
                <NavBar title={plan.title} />
                <VStack
                    maxWidth="990px"
                    w="100%"
                    px="8px"
                    py="16px"
                    boxSizing="border-box"
                >
                    <PlanPlaceList
                        plan={plan}
                        createdBasedOnCurrentLocation={
                            createdBasedOnCurrentLocation
                        }
                    />
                    <VStack py="16px" w="100%" alignItems="flex-start">
                        <PlanDuration durationInMinutes={plan.timeInMinutes} />
                    </VStack>
                    <VStack w="100%">
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
