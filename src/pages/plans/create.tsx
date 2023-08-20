import { useRouter } from "next/router";
import { useEffect } from "react";
import { PageTransitions, reduxHistorySelector } from "src/redux/history";
import { reduxLocationSelector } from "src/redux/location";
import {
    reduxPlanCandidateSelector,
    resetCreatePlanFromLocationRequestStatus,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { LoadingModal } from "src/view/common/LoadingModal";
import { Routes } from "src/view/constants/router";
import { RequestStatuses } from "../../domain/models/RequestStatus";

// TODO: 「戻るボタン」、「進むボタン」、「URLで直接ページを開く」場合の対応をしなくてもいいルーティングにする
export default function CreatePlanPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { searchLocation } = reduxLocationSelector();
    const { createPlanFromLocationRequestStatus, createPlanSession } =
        reduxPlanCandidateSelector();
    const { transition } = reduxHistorySelector();

    // HACK: このページに「戻るボタン」やURLを叩いて直接遷移してきた場合は、さらに前のページに戻す
    useEffect(() => {
        if (!searchLocation) {
            // URLを直接叩いて遷移してきた場合
            router.push(Routes.home).then();
        } else if (transition === PageTransitions.POP) {
            // 戻るボタンで遷移してきた場合
            router.back();
        }
    }, []);

    // プランが作成されたら、プラン作成画面に遷移する
    useEffect(() => {
        if (
            createPlanSession &&
            createPlanFromLocationRequestStatus === RequestStatuses.FULFILLED
        ) {
            dispatch(resetCreatePlanFromLocationRequestStatus());
            router.push(Routes.plans.select(createPlanSession)).then();
        }
    }, [createPlanSession, createPlanFromLocationRequestStatus]);

    return <LoadingModal title="プランを作成しています" />;
}
