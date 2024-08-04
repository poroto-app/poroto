import { Circle, Marker } from "@react-google-maps/api";
import { ReactNode } from "react";
import { GeoLocation } from "src/data/graphql/generated";
import { MapViewer } from "src/view/common/MapViewer";

export function CreatePlanLocationMap({
    rangeInKm,
    mapCenter,
    location,

    children,
    onClickLocation,
}: {
    rangeInKm: number;
    mapCenter: GeoLocation;
    location?: GeoLocation;

    onClickLocation?: (location: GeoLocation) => void;

    children?: ReactNode;
}) {
    return (
        <MapViewer
            zoom={14}
            center={{
                lat: mapCenter.latitude,
                lng: mapCenter.longitude,
            }}
            onClick={(e) => {
                onClickLocation?.({
                    latitude: e.latLng.lat(),
                    longitude: e.latLng.lng(),
                });
            }}
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
            {location && (
                <Marker
                    position={{
                        lat: location.latitude,
                        lng: location.longitude,
                    }}
                />
            )}
            {location && (
                <Circle
                    center={{
                        lat: location.latitude,
                        lng: location.longitude,
                    }}
                    radius={rangeInKm * 1000}
                    options={{
                        fillColor: "#099C5E",
                        strokeColor: "#099C5E",
                    }}
                    onClick={(e) => {
                        onClickLocation({
                            latitude: e.latLng.lat(),
                            longitude: e.latLng.lng(),
                        });
                    }}
                />
            )}
            {children}
        </MapViewer>
    );
}
