export const AnalyticsEvents = {
    CreatePlan: "create_plan",
};
export type AnalyticsEvent =
    (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];
