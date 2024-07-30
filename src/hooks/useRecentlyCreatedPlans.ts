import { useEffect } from "react";
import { Plan } from "src/domain/models/Plan";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { hasValue } from "src/domain/util/null";
import {
    fetchPlansRecentlyCreated,
    pushPlansRecentlyCreated,
    reduxPlanSelector,
} from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";

export const useRecentlyCreatedPlans = (props?: {
    plansRecentlyCreated: Plan[] | null;
    nextPageTokenPlansRecentlyCreated: string | null;
}) => {
    const dispatch = useAppDispatch();

    const {
        plansRecentlyCreated,
        nextPageTokenPlansRecentlyCreated,
        fetchPlansRecentlyCreatedRequestStatus,
    } = reduxPlanSelector();

    useEffect(() => {
        // すでにプランを取得済みの場合は何もしない
        if (plansRecentlyCreated) return;

        if (props?.plansRecentlyCreated) {
            // 初期表示時のみISRで取得したプランをReduxに保存する
            dispatch(
                pushPlansRecentlyCreated({
                    plans: props.plansRecentlyCreated,
                    nextPageTokenPlansRecentlyCreated:
                        props?.nextPageTokenPlansRecentlyCreated,
                })
            );
        } else {
            // ISRで取得できなかった場合はAPIから取得する
            dispatch(fetchPlansRecentlyCreated());
        }
    }, [plansRecentlyCreated]);

    const loadNextRecentCreatedPlans = () => {
        if (hasValue(nextPageTokenPlansRecentlyCreated)) {
            dispatch(fetchPlansRecentlyCreated());
        }
    };

    return {
        plansRecentlyCreated,
        loadNextRecentCreatedPlans,
        canLoadMoreRecentlyCreatedPlans: hasValue(
            nextPageTokenPlansRecentlyCreated
        ),
        isLoadingRecentlyCreatedPlans:
            fetchPlansRecentlyCreatedRequestStatus === RequestStatuses.PENDING,
    };
};
