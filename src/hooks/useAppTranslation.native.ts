import { Namespace } from "i18next";
import { useTranslation, UseTranslationResponse } from "react-i18next";

export const useAppTranslation = (): UseTranslationResponse<
    Namespace,
    string
> => {
    return useTranslation();
};
