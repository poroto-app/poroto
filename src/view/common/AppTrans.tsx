import { ParseKeys, type Namespace, type TOptions } from "i18next";
import { Trans, useTranslation } from "react-i18next";
import { TranslationNameSpaces } from "src/locales/i18n";

export function AppTrans({
    i18nKey,
    values,
}: {
    i18nKey: ParseKeys<Namespace, TOptions, string>;
    values?: {};
}) {
    const { t } = useTranslation();
    return (
        <Trans
            t={t}
            tOptions={{
                ns: TranslationNameSpaces,
            }}
            i18nKey={i18nKey}
            values={values}
        />
    );
}