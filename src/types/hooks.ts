import type { NextRouter as NextRouterType } from "next/dist/shared/lib/router/router";
import { GeoLocation } from "src/domain/models/GeoLocation";
import { RequestStatus } from "src/domain/models/RequestStatus";

export type AppRouter = {
    push: (
        url: Parameters<NextRouterType["push"]>[0],
        as?: Parameters<NextRouterType["push"]>[1],
        transitionOptions?: {
            shallow?: boolean;
            locale?: string | false;
            scroll?: boolean;
        }
    ) => Promise<void>;
    reload: () => Promise<void>;
};

export const LocationPermissions = {
    GRANTED: "GRANTED",
    DENIED: "DENIED",
    PROMPT: "PROMPT",
};
export type LocationPermission =
    (typeof LocationPermissions)[keyof typeof LocationPermissions];

export type LocationHooks = {
    currentLocation: GeoLocation | null;
    locationPermission: LocationPermission | null;
    isFetchingCurrentLocation: boolean;
    fetchCurrentLocationStatus: RequestStatus | null;
    getCurrentLocation: () => Promise<GeoLocation | null>;
    resetLocationState: () => void;
    checkGeolocationPermission: () => Promise<boolean>;
};
