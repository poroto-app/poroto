import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { getLocales } from "expo-localization";
import { Stack } from "expo-router/stack";
import i18n from "i18next";
import { useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";
import { Provider } from "react-redux";
import { i18nAppConfig } from "src/locales/i18n";
import { reduxStore } from "src/redux/redux";
import { tamaguiConfigAnimation } from "src/tamagui/animation";
import tamaguiConfig from "src/tamagui/tamagui.config";
import { NavBar } from "src/view/navigation/NavBar";
import { AppToastProvider } from "src/view/provider/AppToastProvider";
import { ScreenSizeProvider } from "src/view/provider/ScreenSizeProvider.native";
import { TamaguiProvider } from "tamagui";

export default function RootLayout() {
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
        <Provider store={reduxStore}>
            <TamaguiProvider
                config={{
                    ...tamaguiConfig,
                    animations: tamaguiConfigAnimation,
                }}
                defaultTheme="light"
            >
                <ThemeProvider value={DefaultTheme}>
                    <ScreenSizeProvider>
                        <AppToastProvider>
                            <Stack
                                screenOptions={{
                                    headerShown: true,
                                    header: (props) => (
                                        <NavBar
                                            canGoBack={props.navigation.canGoBack()}
                                            onBack={props.navigation.goBack}
                                        />
                                    ),
                                }}
                            >
                                <Stack.Screen name="(tabs)" />
                            </Stack>
                        </AppToastProvider>
                    </ScreenSizeProvider>
                </ThemeProvider>
            </TamaguiProvider>
        </Provider>
    );
}
