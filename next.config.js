module.exports = {
    distDir: 'build',  // Google App Engineが.nextディレクトリを読み込め無いため、buildに変更する必要がある。
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {},
};