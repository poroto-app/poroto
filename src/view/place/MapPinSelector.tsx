import { Marker } from "@react-google-maps/api";
import { MapPinSelectorProps } from "src/types/props";
import { MapViewer } from "src/view/common/MapViewer";

export function MapPinSelector({
    center,
    onSelectLocation,
    pinnedLocation,
}: MapPinSelectorProps) {
    return (
        <MapViewer
            center={{ lat: center.latitude, lng: center.longitude }}
            zoom={15}
            onClick={(e) =>
                onSelectLocation({
                    latitude: e.latLng.lat(),
                    longitude: e.latLng.lng(),
                })
            }
            options={() => ({
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER,
                },
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER,
                },
            })}
        >
            {pinnedLocation && (
                <Marker
                    position={{
                        lat: pinnedLocation.latitude,
                        lng: pinnedLocation.longitude,
                    }}
                />
            )}
        </MapViewer>
    );
}
