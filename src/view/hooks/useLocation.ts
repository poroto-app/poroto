import { useState } from "react";
import { GeoLocation } from "src/domain/models/GeoLocation";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";

export const LocationPermissions = {
    GRANTED: "GRANTED",
    DENIED: "DENIED",
    PROMPT: "PROMPT",
};
export type LocationPermission =
    (typeof LocationPermissions)[keyof typeof LocationPermissions];

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
    // TODO: DELETE ME!
    const [isPermissionGranted, setIsPermissionGranted] = useState<
        boolean | null
    >(null);
    const [locationPermission, setLocationPermission] =
        useState<LocationPermission | null>(null);

    const checkGeolocationPermission = async (): Promise<boolean> => {
        const result = await navigator.permissions.query({
            name: "geolocation",
        });
        const isGranted = result.state === "granted";
        setIsPermissionGranted(isGranted);

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

        return isGranted;
    };

    const fetchCurrentLocationWithHook =
        async (): Promise<GeoLocation | null> => {
            setRequestStatus(RequestStatuses.PENDING);
            try {
                const currentLocation = await fetchCurrentLocation();
                setLocation(currentLocation);
                setRequestStatus(RequestStatuses.FULFILLED);
                setLocationPermission(LocationPermissions.GRANTED);
                setIsPermissionGranted(true);
                return currentLocation;
            } catch (e) {
                setLocation(null);
                setRequestStatus(RequestStatuses.REJECTED);
                setLocationPermission(LocationPermissions.DENIED);
                setIsPermissionGranted(false);
                return null;
            }
        };

    const resetLocationState = () => {
        setLocation(null);
        setRequestStatus(null);
        setIsPermissionGranted(false);
    };

    return {
        locationPermission,
        isLocationPermissionGranted: isPermissionGranted,
        fetchCurrentLocationStatus: requestStatus,
        location,
        getCurrentLocation: fetchCurrentLocationWithHook,
        resetLocationState,
        checkGeolocationPermission,
    };
};
