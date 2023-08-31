export const Routes = {
    home: "/",
    plans: {
        plan: (id: string) => `/plans/${id}`,
        interest: (byLocation?: boolean) => {
            let url = "/plans/interest";
            if (byLocation) url += "?location=true";
            return url;
        },
        select: (session: string) => `/plans/select/${session}`,
        planCandidate: (session: string, planId: string) =>
            `/plans/select/${session}/${planId}`,
    },
    places: {
        search: "/places/search",
    },
};
