export const Routes = {
    home: "/",
    plans: {
        interest: "/plans/interest",
        create: "/plans/create",
        select: (session: string) => `/plans/select/${session}`,
    }
}