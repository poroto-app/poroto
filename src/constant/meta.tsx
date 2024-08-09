import { TFunction } from "i18next";
import { useAppTranslation } from "src/hooks/useAppTranslation";

export const PageMetaData = (translation?: TFunction) => {
    const t = translation || useAppTranslation().t;
    return {
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
    };
};
