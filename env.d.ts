declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // ==============================
            // Planner API
            // ==============================
            PLANNER_API_PROTOCOL: string
            PLANNER_API_HOST: string
            PLANNER_API_ENDPOINT: string

            // ==============================
            // GCP
            // ==============================
            GCP_API_KEY: string

            // ==============================
            // Firebase
            // ==============================
            FIREBASE_API_KEY: string
            FIREBASE_AUTH_DOMAIN: string
            FIREBASE_PROJECT_ID: string
            FIREBASE_STORAGE_BUCKET: string
            FIREBASE_MESSAGING_SENDER_ID: string
            FIREBASE_APP_ID: string

            // ==============================
            // Google AdSense
            // ==============================
            ADSENSE_CLIENT: string
            ADSENSE_SLOT_TOP_PAGE_INFEED: string
        }
    }
}