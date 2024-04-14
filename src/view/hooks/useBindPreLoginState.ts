import { useEffect } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { notEmpty } from "src/domain/util/null";
import { reduxAuthSelector } from "src/redux/auth";
import { useAppDispatch } from "src/redux/redux";
import {
    bindPlanCandidateSetsToUser,
    reduxUserSelector,
    setIsBindPreLoginStateDialogVisible,
} from "src/redux/user";
import { LocalStorageKeys } from "src/view/constants/localStorageKey";

export const useBindPreLoginState = () => {
    const dispatch = useAppDispatch();
    const { user, firebaseIdToken } = reduxAuthSelector();
    const {
        bindPlanCandidateSetsToUserRequestStatus,
        isBindPreLoginStateDialogVisible,
    } = reduxUserSelector();

    // ローカルストレージに保存された、ログイン前に作成したプラン候補のIDを取得
    const getPlanCandidateSetIdsSavedBeforeLogin = (): string[] => {
        return JSON.parse(
            localStorage.getItem(LocalStorageKeys.PlanCandidate) ?? "[]"
        );
    };

    const canBindPreLoginState =
        notEmpty(user) &&
        notEmpty(firebaseIdToken) &&
        getPlanCandidateSetIdsSavedBeforeLogin().length > 0;

    const bindPreLoginState = () => {
        if (!user || !firebaseIdToken) return;
        const planCandidateSetIds = getPlanCandidateSetIdsSavedBeforeLogin();

        dispatch(
            bindPlanCandidateSetsToUser({
                userId: user.id,
                firebaseAuthToken: firebaseIdToken,
                planCandidateSetIds,
            })
        );
    };

    const showBindPreLoginStateDialog = () => {
        dispatch(setIsBindPreLoginStateDialogVisible({ visible: true }));
    };

    useEffect(() => {
        // ログイン前に保存していたプランがない場合は、ダイアログを表示しない
        if (getPlanCandidateSetIdsSavedBeforeLogin().length === 0) {
            dispatch(setIsBindPreLoginStateDialogVisible({ visible: false }));
            return;
        }
    }, [isBindPreLoginStateDialogVisible]);

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
        canBindPreLoginState,

        bindPlanCandidateSetsToUserRequestStatus,

        isBindPreLoginStateDialogVisible:
            isBindPreLoginStateDialogVisible && canBindPreLoginState,

        showBindPreLoginStateDialog:
            canBindPreLoginState && showBindPreLoginStateDialog,

        onCloseBindPreLoginStateDialog: () =>
            dispatch(setIsBindPreLoginStateDialogVisible({ visible: false })),

        bindPreLoginState,
    };
};
