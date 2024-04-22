import { useEffect } from "react";
import { reduxAuthSelector } from "src/redux/auth";
import {
    fetchCachedCreatedPlans,
    reduxPlanCandidateSelector,
    updatePreviewPlanId,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { useLocation } from "src/view/hooks/useLocation";

export const usePlanCandidate = ({
    planCandidateSetId,
    planId,
}: {
    planCandidateSetId: string;
    planId?: string;
}) => {
    const dispatch = useAppDispatch();
    const { getCurrentLocation, location: currentLocation } = useLocation();
    const { user, firebaseIdToken } = reduxAuthSelector();
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
        if (!planCandidateSetId || typeof planCandidateSetId !== "string") {
            return;
        }

        // プラン候補のキャッシュが存在しない場合は取得する
        if (!plan) {
            dispatch(
                fetchCachedCreatedPlans({
                    session: planCandidateSetId,
                    userId: user?.id,
                    firebaseIdToken,
                })
            );
        }
    }, [planCandidateSetId, plan?.id]);

    useEffect(() => {
        if (!planCandidateSetId) {
            return;
        }

        // ログイン状態が変化したら、必ずプラン候補を取得する
        dispatch(
            fetchCachedCreatedPlans({
                session: planCandidateSetId,
                userId: user?.id,
                firebaseIdToken,
            })
        );
    }, [user?.id, firebaseIdToken]);

    // プランの詳細を取得する
    useEffect(() => {
        if (!createPlanSession) return;
        if (planId && typeof planId === "string") {
            dispatch(updatePreviewPlanId({ planId }));
        }
    }, [planId, createPlanSession]);

    return {
        plan,
        createdBasedOnCurrentLocation,
        fetchCachedCreatedPlansRequestStatus,
        currentLocation,
    };
};
