import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { getLocales } from "expo-localization";
import { Stack } from "expo-router/stack";
import i18n from "i18next";
import { useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";
import { useColorScheme } from "react-native";
import { i18nAppConfig } from "src/locales/i18n";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "tamagui.config";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [languageLoaded, setLanguageLoaded] = useState(false);
    const [language, setLanguage] = useState<string | null>();

    useEffect(() => {
        const getSystemLanguageAndSet = async () => {
            return getLocales()?.[0]?.languageTag ?? "en";
        };

        getSystemLanguageAndSet().then((phoneLocale) => {
            setLanguage(phoneLocale);
        });
    }, []);

    useEffect(() => {
        if (!language) return;

        i18n.use(initReactI18next).init({
            ...i18nAppConfig,
            lng: language,
        });
        setLanguageLoaded(true);
    }, [language]);

    if (!languageLoaded) {
        return <></>;
    }

    return (
        <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
            <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                </Stack>
            </ThemeProvider>
        </TamaguiProvider>
    );
}
