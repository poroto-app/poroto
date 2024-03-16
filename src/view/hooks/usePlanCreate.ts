import { getAuth } from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { setShowPlanCreatedModal } from "src/redux/plan";
import {
    reduxPlanCandidateSelector,
    resetPlanCandidates,
    savePlanFromCandidate,
} from "src/redux/planCandidate";
import { Routes } from "src/view/constants/router";

type Props = {
    planCandidateSetId: string;
    planId: string;
};

export const usePlanCreate = ({ planCandidateSetId, planId }: Props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { preview: plan, savePlanFromCandidateRequestStatus } =
        reduxPlanCandidateSelector();

    const createPlan = async ({ planId }: { planId: string }) => {
        const auth = getAuth();
        const authToken = await auth.currentUser?.getIdToken(true);
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
            router.push(Routes.plans.plan(plan.id)).then();
            dispatch(setShowPlanCreatedModal(true));
            // 戻ったときに再リダイレクトされないようにする
            dispatch(resetPlanCandidates());
        }
    }, [planId, savePlanFromCandidateRequestStatus]);

    return {
        createPlan,
        savePlanFromCandidateRequestStatus,
    };
};