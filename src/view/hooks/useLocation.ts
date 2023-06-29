import { useState } from "react";
import { GeoLocation } from "src/domain/models/GeoLocation";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";

const fetchCurrentLocation = async (): Promise<GeoLocation | null> => {
    if (!navigator.geolocation) {
        console.info("cannot use the geolocation API");
        return null;
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (e) => {
                reject(e);
            }
        );
    });
};

export const useLocation = () => {
    const [location, setLocation] = useState<GeoLocation | null>(null);
    const [requestStatus, setRequestStatus] = useState<RequestStatus | null>(
        null
    );

    const fetchCurrentLocationWithHook =
        async (): Promise<GeoLocation | null> => {
            setRequestStatus(RequestStatuses.PENDING);
            try {
                const currentLocation = await fetchCurrentLocation();
                setLocation(currentLocation);
                setRequestStatus(RequestStatuses.FULFILLED);
                return currentLocation;
            } catch (e) {
                setLocation(null);
                setRequestStatus(RequestStatuses.REJECTED);
                return null;
            } finally {
            }
        };

    const resetLocationState = () => {
        setLocation(null);
        setRequestStatus(null);
    };

    return {
        fetchCurrentLocationStatus: requestStatus,
        location,
        getCurrentLocation: fetchCurrentLocationWithHook,
        resetLocationState,
    };
};
