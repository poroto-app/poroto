import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { AccountTranslationJa } from "src/locales/ja/account";
import { CommonTranslationJa } from "src/locales/ja/common";
import { HomeTranslationJa } from "src/locales/ja/home";
import { PlaceTranslationJa } from "src/locales/ja/place";
import { PlanTranslationJa } from "src/locales/ja/plan";
import {
    AccountTranslationKeys,
    CommonTranslationKeys,
    HomeTranslationKeys,
    PlaceTranslationKeys,
    PlanTranslationKeys,
} from "src/locales/type";

export type TranslationResourceType = {
    common: CommonTranslationKeys;
    account: AccountTranslationKeys;
    home: HomeTranslationKeys;
    place: PlaceTranslationKeys;
    plan: PlanTranslationKeys;
};

export const resources: {
    [key: string]: TranslationResourceType;
} = {
    ja: {
        common: CommonTranslationJa,
        account: AccountTranslationJa,
        home: HomeTranslationJa,
        plan: PlanTranslationJa,
        place: PlaceTranslationJa,
    },
} as const;

export const TranslationNameSpaces = Object.keys(
    resources
) as (keyof TranslationResourceType)[];

i18n.use(initReactI18next).init({
    resources,
    lng: "ja",
    fallbackLng: "ja",
    // lng: "",
    // fallbackLng: "",
    interpolation: {
        escapeValue: false,
    },
});
