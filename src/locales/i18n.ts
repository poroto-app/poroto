import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { AccountTranslationJa } from "src/locales/ja/account";
import { CommonTranslationJa } from "src/locales/ja/common";
import { HomeTranslationJa } from "src/locales/ja/home";
import { NavigationTranslationJa } from "src/locales/ja/navigation";
import { OgpTranslationJa } from "src/locales/ja/ogp";
import { PlaceTranslationJa } from "src/locales/ja/place";
import { PlanTranslationJa } from "src/locales/ja/plan";
import { PwaTranslationJa } from "src/locales/ja/pwa";
import {
    AccountTranslationKeys,
    CommonTranslationKeys,
    HomeTranslationKeys,
    NavigationTranslationKeys,
    OgpTranslationKeys,
    PlaceTranslationKeys,
    PlanTranslationKeys,
    PwaTranslationKeys,
} from "src/locales/type";

export type TranslationResourceType = {
    common: CommonTranslationKeys;
    account: AccountTranslationKeys;
    navigation: NavigationTranslationKeys;
    ogp: OgpTranslationKeys;
    home: HomeTranslationKeys;
    place: PlaceTranslationKeys;
    plan: PlanTranslationKeys;
    pwa: PwaTranslationKeys;
};

export const resources: {
    [key: string]: TranslationResourceType;
} = {
    ja: {
        common: CommonTranslationJa,
        account: AccountTranslationJa,
        home: HomeTranslationJa,
        navigation: NavigationTranslationJa,
        ogp: OgpTranslationJa,
        plan: PlanTranslationJa,
        place: PlaceTranslationJa,
        pwa: PwaTranslationJa,
    },
} as const;

export const TranslationNameSpaces = Object.keys(
    resources
) as (keyof TranslationResourceType)[];

i18n.use(initReactI18next).init({
    resources,
    lng: "ja",
    fallbackLng: "ja",
    interpolation: {
        escapeValue: false,
    },
});
