import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { CommonTranslationJa } from "src/locales/ja/common";
import { HomeTranslationJa } from "src/locales/ja/home";
import { PlaceTranslationJa } from "src/locales/ja/place";
import { PlanTranslationJa } from "src/locales/ja/plan";
import {
    CommonTranslationKeys,
    HomeTranslationKeys,
    PlaceTranslationKeys,
    PlanTranslationKeys,
} from "src/locales/type";

export type TranslationResourceType = {
    common: CommonTranslationKeys;
    home: HomeTranslationKeys;
    plan: PlanTranslationKeys;
    place: PlaceTranslationKeys;
};

export const resources: {
    [key: string]: TranslationResourceType;
} = {
    ja: {
        common: CommonTranslationJa,
        home: HomeTranslationJa,
        plan: PlanTranslationJa,
        place: PlaceTranslationJa,
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
