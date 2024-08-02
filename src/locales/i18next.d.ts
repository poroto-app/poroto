import "i18next";
import { TranslationResourceType } from "src/locales/resources";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "common";
        resources: TranslationResourceType;
    }
}
