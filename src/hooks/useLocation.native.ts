import {
    getCurrentPositionAsync,
    getForegroundPermissionsAsync,
    requestForegroundPermissionsAsync,
} from "expo-location";
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

const fetchCurrentLocation = async (): Promise<{
    location: GeoLocation;
    permission: LocationPermission;
} | null> => {
    const { status } = await getForegroundPermissionsAsync();
    if (status !== "granted") {
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return {
                location: null,
                permission: LocationPermissions.DENIED,
            };
        }
    }

    const location = await getCurrentPositionAsync();
    return {
        location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        },
        permission: LocationPermissions.GRANTED,
    };
};

export const useLocation = (): LocationHooks => {
    const [location, setLocation] = useState<GeoLocation | null>(null);
    const [requestStatus, setRequestStatus] = useState<RequestStatus | null>(
        null
    );
    const [locationPermission, setLocationPermission] =
        useState<LocationPermission | null>(null);

    const checkGeolocationPermission = async (): Promise<boolean> => {
        const result = await getForegroundPermissionsAsync();
        switch (result.status) {
            case "granted":
                setLocationPermission(LocationPermissions.GRANTED);
                break;
            case "undetermined":
                setLocationPermission(LocationPermissions.PROMPT);
                break;
            case "denied":
                setLocationPermission(LocationPermissions.DENIED);
                break;
        }

        return result.status === LocationPermissions.GRANTED;
    };

    const fetchCurrentLocationWithHook =
        async (): Promise<GeoLocation | null> => {
            setRequestStatus(RequestStatuses.PENDING);
            const { location, permission } = await fetchCurrentLocation();
            setLocation(location);
            setRequestStatus(RequestStatuses.FULFILLED);
            setLocationPermission(permission);
            return location;
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
