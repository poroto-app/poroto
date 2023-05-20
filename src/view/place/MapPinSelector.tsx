import {MapViewer} from "src/view/common/MapViewer";
import {GeoLocation} from "src/domain/models/GeoLocation";
import {Marker} from "@react-google-maps/api";

export type Props = {
    center: GeoLocation,
    onSelectLocation: (location: GeoLocation) => void,
    pinnedLocation?: GeoLocation,
}

export function MapPinSelector({center, onSelectLocation, pinnedLocation}: Props) {
    return <MapViewer
        center={{lat: center.latitude, lng: center.longitude}}
        zoom={15}
        onClick={(e) => onSelectLocation({
            latitude: e.latLng.lat(),
            longitude: e.latLng.lng(),
        })}
        options={() => ({
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER,
            },
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER,
            }
        })}
    >
        {
            pinnedLocation && <Marker
                position={{
                    lat: pinnedLocation.latitude,
                    lng: pinnedLocation.longitude
                }}
            />
        }
    </MapViewer>;
}