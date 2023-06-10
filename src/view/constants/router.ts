export const Routes = {
    home: "/",
    plans: {
        interest: "/plans/interest",
        create: "/plans/create",
        select: (session: string) => `/plans/select/${session}`,
        planCandidate: (session: string, planId: string) =>
            `/plans/select/${session}/${planId}`,
    },
    places: {
        search: "/places/search",
    },
};
