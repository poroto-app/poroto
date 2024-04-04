import { ToastId, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
    autoReorderPlacesInPlanCandidate,
    reduxPlanCandidateSelector,
    resetAutoReorderPlacesInPlanCandidateRequestStatus,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";

export const usePlanPlaceReorder = () => {
    const dispatch = useAppDispatch();
    const toast = useToast();
    const { autoReorderPlacesInPlanCandidateRequestStatus } =
        reduxPlanCandidateSelector();

    useEffect(() => {
        let toastId: ToastId | null = null;
        if (
            autoReorderPlacesInPlanCandidateRequestStatus ===
            RequestStatuses.FULFILLED
        ) {
            toastId = toast({
                title: "並び替えが成功しました",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else if (
            autoReorderPlacesInPlanCandidateRequestStatus ===
            RequestStatuses.REJECTED
        ) {
            toastId = toast({
                title: "並び替えに失敗しました",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            return;
        }

        return () => {
            console.log(autoReorderPlacesInPlanCandidateRequestStatus);
            dispatch(resetAutoReorderPlacesInPlanCandidateRequestStatus());
            if (toastId) {
                toast.close(toastId);
            }
        };
    }, [autoReorderPlacesInPlanCandidateRequestStatus]);

    const handleOptimizeRoute = (
        { planCandidateId, planId }: { planCandidateId: string; planId: string }
    ): void => {
        dispatch(autoReorderPlacesInPlanCandidate({ planId, planCandidateId }));
    };

    return {
        handleOptimizeRoute,
    };
};
