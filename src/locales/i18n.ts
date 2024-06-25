import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { CommonTranslationJa } from "src/locales/ja/common";
import { HomeTranslationJa } from "src/locales/ja/home";

export type TranslationResourceType = {
    common: typeof CommonTranslationJa;
    home: typeof HomeTranslationJa;
};

export const resources: {
    [key: string]: TranslationResourceType;
} = {
    ja: {
        common: CommonTranslationJa,
        home: HomeTranslationJa,
    },
} as const;

i18n.use(initReactI18next).init({
    resources,
    lng: "ja",
    fallbackLng: "ja",
    interpolation: {
        escapeValue: false,
    },
});
