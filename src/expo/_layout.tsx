import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { getLocales } from "expo-localization";
import { SplashScreen } from "expo-router";
import { Stack } from "expo-router/stack";
import i18n from "i18next";
import { useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";
import { Provider } from "react-redux";
import { i18nAppConfig } from "src/locales/i18n";
import { reduxStore } from "src/redux/redux";
import tamaguiConfig from "src/tamagui/tamagui.config";
import { NavBar } from "src/view/navigation/NavBar";
import { AppToastProvider } from "src/view/provider/AppToastProvider";
import { ScreenSizeProvider } from "src/view/provider/ScreenSizeProvider.native";
import { TamaguiProvider } from "tamagui";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [languageLoaded, setLanguageLoaded] = useState(false);
    const [language, setLanguage] = useState<string | null>();
    const [interLoaded, interError] = useFonts({
        Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
        InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    });

    // 端末の言語設定を取得
    useEffect(() => {
        const getSystemLanguageAndSet = async () => {
            return getLocales()?.[0]?.languageTag ?? "en";
        };

        getSystemLanguageAndSet().then((phoneLocale) => {
            setLanguage(phoneLocale);
        });
    }, []);

    // i18nの初期化
    useEffect(() => {
        if (!language) return;

        i18n.use(initReactI18next).init({
            ...i18nAppConfig,
            lng: language,
        });
        setLanguageLoaded(true);
    }, [language]);

    // フォントと端末の言語設定取得が完了したらスプラッシュスクリーンを非表示にする
    useEffect(() => {
        if (interLoaded || interError || languageLoaded) {
            SplashScreen.hideAsync();
        }
    }, [interLoaded, interError]);

    if (!interLoaded || !languageLoaded) {
        return <></>;
    }

    return (
        <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
            <ThemeProvider value={DefaultTheme}>
                <Provider store={reduxStore}>
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
                </Provider>
            </ThemeProvider>
        </TamaguiProvider>
    );
}
