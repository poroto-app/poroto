import { getAuth } from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { setShowPlanCreatedModal } from "src/redux/plan";
import {
    reduxPlanCandidateSelector,
    resetPlanCandidates,
    savePlanFromCandidate,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { Routes } from "src/constant/router";

type Props = {
    planCandidateSetId: string;
    planId: string;
};

export const usePlanCreate = ({ planCandidateSetId, planId }: Props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { preview: plan, savePlanFromCandidateRequestStatus } =
        reduxPlanCandidateSelector();
    const [isCreatingPlan, setIsCreatingPlan] = useState(false);

    const createPlan = async ({ planId }: { planId: string }) => {
        const auth = getAuth();
        const authToken = await auth.currentUser?.getIdToken(true);
        setIsCreatingPlan(true);
        dispatch(
            savePlanFromCandidate({
                session: planCandidateSetId,
                planId,
                authToken,
            })
        );
    };

    // プランが保存され次第、ページ遷移を行う
    useEffect(() => {
        if (!plan) return;
        if (savePlanFromCandidateRequestStatus === RequestStatuses.FULFILLED) {
            router.push(Routes.plans.plan(plan.id)).then(() => {
                // 遷移が終了したタイミングでモーダルが閉じるようにする
                setIsCreatingPlan(false);
                // 戻ったときに再リダイレクトされないようにする
                dispatch(resetPlanCandidates());
            });
            dispatch(setShowPlanCreatedModal(true));
        }
    }, [planId, savePlanFromCandidateRequestStatus]);

    return {
        createPlan,
        isCreatingPlan,
    };
};
