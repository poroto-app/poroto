import { useToast } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Routes } from "src/constant/router";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { hasValue } from "src/domain/util/null";
import {
    createPlanFromSavedPlan as createPlanFromSavedPlanAction,
    reduxPlanCandidateSelector,
    resetCreatePlanFromSavedPlanRequestStatus,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";

export const useCreatePlanFromSavedPlan = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { t } = useTranslation();
    const [isCreatingPlanFromSavedPlan, setIsCreatingPlanFromSavedPlan] =
        useState(false);
    const { createPlanSession, createPlanFromSavedPlanRequestStatus } =
        reduxPlanCandidateSelector();
    const toast = useToast();

    useEffect(() => {
        if (
            hasValue(createPlanSession) &&
            createPlanFromSavedPlanRequestStatus === RequestStatuses.FULFILLED
        ) {
            dispatch(resetCreatePlanFromSavedPlanRequestStatus());
            router
                .push(Routes.plans.planCandidate.index(createPlanSession))
                .then(() => {
                    setIsCreatingPlanFromSavedPlan(false);
                    toast({
                        title: t("plan:customizePlanCreated"),
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                });
        }
    }, [createPlanSession, createPlanFromSavedPlanRequestStatus]);

    const createPlanFromSavedPlan = ({
        userId,
        firebaseIdToken,
        planId,
    }: {
        userId: string | null;
        firebaseIdToken: string | null;
        planId: string;
    }) => {
        setIsCreatingPlanFromSavedPlan(true);
        dispatch(
            createPlanFromSavedPlanAction({
                userId,
                firebaseIdToken,
                planId,
            })
        );
    };

    return {
        createPlanFromSavedPlan,
        isCreatingPlanFromSavedPlan,
    };
};
