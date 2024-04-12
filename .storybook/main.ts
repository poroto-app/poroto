import type { StorybookConfig } from "@storybook/nextjs";
const config: StorybookConfig = {
  "stories": ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  "core": {},
  staticDirs: ['../public'],
  docs: {
    autodocs: true
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
    }
    return config
  },
};
export default config;