import { Namespace } from "i18next";
import { useTranslation } from "next-i18next";
import { UseTranslationResponse } from "react-i18next";

export const useAppTranslation = (): UseTranslationResponse<
    Namespace,
    string
> => {
    return useTranslation();
};
