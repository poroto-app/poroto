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
            plan: (planCandidateId: string, planId: string) =>
                `/plans/select/${planCandidateId}/${planId}`,
        },
    },
    places: {
        search: "/places/search",
    },
};
