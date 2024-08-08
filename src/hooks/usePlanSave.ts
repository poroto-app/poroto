import { getAuth } from "@firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "solito/router";
import { Routes } from "src/constant/router";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { setShowPlanCreatedModal } from "src/redux/plan";
import {
    reduxPlanCandidateSelector,
    resetPlanCandidates,
    savePlanFromCandidate,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";

type Props = {
    planCandidateSetId: string;
    planId: string;
};

export const usePlanSave = ({ planCandidateSetId, planId }: Props) => {
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
            router.push(Routes.plans.plan(plan.id));
            dispatch(setShowPlanCreatedModal(true));
            // TODO: 遷移が終了したタイミングでモーダルが閉じるようにする
            return () => {
                setIsCreatingPlan(false);
                // 戻ったときに再リダイレクトされないようにする
                dispatch(resetPlanCandidates());
            };
        }
    }, [planId, savePlanFromCandidateRequestStatus]);

    return {
        createPlan,
        isCreatingPlan,
    };
};
