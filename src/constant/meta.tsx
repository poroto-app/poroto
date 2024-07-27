import { TFunction } from "i18next";

export const PageMetaData = (t: TFunction) => ({
    top: {
        title: t("ogp:topPageTitle"),
        description: t("ogp:topPageDescription"),
    },
    place: {
        search: {
            title: t("ogp:placeSearchPageTitle"),
            description: t("ogp:placeSearchPageDescription"),
        },
    },
    plans: {
        interest: {
            title: (fromCurrentLocation: boolean) =>
                fromCurrentLocation
                    ? t("ogp:planInterestPageFromCurrentLocationTitle")
                    : t("ogp:planInterestPageFromSelectedPlaceTitle"),
            description: t("ogp:planInterestPageDescription"),
        },
    },
});
