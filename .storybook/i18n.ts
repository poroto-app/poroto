import i18n from 'i18next';
import {i18nAppConfig} from "src/locales/i18n";
import {initReactI18next} from "react-i18next";

i18n
    .use(initReactI18next)
    .init(i18nAppConfig);

export default i18n;