import { GeoLocation } from "src/domain/models/GeoLocation";

export const generateGoogleMapUrl = ({
    locations,
    startLocation,
}: {
    locations: GeoLocation[];
    startLocation?: GeoLocation;
}): string => {
    // SEE: https://developers.google.com/maps/documentation/urls/get-started?hl=ja#directions-action
    const url = new URL("https://www.google.com/maps/dir/");
    url.searchParams.set("api", "1");

    const locationsWaypoints = locations.slice(0, locations.length - 1);
    const locationDestination = locations[locations.length - 1];

    if (startLocation) {
        url.searchParams.set(
            "origin",
            `${startLocation.latitude},${startLocation.longitude}`
        );
    }

    if (locationsWaypoints.length > 0) {
        const waypoints = locationsWaypoints
            .map((waypoint) => `${waypoint.latitude},${waypoint.longitude}`)
            .join("|");
        url.searchParams.set("waypoints", waypoints);
    }

    url.searchParams.set(
        "destination",
        `${locationDestination.latitude},${locationDestination.longitude}`
    );

    return encodeURI(decodeURIComponent(url.toString()));
};
