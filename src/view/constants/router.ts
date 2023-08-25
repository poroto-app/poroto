export const Routes = {
    home: "/",
    plans: {
        plan: (id: string) => `/plans/${id}`,
        interest: (byLocation?: boolean) =>
            "/plans/interest" + (byLocation && "?location=true"),
        select: (session: string) => `/plans/select/${session}`,
        planCandidate: (session: string, planId: string) =>
            `/plans/select/${session}/${planId}`,
    },
    places: {
        search: "/places/search",
    },
};
