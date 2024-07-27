import { InitOptions } from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import ChainedBackend from "i18next-chained-backend";
import resourcesToBackend from "i18next-resources-to-backend";
import { UserConfig } from "next-i18next";
import { initReactI18next } from "react-i18next";
import { translationResources } from "src/locales/resources";

export const i18nOptions: InitOptions = {};

export const i18nAppConfig: UserConfig = {
    i18n: {
        // ここを修正するときは next.config.mjs の i18n も修正する
        defaultLocale: "ja",
        locales: ["ja", "en"],
    },
    serializeConfig: false,
    use: [
        I18nextBrowserLanguageDetector,
        ChainedBackend,
        initReactI18next,
        resourcesToBackend(translationResources),
    ],
    resources: translationResources,
    detection: {
        // 言語検出の順番
        order: [
            "querystring",
            "cookie",
            "localStorage",
            "navigator",
            "htmlTag",
        ],
        // 言語情報を保存するキャッシュの方法
        caches: ["localStorage", "cookie"],
    },
    supportedLngs: ["ja", "en"],
    fallbackLng: "ja",
    interpolation: {
        escapeValue: false,
    },
};
