import { useEffect, useState } from "react";
import { Place } from "src/domain/models/Place";
import { fetchPlaceRecommendations, reduxPlaceSelector } from "src/redux/place";
import {
    reduxPlaceSearchSelector,
    setSelectedLocation,
} from "src/redux/placeSearch";
import { useAppDispatch } from "src/redux/redux";

type Props = {
    onSelectPlace: ({ place }: { place: Place }) => void;
};

export const usePlaceRecommendation = ({ onSelectPlace }: Props) => {
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
    };

    const onSelectedRecommendedPlace = ({ place }: { place: Place }) => {
        dispatch(
            setSelectedLocation({
                location: place.location,
                placeId: place.googlePlaceId,
            })
        );

        onClosePlaceRecommendationDialog();

        if (onSelectPlace) {
            onSelectPlace({ place });
        }
    };

    useEffect(() => {
        dispatch(fetchPlaceRecommendations());
    }, []);

    return {
        // 検索結果が無い場合のみボタンを表示
        isPlaceRecommendationButtonVisible:
            placeSearchResults === null || placeSearchResults.length === 0,
        isPlaceRecommendationDialogVisible,
        recommendedPlacesToCreateFromLocation,
        fetchPlaceRecommendationsRequestStatus,
        onOpenPlaceRecommendationDialog,
        onClosePlaceRecommendationDialog,
        onRetryFetchPlaceRecommendations,
        onSelectedRecommendedPlace,
    };
};
