import { useEffect, useState } from "react";
import { hasValue } from "src/domain/util/null";
import { fetchPlaceRecommendations, reduxPlaceSelector } from "src/redux/place";
import { reduxPlaceSearchSelector } from "src/redux/placeSearch";
import { useAppDispatch } from "src/redux/redux";

export const usePlaceRecommendation = () => {
    const dispatch = useAppDispatch();
    const [
        isPlaceRecommendationDialogVisible,
        setIsPlaceRecommendationDialogVisible,
    ] = useState(false);
    const {
        recommendedPlacesToCreateFromLocation,
        fetchPlaceRecommendationsRequestStatus,
    } = reduxPlaceSelector();

    const { placeSearchResults } = reduxPlaceSearchSelector();

    const onOpenPlaceRecommendationDialog = () => {
        setIsPlaceRecommendationDialogVisible(true);
    };

    const onClosePlaceRecommendationDialog = () => {
        setIsPlaceRecommendationDialogVisible(false);
    };

    const onRetryFetchPlaceRecommendations = () => {
        dispatch(fetchPlaceRecommendations());
    }

    useEffect(() => {
        dispatch(fetchPlaceRecommendations());
    }, []);

    return {
        // 検索結果が無い場合のみボタンを表示
        isPlaceRecommendationButtonVisible:
            hasValue(placeSearchResults) && placeSearchResults.length === 0,
        isPlaceRecommendationDialogVisible,
        recommendedPlacesToCreateFromLocation,
        fetchPlaceRecommendationsRequestStatus,
        onOpenPlaceRecommendationDialog,
        onClosePlaceRecommendationDialog,
        onRetryFetchPlaceRecommendations,
    };
};
