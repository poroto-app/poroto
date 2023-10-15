import { useEffect, useState } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
    fetchPlacesToReplace,
    reduxEditPlanCandidateSelector,
    replacePlaceOfPlanCandidate,
    resetEditPlanCandidateState,
} from "src/redux/editPlanCandidate";
import { useAppDispatch } from "src/redux/redux";

export const usePlanEdit = ({
    planCandidateId,
    planId,
}: {
    planCandidateId: string;
    planId: string;
}) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetEditPlanCandidateState());
    }, []);

    // ========================================================================
    // Replace
    // ========================================================================
    const [placeIdToReplace, setPlaceIdToReplace] = useState<string | null>();
    const {
        placesToReplace,
        requestStatusFetchPlacesToReplace,
        requestStatusReplacePlaceOfPlanCandidate,
    } = reduxEditPlanCandidateSelector();

    const showRelatedPlaces = (placeId: string) => {
        dispatch(
            fetchPlacesToReplace({
                planCandidateId,
                planId,
                placeId: placeId,
            })
        );
        setPlaceIdToReplace(placeId);
    };

    const resetReplacePlaceState = () => {
        setPlaceIdToReplace(null);
        dispatch(resetEditPlanCandidateState());
    };

    const replacePlace = ({
        placeIdToReplace,
        placeIdToAdd,
    }: {
        placeIdToReplace: string;
        placeIdToAdd: string;
    }) => {
        dispatch(
            replacePlaceOfPlanCandidate({
                planCandidateId,
                planId,
                placeIdToReplace,
                placeIdToAdd,
            })
        );
    };

    useEffect(() => {
        // 更新が終了したら、状態をリセットする（ダイアログを閉じる）
        // TODO: エラー時の対応をする
        if (
            [RequestStatuses.FULFILLED, RequestStatuses.REJECTED].includes(
                requestStatusReplacePlaceOfPlanCandidate
            )
        ) {
            resetReplacePlaceState();
        }
    }, [requestStatusReplacePlaceOfPlanCandidate]);
    // ========================================================================

    return {
        showRelatedPlaces,
        resetReplacePlaceState,
        replacePlace,
        placeIdToReplace,
        placesToReplace,
        isReplacingPlace:
            requestStatusReplacePlaceOfPlanCandidate ===
            RequestStatuses.PENDING,
        isDialogRelatedPlacesVisible:
            [RequestStatuses.PENDING, RequestStatuses.FULFILLED].includes(
                requestStatusFetchPlacesToReplace
            ) ||
            [RequestStatuses.PENDING, RequestStatuses.FULFILLED].includes(
                requestStatusReplacePlaceOfPlanCandidate
            ),
    };
};
