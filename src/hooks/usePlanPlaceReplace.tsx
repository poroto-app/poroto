import { useEffect, useState } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
    fetchPlacesToReplace,
    reduxEditPlanCandidateSelector,
    replacePlaceOfPlanCandidate,
    resetReorderPlaceOfPlanCandidateState,
} from "src/redux/editPlanCandidate";
import { useAppDispatch } from "src/redux/redux";

export const usePlanPlaceReplace = ({
    planCandidateId,
    planId,
}: {
    planCandidateId: string;
    planId: string;
}) => {
    const dispatch = useAppDispatch();
    const [placeIdToReplace, setPlaceIdToReplace] = useState<string | null>();
    const [isDialogRelatedPlacesVisible, setIsDialogRelatedPlacesVisible] =
        useState(false);
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

    const onCloseDialogRelatedPlaces = () => {
        setPlaceIdToReplace(null);
        setIsDialogRelatedPlacesVisible(false);
        dispatch(resetReorderPlaceOfPlanCandidateState());
    };

    const replacePlace = ({
        placeIdToDelete,
        placeIdToAdd,
    }: {
        placeIdToDelete: string;
        placeIdToAdd: string;
    }) => {
        dispatch(
            replacePlaceOfPlanCandidate({
                planCandidateId,
                planId,
                placeIdToReplace: placeIdToDelete,
                placeIdToAdd,
            })
        );
    };

    useEffect(() => {
        dispatch(resetReorderPlaceOfPlanCandidateState());
    }, []);

    useEffect(() => {
        // エラー時にはダイアログを閉じる
        if (
            requestStatusFetchPlacesToReplace === RequestStatuses.REJECTED ||
            requestStatusReplacePlaceOfPlanCandidate ===
                RequestStatuses.REJECTED
        ) {
            // TODO: エラー対応をする
            onCloseDialogRelatedPlaces();
            setIsDialogRelatedPlacesVisible(false);
            return;
        }

        // 並び替えが終了したら、ダイアログを閉じる
        if (
            requestStatusReplacePlaceOfPlanCandidate ===
            RequestStatuses.FULFILLED
        ) {
            setIsDialogRelatedPlacesVisible(false);
            onCloseDialogRelatedPlaces();
            return;
        }

        // 並び替えが開始したら、ダイアログを表示する
        if (requestStatusFetchPlacesToReplace === RequestStatuses.PENDING) {
            setIsDialogRelatedPlacesVisible(true);
            return;
        }
    }, [
        requestStatusFetchPlacesToReplace,
        requestStatusReplacePlaceOfPlanCandidate,
    ]);

    return {
        showRelatedPlaces,
        onCloseDialogRelatedPlaces,
        replacePlace,
        placeIdToReplace,
        placesToReplace,
        isReplacingPlace:
            requestStatusReplacePlaceOfPlanCandidate ===
            RequestStatuses.PENDING,
        isDialogRelatedPlacesVisible,
    };
};
