export const LocalStorageKeys = {
    PlanCandidate: "created_plan_candidates",
    LoggedIn: "logged_in",
};
export type LocalStorageKey =
    (typeof LocalStorageKeys)[keyof typeof LocalStorageKeys];
