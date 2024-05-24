export const AnalyticsEvents = {
    CreatePlan: {
        FromLikePlace: "create_plan_from_like_place",
        FromCurrentLocation: "create_plan_from_current_location",
        FromSelectedLocation: "create_plan_from_selected_location",
        FromPlaceNearbyPlan: "create_plan_from_place_nearby_plan",

        StartCreatePlanFromSelectedLocation:
            "start_create_plan_from_selected_location",

        // 実際に作成を行った
        Create: "create_plan",
    },
    Interests: {
        SelectCategory: "interests_select_category",
    },
    SavePlan: "save_plan",
    EditPlan: {
        Like: "edit_plan_like",
        AutoReorder: "edit_plan_auto_reorder",
    },
    Plan: {
        View: "plan_view",
        CopyPlanUrl: "copy_plan_url",
        Place: {
            SearchByGoogleMaps: "plan_place_search_by_google_maps",
            SearchByInstagram: "plan_place_search_by_instagram",
        },
    },
    User: {
        LoginStart: "login_start",
        Logout: "logout",
        BindPreLoginState: "bind_pre_login_state",
    },
    Pwa: {
        Install: "pwa_install",
        CancelOnPrompt: "pwa_cancel_on_prompt",
        Cancel: "pwa_cancel_install",
    },
};
export type AnalyticsEvent =
    (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];
