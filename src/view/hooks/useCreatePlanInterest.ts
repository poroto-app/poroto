import { getAnalytics, logEvent } from "@firebase/analytics";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GeoLocation } from "src/domain/models/GeoLocation";
import { LocationCategory } from "src/domain/models/LocationCategory";
import { LocationCategoryWithPlace } from "src/domain/models/LocationCategoryWithPlace";
import { reduxAuthSelector } from "src/redux/auth";
import {
    reduxLocationSelector,
    setCurrentLocation,
    setSearchLocation,
} from "src/redux/location";
import {
    createPlanFromLocation,
    fetchNearbyPlaceCategories,
    pushAcceptedCategory,
    pushRejectedCategory,
    reduxPlanCandidateSelector,
    resetInterest,
    setCreatedPlans,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { AnalyticsEvents } from "src/view/constants/analytics";
import { LocalStorageKeys } from "src/view/constants/localStorageKey";
import { Routes } from "src/view/constants/router";
import { useLocation } from "src/view/hooks/useLocation";

export const useCreatePlanInterest = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        categoryCandidates,
        createPlanSession,
        fetchLocationCategoryRequestId,
        fetchNearbyPlaceCategoriesRequestStatus: matchInterestRequestStatus,
    } = reduxPlanCandidateSelector();
    const { user } = reduxAuthSelector();

    // クエリ
    const {
        lat: paramLat,
        lng: paramLng,
        googlePlaceId: paramGooglePlaceId,
    } = router.query;
    const paramGeoLocation = parseGeoLocationFromQuery({
        lat: paramLat as string,
        lng: paramLng as string,
    });
    const { searchLocation, searchPlaceId } = reduxLocationSelector();

    // 現在地取得
    const { getCurrentLocation, location, fetchCurrentLocationStatus } =
        useLocation();

    // カテゴリ選択
    const [currentCategory, setCurrentCategory] =
        useState<LocationCategoryWithPlace | null>(null);
    const [matchInterestRequestId, setMatchInterestRequestId] = useState<
        string | null
    >(null);

    const handleAcceptCategory = (category: LocationCategory) => {
        logEvent(getAnalytics(), AnalyticsEvents.Interests.SelectCategory);
        dispatch(pushAcceptedCategory({ category }));
    };

    const handleRejectCategory = (category: LocationCategory) => {
        dispatch(pushRejectedCategory({ category }));
    };

    // 状態のリセット
    useEffect(() => {
        dispatch(resetInterest());
        setMatchInterestRequestId(null);

        // 2回目以降、プランを作成するときに、前回の結果が残らないようにする
        dispatch(
            setCreatedPlans({
                plans: null,
                session: null,
                createdBasedOnCurrentLocation: null,
            })
        );

        return () => {
            // 前回の結果をリセット
            // MEMO: 戻るボタンで遷移してきたときに、状態が残っていると/plans/selectに自動的に遷移してしまう
            dispatch(resetInterest());
            setCurrentCategory(null);
            setMatchInterestRequestId(null);

            // 場所を指定してプラン作成 -> 現在地からプラン作成
            // を行うと、指定した場所の情報が残り、そこからプランを作成してしまうためリセットする
            dispatch(
                setSearchLocation({ searchLocation: null, searchPlaceId: null })
            );
        };
    }, []);

    // 検索する場所が指定されていない場合は、現在地を取得する
    useEffect(() => {
        if (!searchLocation && !paramGeoLocation) {
            getCurrentLocation().then();
        }
    }, [searchLocation, paramGeoLocation]);

    // 現在地を取得したら、それをもとに検索
    useEffect(() => {
        if (!location) return;
        const currentLocation = location;
        dispatch(setCurrentLocation({ currentLocation }));
        dispatch(
            setSearchLocation({
                searchLocation: currentLocation,
                searchPlaceId: null,
            })
        );
    }, [location]);

    // 検索する場所が指定されたら、興味を持つ場所を検索
    useEffect(() => {
        // 重複してリクエストを送信しない
        if (matchInterestRequestId) return;

        if (paramGeoLocation || searchLocation) {
            const requestId = Date.now().toString();
            setMatchInterestRequestId(requestId);
            dispatch(
                fetchNearbyPlaceCategories({
                    location: paramGeoLocation ?? searchLocation,
                    requestId,
                })
            );
        }
    }, [searchLocation, matchInterestRequestId]);

    // 付近の場所のカテゴリが選択されたら
    useEffect(() => {
        // TODO: hooks 内で管理する
        if (categoryCandidates && categoryCandidates.length > 0) {
            setCurrentCategory(categoryCandidates[0]);
        }
    }, [categoryCandidates?.length]);

    // カテゴリが最後まで選択されたら、プランを作成する
    useEffect(() => {
        if (
            categoryCandidates &&
            categoryCandidates.length === 0 &&
            searchLocation &&
            createPlanSession
        ) {
            const googlePlaceId =
                (paramGooglePlaceId ? (paramGooglePlaceId as string) : null) ??
                searchPlaceId;

            dispatch(
                createPlanFromLocation({
                    location: searchLocation,
                    googlePlaceId,
                })
            );

            // 作成したプラン候補を保存
            if (!user) {
                const createdPlanCandidates: string[] = JSON.parse(
                    localStorage.getItem(LocalStorageKeys.PlanCandidate) ?? "[]"
                );
                createdPlanCandidates.push(createPlanSession);
                localStorage.setItem(
                    LocalStorageKeys.PlanCandidate,
                    JSON.stringify(createdPlanCandidates)
                );
            }

            router
                .push(Routes.plans.planCandidate.index(createPlanSession))
                .then();
        }
    }, [
        categoryCandidates?.length,
        searchLocation,
        searchPlaceId,
        paramGooglePlaceId,
        createPlanSession,
    ]);

    return {
        categoryCandidates,
        currentCategory,
        fetchLocationCategoryRequestId,
        matchInterestRequestStatus,
        matchInterestRequestId,
        searchLocation: paramGeoLocation ?? searchLocation,
        fetchCurrentLocationStatus,
        handleAcceptCategory,
        handleRejectCategory,
        getCurrentLocation,
    };
};

const parseGeoLocationFromQuery = ({ lat, lng }): GeoLocation | null => {
    const latitude = lat ? parseFloat(lat as string) : null;
    const longitude = lng ? parseFloat(lng as string) : null;
    return latitude && longitude ? { latitude, longitude } : null;
};
