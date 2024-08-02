import { getAnalytics, logEvent } from "@firebase/analytics";
import { useEffect } from "react";
import { useRouter } from "solito/router";
import { AnalyticsEvents } from "src/constant/analytics";
import { Routes } from "src/constant/router";
import { Place } from "src/domain/models/Place";
import { hasValue } from "src/domain/util/null";
import { reduxAuthSelector } from "src/redux/auth";
import { setSearchLocation } from "src/redux/location";
import { reduxPlaceSelector, setLikePlaces } from "src/redux/place";
import { reduxPlanSelector, setPlaceIdToCreatePlan } from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { fetchUser } from "src/redux/user";

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
        router.push(
            Routes.plans.interest({
                location: place.location,
                googlePlaceId: place.googlePlaceId,
            })
        );
    };

    useEffect(() => {
        return () => {
            dispatch(setPlaceIdToCreatePlan(null));
        };
    }, []);

    useEffect(() => {
        if (hasValue(user) && hasValue(firebaseIdToken)) {
            dispatch(
                fetchUser({
                    userId: user.id,
                    firebaseAuthToken: firebaseIdToken,
                })
            );
        }
    }, [user?.id, firebaseIdToken]);

    useEffect(() => {
        // ログアウトした場合は状態をリセットする
        if (!user || !firebaseIdToken) {
            dispatch(setLikePlaces({ places: null }));
            return;
        }
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
