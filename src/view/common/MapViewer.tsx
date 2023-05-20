import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import {ReactNode} from "react";
import {GooglePlacesApi} from "src/data/map/GooglePlacesApi";

export type MapViewerProps = {
    zoom: number // SEE: https://developers.google.com/maps/documentation/javascript/overview?hl=ja#zoom-levels
    center?: { lat: number, lng: number }
    loadingPlaceHolder?: JSX.Element,
    onClick?: (e: google.maps.MapMouseEvent) => void,
    options?: () => google.maps.MapOptions, // MEMO: API読み込み前にオプションを指定するとエラーにため、読み込み後に関数を介して受け取る
    children?: ReactNode
}

export function MapViewer({zoom, center, loadingPlaceHolder, options, onClick, children}: MapViewerProps) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.GCP_API_KEY,
        // MEMO: GooglePlacesAPIと利用するGoogle Maps Javascript APIのバージョンは同じにする必要がある
        version: GooglePlacesApi.libraryVersion,
        libraries: GooglePlacesApi.libraries,
    });

    if (!isLoaded) {
        if (loadingPlaceHolder) return loadingPlaceHolder;
        return <></>
    }

    return <GoogleMap
        zoom={zoom}
        center={center}
        mapContainerStyle={{width: "100%", height: "100%"}}
        options={options && options()}
        onClick={onClick}
    >
        {children}
    </GoogleMap>
}