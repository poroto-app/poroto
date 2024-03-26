export const AnalyticsEvents = {
    CreatePlanFromCurrentLocation: "create_plan_from_current_location",
    CreatePlanFromSelectedLocation: "create_plan_from_selected_location",
    CreatePlan: {
        FromLikePlace: "create_plan_from_like_place",
    },
    SavePlan: "save_plan",
    EditPlan: {
        Like: "edit_plan_like",
        AutoReorder: "edit_plan_auto_reorder",
    },
};
export type AnalyticsEvent =
    (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];
