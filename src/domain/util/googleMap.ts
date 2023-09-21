import { GeoLocation } from "src/domain/models/GeoLocation";

export type GoogleMapPlaceParam = {
    name: string;
    googlePlaceId?: string;
    location: GeoLocation;
};

export const generateGoogleMapUrl = ({
    places,
    startLocation,
}: {
    places: GoogleMapPlaceParam[];
    startLocation?: GeoLocation;
}): string => {
    // SEE: https://developers.google.com/maps/documentation/urls/get-started?hl=ja#directions-action
    const url = new URL("https://www.google.com/maps/dir/");
    url.searchParams.set("api", "1");

    const placesWaypoints = places.slice(0, places.length - 1);
    const placeDestination = places[places.length - 1];

    if (startLocation) {
        url.searchParams.set(
            "origin",
            `${startLocation.latitude},${startLocation.longitude}`
        );
    }

    if (placesWaypoints.length > 0) {
        const waypoints = placesWaypoints
            .map((waypoint) => waypoint.name)
            .join("|");
        url.searchParams.set("waypoints", waypoints);

        const allWaypointsHasGooglePlaceId = placesWaypoints.every(
            (waypoint) => waypoint.googlePlaceId
        );
        if (allWaypointsHasGooglePlaceId) {
            const waypointsPlaceIds = placesWaypoints
                .map((waypoint) => waypoint.googlePlaceId)
                .join("|");
            url.searchParams.set("waypoint_place_ids", waypointsPlaceIds);
        }
    }

    if (placeDestination.googlePlaceId) {
        url.searchParams.set("destination", placeDestination.name);
        url.searchParams.set(
            "destination_place_id",
            placeDestination.googlePlaceId
        );
    } else{
        url.searchParams.set("destination", `${placeDestination.location.latitude},${placeDestination.location.longitude}`)
    }

    return encodeURI(decodeURIComponent(url.toString()));
};
