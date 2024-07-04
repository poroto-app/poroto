import { useEffect, useState } from "react";
import {
    createPlanFromPlace,
    reduxPlanCandidateSelector,
    updatePreviewPlanId,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { useLocation } from "src/view/hooks/useLocation";

export const usePlanCandidate = ({ planId }: { planId?: string }) => {
    const dispatch = useAppDispatch();
    const { getCurrentLocation, location: currentLocation } = useLocation();

    const [placeIdToCreatePlan, setPlaceIdToCreatePlan] = useState<
        string | null
    >(null);
    const {
        preview: plan,
        createdBasedOnCurrentLocation,
        placesForDestination,
    } = reduxPlanCandidateSelector();
    const destinationPlacesForPlanCandidate =
        placesForDestination?.find((p) => p.planCandidateId === planId)
            ?.places || [];

    useEffect(() => {
        if (!currentLocation) getCurrentLocation().then();
    }, [currentLocation]);

    // プランの詳細を取得する
    useEffect(() => {
        if (!planId) return;
        if (planId === plan?.id) return;
        dispatch(updatePreviewPlanId({ planId }));

        return () => {
            setPlaceIdToCreatePlan(null);
        };
    }, [planId, plan]);

    // 場所からプランを作成
    const onSelectDestinationPlace = (placeId: string) => {
        setPlaceIdToCreatePlan(placeId);
    };

    const onCloseCreatePlanFromPlace = () => {
        setPlaceIdToCreatePlan(null);
    };

    const onCreatePlanFromPlace = ({
        planCandidateSetId,
        placeId,
    }: {
        planCandidateSetId: string;
        placeId: string;
    }) => {
        // ダイアログが表示されている状態だとスクロールできないので先に閉じる
        setPlaceIdToCreatePlan(null);

        // トップまでスクロール(1sスリープ)
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 300);

        dispatch(
            createPlanFromPlace({
                createPlanSessionId: planCandidateSetId,
                placeId,
            })
        );
    };

    return {
        plan,
        currentLocation,
        createdBasedOnCurrentLocation,
        destinationPlacesForPlanCandidate,
        placeToCreatePlan: destinationPlacesForPlanCandidate.find(
            (p) => p.id === placeIdToCreatePlan
        ),
        onSelectDestinationPlace,
        onCloseCreatePlanFromPlace,
        onCreatePlanFromPlace,
    };
};
