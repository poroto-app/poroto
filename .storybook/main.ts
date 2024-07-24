import type {StorybookConfig} from "@storybook/nextjs";
import path from "path";
import {shouldExclude} from "tamagui-loader";
import {DefinePlugin} from "webpack";

const config: StorybookConfig = {
    "stories": ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {}
    },
    "core": {},
    staticDirs: ['../public'],
    docs: {
        autodocs: true
    },
    webpack: (config) => {
        if (config.resolve && config.resolve.alias) {
            config.resolve.alias = {
                ...config.resolve.alias,
                "next-i18next": "react-i18next",
            }
        }
        return config
    },
    webpackFinal: (config) => {
        if (config.module?.rules) {
            config.module.rules = config.module.rules.map((rule) => {
                // HACK: Override SVG loader to not use file-loader
                if (rule !== '...' && rule.test?.toString().indexOf('svg') !== -1) {
                    rule.exclude = /\.svg$/
                }
                return rule
            })

            config.module.rules.push({
                test: /\.svg$/,
                use: ['@svgr/webpack'],
                issuer: /\.tsx$/,
            })

            // tamagui
            // https://github.com/ralphwaked/tamagui-storybook-example/
            const projectRoot = path.resolve(__dirname, "..");
            config.resolve.extensions.unshift('.web.js');
            config.resolve.alias = {
                ...config.resolve.alias,
                'react-native$': 'react-native-web',
            }
            config.module.rules.push({
                test: /\.[jt]sx?$/,
                exclude: path => shouldExclude(path, projectRoot),
                use: [
                    {
                        loader: "tamagui-loader",
                        options: {
                            config: "tamagui.config.js",
                            components: ['tamagui'],
                            importsWhitelist: ['constants.js', 'colors.js'],
                            logTimings: true,
                            disableExtraction: process.env.NODE_ENV === 'development'
                        },
                    }
                ],
            });
            config.plugins.push(new DefinePlugin({'process.env.TAMAGUI_TARGET': '"web"'}))
        }
        return config
    },
};

export default config;