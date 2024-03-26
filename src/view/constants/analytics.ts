export const AnalyticsEvents = {
    CreatePlan: {
        FromLikePlace: "create_plan_from_like_place",
        FromCurrentLocation: "create_plan_from_current_location",
        FromSelectedLocation: "create_plan_from_selected_location",

        // 実際に作成を行った
        Create: "create_plan",
    },
    SavePlan: "save_plan",
    EditPlan: {
        Like: "edit_plan_like",
        AutoReorder: "edit_plan_auto_reorder",
    },
    ViewPlan: "view_plan",
    CopyPlanUrl: "copy_plan_url",
};
export type AnalyticsEvent =
    (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];
