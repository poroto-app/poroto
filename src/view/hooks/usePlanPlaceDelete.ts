import { useEffect, useState } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
    deletePlaceFromPlanOfPlanCandidate,
    reduxEditPlanCandidateSelector,
} from "src/redux/editPlanCandidate";
import { reduxPlanCandidateSelector } from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";

export const usePlanPlaceDelete = ({
    planCandidateId,
    planId,
}: {
    planCandidateId: string;
    planId: string;
}) => {
    const dispatch = useAppDispatch();
    const [placeIdToDelete, setPlaceIdToDelete] = useState<string>(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const { preview: plan } = reduxPlanCandidateSelector();
    const { requestStatusDeletePlaceFromPlanOfPlanCandidate } =
        reduxEditPlanCandidateSelector();

    const showDialog = ({ placeIdToDelete }: { placeIdToDelete: string }) => {
        setPlaceIdToDelete(placeIdToDelete);
        setIsDialogVisible(true);
    };

    const closeDialog = () => {
        setIsDialogVisible(false);
    };

    const deletePlaceFromPlan = ({
        placeIdToDelete,
    }: {
        placeIdToDelete: string;
    }) => {
        dispatch(
            deletePlaceFromPlanOfPlanCandidate({
                planCandidateId,
                planId,
                placeId: placeIdToDelete,
            })
        );
    };

    useEffect(() => {
        if (
            requestStatusDeletePlaceFromPlanOfPlanCandidate ===
            RequestStatuses.REJECTED
        ) {
            // TODO: show error message
            setIsDialogVisible(false);
            return;
        }

        if (
            requestStatusDeletePlaceFromPlanOfPlanCandidate ===
            RequestStatuses.FULFILLED
        ) {
            setIsDialogVisible(false);
            return;
        }

        if (
            requestStatusDeletePlaceFromPlanOfPlanCandidate ===
            RequestStatuses.PENDING
        ) {
            setIsDialogVisible(true);
            return;
        }
    }, [requestStatusDeletePlaceFromPlanOfPlanCandidate]);

    useEffect(() => {
        if (!isDialogVisible) setPlaceIdToDelete(null);
    }, [isDialogVisible]);

    return {
        deletePlaceFromPlan,
        showDialogToDelete: showDialog,
        closeDialogToDelete: closeDialog,
        isDialogToDeletePlaceVisible: isDialogVisible,
        isDeletingPlace:
            requestStatusDeletePlaceFromPlanOfPlanCandidate ===
            RequestStatuses.PENDING,
        placeToDelete:
            placeIdToDelete &&
            plan.places.find((place) => place.id === placeIdToDelete),
    };
};
