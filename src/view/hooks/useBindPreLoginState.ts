import { useEffect } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { notEmpty } from "src/domain/util/null";
import { reduxAuthSelector } from "src/redux/auth";
import { useAppDispatch } from "src/redux/redux";
import {
    bindPlanCandidateSetsToUser as bindPlanCandidateSetsToUserAction,
    reduxUserSelector,
    setShowBindPreLoginStateDialog,
} from "src/redux/user";
import { LocalStorageKeys } from "src/view/constants/localStorageKey";

export const useBindPreLoginState = () => {
    const dispatch = useAppDispatch();
    const { user, firebaseIdToken } = reduxAuthSelector();
    const {
        bindPlanCandidateSetsToUserRequestStatus,
        showBindPreLoginStateDialog,
    } = reduxUserSelector();

    // ローカルストレージに保存された、ログイン前に作成したプラン候補のIDを取得
    const getPlanCandidateSetIdsSavedBeforeLogin = (): string[] => {
        return JSON.parse(
            localStorage.getItem(LocalStorageKeys.PlanCandidate) ?? "[]"
        );
    };

    const bindPlanCandidateSetsToUser = () => {
        if (!user || !firebaseIdToken) return;
        const planCandidateSetIds = getPlanCandidateSetIdsSavedBeforeLogin();
        dispatch(
            bindPlanCandidateSetsToUserAction({
                userId: user.id,
                firebaseAuthToken: firebaseIdToken,
                planCandidateSetIds,
            })
        );
    };

    useEffect(() => {
        if (!user || !firebaseIdToken) return;
        if (!showBindPreLoginStateDialog) return;

        // ログイン前に保存していたプランがない場合は、ダイアログを表示しない
        if (getPlanCandidateSetIdsSavedBeforeLogin().length === 0) {
            dispatch(setShowBindPreLoginStateDialog({ show: false }));
            return;
        }
    }, [showBindPreLoginStateDialog]);

    useEffect(() => {
        // 紐づけに成功したら、ローカルストレージのプラン候補を削除
        if (
            bindPlanCandidateSetsToUserRequestStatus ===
            RequestStatuses.FULFILLED
        ) {
            localStorage.setItem(
                LocalStorageKeys.PlanCandidate,
                JSON.stringify([])
            );
        }
    }, [bindPlanCandidateSetsToUserRequestStatus]);

    return {
        bindPlanCandidateSetsToUserRequestStatus,

        showBindPreLoginStateDialog:
            showBindPreLoginStateDialog &&
            notEmpty(user) &&
            notEmpty(firebaseIdToken) &&
            getPlanCandidateSetIdsSavedBeforeLogin().length > 0,

        onCloseBindPreLoginStateDialog: () =>
            dispatch(setShowBindPreLoginStateDialog({ show: false })),

        bindPlanCandidateSetsToUser,
    };
};
