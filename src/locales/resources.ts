import { AccountTranslationEn } from "src/locales/en/account";
import { CommonTranslationEn } from "src/locales/en/common";
import { ErrorTranslationEn } from "src/locales/en/error";
import { HomeTranslationEn } from "src/locales/en/home";
import { LocationTranslationEn } from "src/locales/en/location";
import { NavigationTranslationEn } from "src/locales/en/navigation";
import { OgpTranslationEn } from "src/locales/en/ogp";
import { PlaceTranslationEn } from "src/locales/en/place";
import { PlanTranslationEn } from "src/locales/en/plan";
import { PwaTranslationEn } from "src/locales/en/pwa";
import { AccountTranslationJa } from "src/locales/ja/account";
import { CommonTranslationJa } from "src/locales/ja/common";
import { ErrorTranslationJa } from "src/locales/ja/error";
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
    ErrorTranslationKeys,
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
    error: ErrorTranslationKeys;
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
        error: ErrorTranslationJa,
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
        error: ErrorTranslationEn,
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
