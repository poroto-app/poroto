import { GeoLocation } from "src/domain/models/GeoLocation";

export const RouteParams = {
    SkipCurrentLocation: "skipCurrentLocation",
};
export type RouteParam = (typeof RouteParams)[keyof typeof RouteParams];

export const Routes = {
    home: "/",
    search: "/search",
    account: "/account",
    plans: {
        plan: (id: string) => `/plans/${id}`,
        interest: ({
            location,
            googlePlaceId,
        }: {
            location?: GeoLocation;
            googlePlaceId?: string;
        }) => {
            let url = "/plans/interest";
            const urlParams = new URLSearchParams();

            if (location) {
                urlParams.append("lat", location.latitude.toString());
                urlParams.append("lng", location.longitude.toString());
            }

            if (googlePlaceId) {
                urlParams.append("googlePlaceId", googlePlaceId);
            }

            if (urlParams.toString()) {
                url += `?${urlParams.toString()}`;
            }

            return url;
        },
        planCandidate: {
            index: (planCandidateId: string) =>
                `/plans/select/${planCandidateId}`,
        },
    },
    places: {
        search: ({
            skipCurrentLocation,
        }: {
            skipCurrentLocation?: boolean;
        }) => {
            let url = "/places/search";
            if (skipCurrentLocation)
                url += `?${RouteParams.SkipCurrentLocation}=true`;
            return url;
        },
    },
};
