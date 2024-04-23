import { useEffect } from "react";
import { Plan } from "src/domain/models/Plan";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { reduxAuthSelector } from "src/redux/auth";
import {
    createPlanFromPlace,
    fetchAvailablePlacesForPlan,
    fetchCachedCreatedPlans,
    reduxPlanCandidateSelector,
    resetCreatePlanFromPlaceRequestStatus,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";

export const usePlanCandidateSet = ({
    planCandidateSetId,
    onCreatedPlanFromPlace,
}: {
    planCandidateSetId: string;
    onCreatedPlanFromPlace?: (params: { plansCreated: Plan[] }) => void;
}) => {
    const dispatch = useAppDispatch();
    const { user, firebaseIdToken } = reduxAuthSelector();
    const {
        plansCreated,
        placesAvailableForPlan,
        createPlanSession,
        createPlanFromPlaceRequestStatus,
        createPlanFromLocationRequestStatus,
        fetchCachedCreatedPlansRequestStatus,
        fetchAvailablePlacesForPlanRequestStatus,
    } = reduxPlanCandidateSelector();

    // プラン候補を取得
    // ログイン状態が変化したら、必ずプラン候補を取得する
    useEffect(() => {
        if (!planCandidateSetId) {
            return;
        }

        // プラン候補のキャッシュが存在しない場合は取得する
        if (!plansCreated) {
            dispatch(
                fetchCachedCreatedPlans({
                    session: planCandidateSetId,
                    userId: user?.id,
                    firebaseIdToken,
                })
            );
        }
    }, [planCandidateSetId, user?.id]);

    // プラン作成の候補地を取得
    useEffect(() => {
        // プラン取得中は何もしない
        if (!planCandidateSetId || !plansCreated) return;

        // プランが存在しない場合、プランの候補となる場所を取得する
        if (plansCreated.length === 0) {
            dispatch(
                fetchAvailablePlacesForPlan({ session: planCandidateSetId })
            );
        }
    }, [planCandidateSetId, plansCreated?.length]);

    // 指定した場所からプランを作成できたら、そのプランが選択されている状態にする
    useEffect(() => {
        if (createPlanFromPlaceRequestStatus !== RequestStatuses.FULFILLED)
            return;
        if (!plansCreated || plansCreated.length === 0) return;
        if (!createPlanSession) return;

        dispatch(resetCreatePlanFromPlaceRequestStatus());
        onCreatedPlanFromPlace?.({ plansCreated });
    }, [
        createPlanFromPlaceRequestStatus,
        plansCreated?.length,
        createPlanSession,
    ]);

    const createPlanCandidateFromPlace = ({ placeId }: { placeId: string }) => {
        if (!planCandidateSetId || typeof planCandidateSetId !== "string")
            return;
        if (createPlanFromPlaceRequestStatus === RequestStatuses.PENDING)
            return;
        dispatch(
            createPlanFromPlace({
                placeId,
                createPlanSessionId: planCandidateSetId,
            })
        );
    };

    return {
        plansCreated,
        placesAvailableForPlan,
        createPlanFromPlaceRequestStatus,
        createPlanFromLocationRequestStatus,
        fetchAvailablePlacesForPlanRequestStatus,
        fetchCachedCreatedPlansRequestStatus,
        createPlanCandidateFromPlace,
    };
};
