import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import {ReactNode} from "react";

export type MapViewerProps = {
    zoom: number // SEE: https://developers.google.com/maps/documentation/javascript/overview?hl=ja#zoom-levels
    center?: { lat: number, lng: number }
    loadingPlaceHolder?: JSX.Element,
    onClick?: (e: google.maps.MapMouseEvent) => void,
    children?: ReactNode
}

export function MapViewer({zoom, center, loadingPlaceHolder, onClick, children}: MapViewerProps) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.GCP_API_KEY,
    })

    if (!isLoaded) {
        if (loadingPlaceHolder) return loadingPlaceHolder;
        return <></>
    }

    return <GoogleMap
        zoom={zoom}
        center={center}
        mapContainerStyle={{width: "100%", height: "100%"}}
        onClick={onClick}
    >
        {children}
    </GoogleMap>
}