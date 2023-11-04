import { useEffect, useState } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
    addPlaceToPlanOfPlanCandidate,
    fetchPlacesToAddToPlanCandidate,
    reduxEditPlanCandidateSelector,
    resetAddPlaceToPlanCandidateState,
} from "src/redux/editPlanCandidate";
import { useAppDispatch } from "src/redux/redux";

export const usePlanPlaceAdd = ({
    planCandidateId,
    planId,
}: {
    planCandidateId: string;
    planId: string;
}) => {
    const dispatch = useAppDispatch();
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const {
        placesToAdd,
        requestStatusFetchPlacesToAdd,
        requestStatusAddPlaceToPlanCandidate,
    } = reduxEditPlanCandidateSelector();

    const showPlacesToAdd = () => {
        dispatch(
            fetchPlacesToAddToPlanCandidate({
                planCandidateId,
                planId,
            })
        );
    };

    const onCloseDialog = () => {
        setIsDialogVisible(false);
        dispatch(resetAddPlaceToPlanCandidateState());
    };

    const addPlaceToPlan = ({
        previousPlaceId,
        placeIdToAdd,
    }: {
        previousPlaceId: string;
        placeIdToAdd: string;
    }) => {
        dispatch(
            addPlaceToPlanOfPlanCandidate({
                planCandidateId,
                planId,
                previousPlaceId,
                placeId: placeIdToAdd,
            })
        );
    };

    useEffect(() => {
        dispatch(resetAddPlaceToPlanCandidateState());
    }, []);

    useEffect(() => {
        // エラー時にはダイアログを閉じる
        if (
            requestStatusFetchPlacesToAdd === RequestStatuses.REJECTED ||
            requestStatusAddPlaceToPlanCandidate === RequestStatuses.REJECTED
        ) {
            // TODO: エラー処理
            onCloseDialog();
            return;
        }

        // 追加が完了したらダイアログを閉じる
        if (
            requestStatusAddPlaceToPlanCandidate === RequestStatuses.FULFILLED
        ) {
            onCloseDialog();
            return;
        }

        // 並び替えが開始したらダイアログを表示する
        if (requestStatusFetchPlacesToAdd === RequestStatuses.PENDING) {
            setIsDialogVisible(true);
            return;
        }
    }, [requestStatusFetchPlacesToAdd, requestStatusAddPlaceToPlanCandidate]);

    return {
        addPlaceToPlan,
        onCloseDialogToAddPlace: onCloseDialog,
        showPlacesToAdd,
        placesToAdd,
        isAddingPlace:
            requestStatusAddPlaceToPlanCandidate === RequestStatuses.PENDING,
        isDialogToAddPlaceVisible: isDialogVisible,
    };
};
