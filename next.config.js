const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
    dest: 'public',
    fallbacks: {
        document: "/",
    },
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
    disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
    distDir: 'build',  // Google App Engineが.nextディレクトリを読み込め無いため、buildに変更する必要がある。
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        PLANNER_API_PROTOCOL: process.env.PLANNER_API_PROTOCOL,
        PLANNER_API_HOST: process.env.PLANNER_API_HOST,
        PLANNER_API_ENDPOINT: `${process.env.PLANNER_API_PROTOCOL}://${process.env.PLANNER_API_HOST}`,
        GCP_API_KEY: process.env.GCP_API_KEY,

        ADSENSE_CLIENT: process.env.ADSENSE_CLIENT,
        ADSENSE_SLOT_INARTICLE_PLAN_CANDIDATE: process.env.ADSENSE_SLOT_INARTICLE_PLAN_CANDIDATE,

        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,

    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
});