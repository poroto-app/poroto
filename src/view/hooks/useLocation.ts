import {useState} from "react";
import {GeoLocation} from "src/domain/models/GeoLocation";

export const useLocation = () => {
    const [location, setLocation] = useState<GeoLocation>();

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            console.info("cannot use the geolocation API");
            return
        }

        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                latitude: position.coords.latitude, longitude: position.coords.longitude
            });
        }, (e) => {
            console.error("error while getting current location");
        })
    }

    return {
        location,
        getCurrentLocation
    }
}