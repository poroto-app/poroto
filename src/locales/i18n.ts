import { InitOptions } from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import ChainedBackend from "i18next-chained-backend";
import resourcesToBackend from "i18next-resources-to-backend";
import { UserConfig } from "next-i18next";
import { initReactI18next } from "react-i18next";
import { AccountTranslationEn } from "src/locales/en/account";
import { CommonTranslationEn } from "src/locales/en/common";
import { HomeTranslationEn } from "src/locales/en/home";
import { LocationTranslationEn } from "src/locales/en/location";
import { NavigationTranslationEn } from "src/locales/en/navigation";
import { OgpTranslationEn } from "src/locales/en/ogp";
import { PlaceTranslationEn } from "src/locales/en/place";
import { PlanTranslationEn } from "src/locales/en/plan";
import { PwaTranslationEn } from "src/locales/en/pwa";
import { AccountTranslationJa } from "src/locales/ja/account";
import { CommonTranslationJa } from "src/locales/ja/common";
import { HomeTranslationJa } from "src/locales/ja/home";
import { LocationTranslationJa } from "src/locales/ja/location";
import { NavigationTranslationJa } from "src/locales/ja/navigation";
import { OgpTranslationJa } from "src/locales/ja/ogp";
import { PlaceTranslationJa } from "src/locales/ja/place";
import { PlanTranslationJa } from "src/locales/ja/plan";
import { PwaTranslationJa } from "src/locales/ja/pwa";
import {
    AccountTranslationKeys,
    CommonTranslationKeys,
    HomeTranslationKeys,
    LocationTranslationKeys,
    NavigationTranslationKeys,
    OgpTranslationKeys,
    PlaceTranslationKeys,
    PlanTranslationKeys,
    PwaTranslationKeys,
} from "src/locales/type";

export type TranslationResourceType = {
    common: CommonTranslationKeys;
    account: AccountTranslationKeys;
    home: HomeTranslationKeys;
    location: LocationTranslationKeys;
    navigation: NavigationTranslationKeys;
    ogp: OgpTranslationKeys;
    place: PlaceTranslationKeys;
    plan: PlanTranslationKeys;
    pwa: PwaTranslationKeys;
};

export const translationResources: {
    [key: string]: TranslationResourceType;
} = {
    ja: {
        common: CommonTranslationJa,
        account: AccountTranslationJa,
        home: HomeTranslationJa,
        location: LocationTranslationJa,
        navigation: NavigationTranslationJa,
        ogp: OgpTranslationJa,
        plan: PlanTranslationJa,
        place: PlaceTranslationJa,
        pwa: PwaTranslationJa,
    },
    en: {
        common: CommonTranslationEn,
        account: AccountTranslationEn,
        home: HomeTranslationEn,
        location: LocationTranslationEn,
        navigation: NavigationTranslationEn,
        ogp: OgpTranslationEn,
        plan: PlanTranslationEn,
        place: PlaceTranslationEn,
        pwa: PwaTranslationEn,
    },
} as const;

export const TranslationNameSpaces = Object.keys(
    translationResources
) as (keyof TranslationResourceType)[];

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
