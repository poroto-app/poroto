import { getAnalytics, logEvent } from "@firebase/analytics";
import { useEffect } from "react";
import { AnalyticsEvents } from "src/constant/analytics";
import { Routes } from "src/constant/router";
import { Place } from "src/domain/models/Place";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { User } from "src/domain/models/User";
import { hasValue } from "src/domain/util/null";
import { useAppRouter } from "src/hooks/useAppRouter";
import { setSearchLocation } from "src/redux/location";
import {
    fetchPlacesNearbyPlanLocation,
    fetchPlan,
    reduxPlanSelector,
    setPlaceIdToCreatePlan,
} from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";

export const usePlan = ({
    planId,
    user,
    firebaseIdToken,
    fetchNearbyPlanSize = 10,
}: {
    planId: string;
    user?: User;
    firebaseIdToken?: string;
    fetchNearbyPlanSize?: number;
}) => {
    const dispatch = useAppDispatch();
    const router = useAppRouter();

    const {
        preview: plan,
        nearbyPlans,
        placesNearbyPlanLocation,
        fetchPlanRequestStatus,
        showPlanCreatedModal,
        placeIdToCreatePlan,
    } = reduxPlanSelector();

    const createPlan = async ({ place }: { place: Place }) => {
        logEvent(
            getAnalytics(),
            AnalyticsEvents.CreatePlan.FromPlaceNearbyPlan,
            {
                planId: plan.id,
                placeId: place.id,
            }
        );
        dispatch(
            setSearchLocation({
                searchLocation: place.location,
                searchPlaceId: place.googlePlaceId,
            })
        );
        // ダイアログの背景固定を解除するためにモーダルを閉じる
        dispatch(setPlaceIdToCreatePlan(null));
        router.push(
            Routes.plans.interest({
                location: place.location,
                googlePlaceId: place.googlePlaceId,
            })
        );
    };

    // プランの取得
    useEffect(() => {
        if (!planId) return;

        dispatch(
            fetchPlan({
                planId,
                userId: user?.id,
                firebaseIdToken: firebaseIdToken,
            })
        );

        dispatch(
            fetchPlacesNearbyPlanLocation({
                planId,
                limit: fetchNearbyPlanSize,
            })
        );
    }, [planId, user, firebaseIdToken]);

    return {
        plan,
        nearbyPlans,
        placesNearbyPlanLocation,
        isFetchingPlan:
            !hasValue(fetchPlanRequestStatus) ||
            (fetchPlanRequestStatus === RequestStatuses.PENDING &&
                // プランを取得したあとで、同じプランを再取得したときに画面がロード中になるのを防ぐ
                plan?.id !== planId),
        planError: fetchPlanRequestStatus === RequestStatuses.REJECTED,
        showPlanCreatedModal,
        placeIdToCreatePlan,
        createPlan,
    };
};
