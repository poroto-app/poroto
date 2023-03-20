import {GeoLocation} from "src/domain/models/GeoLocation";

export const useLocation = () => {
    const getCurrentLocation = async (): Promise<GeoLocation | null> => {
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

    return {
        getCurrentLocation
    }
}