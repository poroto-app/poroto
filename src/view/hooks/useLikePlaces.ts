import { useEffect } from "react";
import { reduxAuthSelector } from "src/redux/auth";
import {
    fetchLikePlaces,
    reduxPlaceSelector,
    resetLikePlaces,
} from "src/redux/place";
import { useAppDispatch } from "src/redux/redux";

export const useLikePlaces = () => {
    const dispatch = useAppDispatch();
    const { likePlaces, fetchLikePlacesRequestStatus } = reduxPlaceSelector();
    const { user, firebaseIdToken } = reduxAuthSelector();

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
        fetchLikePlacesRequestStatus,
    };
};
