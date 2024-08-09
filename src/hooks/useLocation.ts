import { useState } from "react";
import { GeoLocation } from "src/domain/models/GeoLocation";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import {
    LocationHooks,
    LocationPermission,
    LocationPermissions,
} from "src/types/hooks";

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

export const useLocation = (): LocationHooks => {
    const [location, setLocation] = useState<GeoLocation | null>(null);
    const [requestStatus, setRequestStatus] = useState<RequestStatus | null>(
        null
    );
    const [locationPermission, setLocationPermission] =
        useState<LocationPermission | null>(null);

    const checkGeolocationPermission = async (): Promise<boolean> => {
        const result = await navigator.permissions.query({
            name: "geolocation",
        });
        switch (result.state) {
            case "granted":
                setLocationPermission(LocationPermissions.GRANTED);
                break;
            case "prompt":
                setLocationPermission(LocationPermissions.PROMPT);
                break;
            case "denied":
                setLocationPermission(LocationPermissions.DENIED);
                break;
        }

        return result.state === LocationPermissions.GRANTED;
    };

    const fetchCurrentLocationWithHook =
        async (): Promise<GeoLocation | null> => {
            setRequestStatus(RequestStatuses.PENDING);
            try {
                const currentLocation = await fetchCurrentLocation();
                setLocation(currentLocation);
                setRequestStatus(RequestStatuses.FULFILLED);
                setLocationPermission(LocationPermissions.GRANTED);
                return currentLocation;
            } catch (e) {
                setLocation(null);
                setRequestStatus(RequestStatuses.REJECTED);
                setLocationPermission(LocationPermissions.DENIED);
                return null;
            }
        };

    const resetLocationState = () => {
        setLocation(null);
        setRequestStatus(null);
    };

    return {
        locationPermission,
        isFetchingCurrentLocation: requestStatus === RequestStatuses.PENDING,
        fetchCurrentLocationStatus: requestStatus,
        currentLocation: location,
        getCurrentLocation: fetchCurrentLocationWithHook,
        resetLocationState,
        checkGeolocationPermission,
    };
};
