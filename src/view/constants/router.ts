export const Routes = {
    home: "/",
    plans: {
        plan: (id: string) => `/plans/${id}`,
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
