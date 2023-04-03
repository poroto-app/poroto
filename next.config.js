module.exports = {
    distDir: 'build',  // Google App Engineが.nextディレクトリを読み込め無いため、buildに変更する必要がある。
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        PLANNER_API_PROTOCOL: process.env.PLANNER_API_PROTOCOL,
        PLANNER_API_HOST: process.env.PLANNER_API_HOST,
        PLANNER_API_ENDPOINT: `${process.env.PLANNER_API_PROTOCOL}://${process.env.PLANNER_API_HOST}`
    },
};