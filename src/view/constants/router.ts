export const RouteParams = {
    SkipCurrentLocation: "skipCurrentLocation",
};
export type RouteParam = (typeof RouteParams)[keyof typeof RouteParams];

export const Routes = {
    home: "/",
    plans: {
        plan: (id: string) => `/plans/${id}`,
        interest: (byLocation?: boolean) => {
            let url = "/plans/interest";
            if (byLocation) url += "?location=true";
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
