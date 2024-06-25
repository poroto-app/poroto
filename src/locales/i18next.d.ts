import "i18next";
import { TranslationResourceType } from "src/locales/i18n";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "common";
        resources: TranslationResourceType;
    }
}
