export const AnalyticsEvents = {
    CreatePlan: "create_plan",
    CreatePlanFromCurrentLocation: "create_plan_from_current_location",
    CreatePlanFromSelectedLocation: "create_plan_from_selected_location",
};
export type AnalyticsEvent =
    (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];
