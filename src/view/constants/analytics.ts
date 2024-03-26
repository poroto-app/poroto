export const AnalyticsEvents = {
    CreatePlan: "create_plan",
    CreatePlanFromCurrentLocation: "create_plan_from_current_location",
    CreatePlanFromSelectedLocation: "create_plan_from_selected_location",
    SavePlan: "save_plan",
    EditPlan: {
        Like: "edit_plan_like",
        AutoReorder: "edit_plan_auto_reorder",
    },
};
export type AnalyticsEvent =
    (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];
