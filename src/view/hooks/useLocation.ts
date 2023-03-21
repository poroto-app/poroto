import { useState } from "react";
import { GeoLocation } from "src/domain/models/GeoLocation";


const fetchCurrentLocation = async (): Promise<GeoLocation | null> => {
    if (!navigator.geolocation) {
        console.info("cannot use the geolocation API");
        return null;
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        }, (e) => {
            reject(e)
        })
    });
}

export const useLocation = () => {
    const [location, setLocation] = useState<GeoLocation>(null);
    const [didRejected, setDidRejected] = useState<boolean | null>(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    const fetchCurrentLocationWithHook = async (): Promise<GeoLocation | null> => {
        setIsLoadingLocation(true);
        try {
            const currentLocation = await fetchCurrentLocation();
            setLocation(currentLocation);
            setDidRejected(false);
            return currentLocation;
        } catch (e) {
            setLocation(null);
            setDidRejected(true);
            return null;
        } finally {
            setIsLoadingLocation(false);
        }
    }

    return {
        isLoadingLocation,
        didRejected,
        location,
        getCurrentLocation: fetchCurrentLocationWithHook,
    }
}