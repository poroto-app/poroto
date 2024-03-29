import { getAnalytics, logEvent } from "@firebase/analytics";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Place } from "src/domain/models/Place";
import { reduxAuthSelector } from "src/redux/auth";
import { setSearchLocation } from "src/redux/location";
import {
    fetchLikePlaces,
    reduxPlaceSelector,
    resetLikePlaces,
} from "src/redux/place";
import { reduxPlanSelector, setPlaceIdToCreatePlan } from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { AnalyticsEvents } from "src/view/constants/analytics";
import { Routes } from "src/view/constants/router";

export const useLikePlaces = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { likePlaces } = reduxPlaceSelector();
    const { user, firebaseIdToken } = reduxAuthSelector();
    const { placeIdToCreatePlan } = reduxPlanSelector();

    const onSelectLikePlace = (placeId: string) => {
        dispatch(setPlaceIdToCreatePlan(placeId));
    };

    const onCreatePlanFromLikePlace = (place: Place) => {
        logEvent(getAnalytics(), AnalyticsEvents.CreatePlan.FromLikePlace, {
            placeId: place.id,
        });
        dispatch(
            setSearchLocation({
                searchLocation: place.location,
                searchPlaceId: place.googlePlaceId,
            })
        );
        // ダイアログの背景固定を解除するためにモーダルを閉じる
        dispatch(setPlaceIdToCreatePlan(null));
        router.push(Routes.plans.interest(true)).then();
    };

    useEffect(() => {
        return () => {
            dispatch(setPlaceIdToCreatePlan(null));
        };
    }, []);

    useEffect(() => {
        // ログアウトした場合は状態をリセットする
        if (!user || !firebaseIdToken) {
            dispatch(resetLikePlaces());
            return;
        }

        dispatch(fetchLikePlaces({ userId: user.id, firebaseIdToken }));
    }, [user, firebaseIdToken]);

    return {
        likePlaces,
        likePlaceToCreatePlan: likePlaces?.find(
            (place) => place.id === placeIdToCreatePlan
        ),
        onSelectLikePlace,
        onCreatePlanFromLikePlace,
    };
};
