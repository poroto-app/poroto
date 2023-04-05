declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // ==============================
            // Planner API
            // ==============================
            PLANNER_API_PROTOCOL: string
            PLANNER_API_HOST: string
            PLANNER_API_ENDPOINT: string
        }
    }
}