import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { ReactNode, useEffect, useState } from "react";
import { GooglePlacesApi } from "src/data/map/GooglePlacesApi";

export type MapViewerProps = {
    zoom: number; // SEE: https://developers.google.com/maps/documentation/javascript/overview?hl=ja#zoom-levels
    center?: { lat: number; lng: number };
    loadingPlaceHolder?: JSX.Element;
    onClick?: (e: google.maps.MapMouseEvent) => void;
    options?: () => google.maps.MapOptions; // MEMO: API読み込み前にオプションを指定するとエラーにため、読み込み後に関数を介して受け取る
    children?: ReactNode;
};

export function MapViewer({
    zoom,
    center,
    loadingPlaceHolder,
    options,
    onClick,
    children,
}: MapViewerProps) {
    const [mapCenter, setMapCenter] = useState(center);

    useEffect(() => {
        // 再描画を避けるため、同じ座標の場合は何もしない
        if (center.lat == mapCenter?.lat && center.lng == mapCenter?.lng) {
            return;
        }
        setMapCenter(center);
    }, [center]);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.GCP_API_KEY,
        // MEMO: GooglePlacesAPIと利用するGoogle Maps Javascript APIのバージョンは同じにする必要がある
        version: GooglePlacesApi.libraryVersion,
        libraries: GooglePlacesApi.libraries,
    });

    if (!isLoaded) {
        if (loadingPlaceHolder) return loadingPlaceHolder;
        return <></>;
    }

    return (
        <GoogleMap
            zoom={zoom}
            center={mapCenter}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={options && options()}
            onClick={onClick}
        >
            {children}
        </GoogleMap>
    );
}
