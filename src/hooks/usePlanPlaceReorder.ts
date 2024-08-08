import { ToastId, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Place } from "src/domain/models/Place";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { copyObject } from "src/domain/util/object";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { usePlanCandidate } from "src/hooks/usePlanCandidate";
import {
    autoReorderPlacesInPlanCandidate,
    reduxPlanCandidateSelector,
    resetAutoReorderPlacesInPlanCandidateRequestStatus,
    updatePlacesOrderInPlanCandidate,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";

export const usePlanPlaceReorder = ({ planId }: { planId: string }) => {
    const dispatch = useAppDispatch();
    const toast = useToast();
    const { t } = useAppTranslation();

    const { plan, currentLocation, createdBasedOnCurrentLocation } =
        usePlanCandidate({
            planId: planId,
        });

    // すぐに更新がされるようにするためのコピー
    const [placesReordered, setPlacesReordered] = useState<Place[]>(
        plan?.places || []
    );
    const [updatePlaceOrderTimeoutId, setUpdatePlaceOrderTimeoutId] =
        useState<NodeJS.Timeout | null>(null);
    const [isReorderDialogVisible, setIsReorderDialogVisible] = useState(false);
    const { autoReorderPlacesInPlanCandidateRequestStatus } =
        reduxPlanCandidateSelector();

    // プランの場所が変更されたらコピーを更新する
    useEffect(() => {
        if (!plan) {
            setPlacesReordered([]);
            return;
        }

        setPlacesReordered(plan.places);
    }, [copyObject(plan?.places)]);

    // 自動並び替え成功時にトーストを表示
    useEffect(() => {
        let toastId: ToastId | null = null;
        if (
            autoReorderPlacesInPlanCandidateRequestStatus ===
            RequestStatuses.FULFILLED
        ) {
            toastId = toast({
                title: t("plan:reorderPlacesSuccess"),
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else if (
            autoReorderPlacesInPlanCandidateRequestStatus ===
            RequestStatuses.REJECTED
        ) {
            toastId = toast({
                title: t("plan:reorderPlacesFailed"),
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            return;
        }

        return () => {
            dispatch(resetAutoReorderPlacesInPlanCandidateRequestStatus());
            if (toastId) {
                toast.close(toastId);
            }
        };
    }, [autoReorderPlacesInPlanCandidateRequestStatus]);

    const showReorderDialog = () => {
        setIsReorderDialogVisible(true);
    };

    const closeReorderDialog = () => {
        setIsReorderDialogVisible(false);
    };

    const handleOnReorderPlaces = ({
        placeIds,
        planCandidateSetId,
        planId,
    }: {
        placeIds: string[];
        planCandidateSetId: string;
        planId: string;
    }) => {
        dispatch(
            updatePlacesOrderInPlanCandidate({
                placeIds,
                planCandidateSetId,
                planId,
            })
        );
    };

    const handleOptimizeRoute = ({
        planCandidateSetId,
        planId,
    }: {
        planCandidateSetId: string;
        planId: string;
    }): void => {
        // すでにタイムアウトが設定されていたらキャンセルする
        if (updatePlaceOrderTimeoutId) {
            clearTimeout(updatePlaceOrderTimeoutId);
        }

        // 連続してリクエストが飛ばないようにするためにsetTimeoutを使う
        const id = setTimeout(() => {
            dispatch(
                autoReorderPlacesInPlanCandidate({
                    planId,
                    planCandidateId: planCandidateSetId,
                })
            );
        }, 1000);
        setUpdatePlaceOrderTimeoutId(id);
    };

    return {
        placesReordered,
        isReorderDialogVisible,
        showReorderDialog,
        closeReorderDialog,
        handleOptimizeRoute,
        handleOnReorderPlaces,
    };
};
