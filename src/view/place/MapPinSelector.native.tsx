import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MapPinSelectorProps } from "src/types/props";

export function MapPinSelector({
    center,
    onSelectLocation,
    pinnedLocation,
}: MapPinSelectorProps) {
    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{
                width: "100%",
                height: "100%",
            }}
            initialRegion={{
                latitude: center.latitude,
                longitude: center.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            onPress={(e) =>
                onSelectLocation({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                })
            }
        >
            {pinnedLocation && (
                <Marker
                    coordinate={{
                        latitude: pinnedLocation.latitude,
                        longitude: pinnedLocation.longitude,
                    }}
                />
            )}
        </MapView>
    );
}
