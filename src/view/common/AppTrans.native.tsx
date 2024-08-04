import { ParseKeys, type Namespace, type TOptions } from "i18next";
import { Trans } from "react-i18next";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { TranslationNameSpaces } from "src/locales/resources";
import { Text } from "tamagui";

export function AppTrans({
    i18nKey,
    values,
}: {
    i18nKey: ParseKeys<Namespace, TOptions, string>;
    values?: { [key: string]: string | number | JSX.Element };
}) {
    const { t } = useAppTranslation();
    return (
        <Trans
            t={t}
            tOptions={{
                ns: TranslationNameSpaces,
                interpolation: { escapeValue: false },
            }}
            components={{
                bold: <strong />,
                br: <Text>{"\n"}</Text>,
            }}
            i18nKey={i18nKey}
            values={values}
        />
    );
}
