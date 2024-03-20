import { useEffect } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
    fetchNearbyPlans as fetchNearbyPlansAction,
    reduxPlanSelector,
} from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { useLocation } from "src/view/hooks/useLocation";

export const useNearbyPlans = () => {
    const dispatch = useAppDispatch();
    const { plansNearby, fetchNearbyPlansRequestStatus } = reduxPlanSelector();
    const {
        locationPermission,
        fetchCurrentLocationStatus,
        checkGeolocationPermission,
        getCurrentLocation,
    } = useLocation();

    const fetchNearbyPlans = async (): Promise<void> => {
        const currentLocation = await getCurrentLocation();
        if (!currentLocation) return;
        dispatch(fetchNearbyPlansAction({ currentLocation, limit: 5 }));
    };

    // 位置情報が利用可能な場合は付近で作成されたプランを取得する
    useEffect(() => {
        const fetchNearbyPlansWithCurrentLocation = async () => {
            const isGranted = await checkGeolocationPermission();
            if (!isGranted) return;

            await fetchNearbyPlans();
        };

        fetchNearbyPlansWithCurrentLocation().then();
    }, []);

    return {
        plansNearby,
        locationPermission,
        fetchNearbyPlans,
        isFetchingCurrentLocation:
            fetchCurrentLocationStatus === RequestStatuses.PENDING,
        isFetchingNearbyPlans:
            fetchNearbyPlansRequestStatus === RequestStatuses.PENDING,
    };
};
