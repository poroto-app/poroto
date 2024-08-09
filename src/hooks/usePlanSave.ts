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
import { isWeb } from "tamagui";

type Props = {
    planCandidateSetId: string;
    planId: string;
};

export const usePlanSave = ({ planCandidateSetId, planId }: Props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { preview: plan, savePlanFromCandidateRequestStatus } =
        reduxPlanCandidateSelector();
    const [isSavingPlan, setIsSavingPlan] = useState(false);

    const savePlan = async ({ planId }: { planId: string }) => {
        // TODO: native対応
        let authToken: string;
        if (isWeb) {
            const auth = getAuth();
            authToken = await auth.currentUser?.getIdToken(true);
        }
        setIsSavingPlan(true);
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
                setIsSavingPlan(false);
                // 戻ったときに再リダイレクトされないようにする
                dispatch(resetPlanCandidates());
            };
        }
    }, [planId, savePlanFromCandidateRequestStatus]);

    return {
        savePlan,
        isSavingPlan,
    };
};
