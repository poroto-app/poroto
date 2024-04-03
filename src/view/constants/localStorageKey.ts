export const LocalStorageKeys = {
    PlanCandidate: "created_plan_candidates",
};
export type LocalStorageKey =
    (typeof LocalStorageKeys)[keyof typeof LocalStorageKeys];
