const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions"
    ],
    "framework": "@storybook/react",
    "core": {
        "builder": "@storybook/builder-webpack5"
    },
    staticDirs: ['../public'],
    webpackFinal(config) {
        config.resolve.modules = [
            ...(config.resolve.modules || []),
            path.resolve(__dirname, '../src')
        ];

        // typescript
        config.resolve.plugins = [
            ...(config.resolve.plugins || []),
            new TsconfigPathsPlugin()
        ];

        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            "@emotion/core": toPath("node_modules/@emotion/react"),
            "emotion-theming": toPath("node_modules/@emotion/react"),
        };

        // SVGをインポートできるようにする
        config.resolve.extensions.push('.svg');
        config.module.rules = config.module.rules.map(data => {
            if (/svg\|/.test(String(data.test)))
                data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
            return data;
        });
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
}