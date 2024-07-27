import { InitOptions } from "i18next";
import { translationResources } from "src/locales/resources";

export const i18nOptions: InitOptions = {};

export const i18nAppConfig = {
    // https://www.i18next.com/overview/configuration-options
    compatibilityJSON: "v3",
    i18n: {
        // ここを修正するときは next.config.mjs の i18n も修正する
        defaultLocale: "ja",
        locales: ["ja", "en"],
    },
    serializeConfig: false,
    resources: translationResources,
    supportedLngs: ["ja", "en"],
    fallbackLng: "ja",
    interpolation: {
        escapeValue: false,
    },
};
