import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { CreatePlanLocationMapProps } from "src/types/props";

export function CreatePlanLocationMap({
    rangeInKm,
    mapCenter,
    location,

    children,
    onClickLocation,
}: CreatePlanLocationMapProps) {
    return (
        <MapView
            style={{ width: "100%", height: "100%" }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: mapCenter.latitude,
                longitude: mapCenter.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            onPress={(e) => {
                onClickLocation?.({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                });
            }}
        >
            {location && (
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                />
            )}
            {location && (
                <Circle
                    center={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                    radius={rangeInKm * 1000}
                    fillColor="#099C5E4D"
                    strokeColor="#099C5E"
                />
            )}
        </MapView>
    );
}
