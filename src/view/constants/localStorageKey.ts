export const LocalStorageKeys = {
    PlanCandidate: "created_plan_candidates",
    LoggedIn: "logged_in",
    pwaInstalled: "pwa_installed",
    cancelInstallPwa: "cancel_pwa_install",
};
export type LocalStorageKey =
    (typeof LocalStorageKeys)[keyof typeof LocalStorageKeys];
