import { useEffect } from "react";
import {
    reduxPlanCandidateSelector,
    updatePreviewPlanId,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { useLocation } from "src/view/hooks/useLocation";

export const usePlanCandidate = ({ planId }: { planId?: string }) => {
    const dispatch = useAppDispatch();
    const { getCurrentLocation, location: currentLocation } = useLocation();

    const { preview: plan, createdBasedOnCurrentLocation } =
        reduxPlanCandidateSelector();

    useEffect(() => {
        if (!currentLocation) getCurrentLocation().then();
    }, [currentLocation]);

    // プランの詳細を取得する
    useEffect(() => {
        if (!planId) return;
        if (planId === plan?.id) return;
        dispatch(updatePreviewPlanId({ planId }));
    }, [planId, plan]);

    return {
        plan,
        currentLocation,
        createdBasedOnCurrentLocation,
    };
};
