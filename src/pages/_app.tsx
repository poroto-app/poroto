import { ChakraProvider } from "@chakra-ui/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { appWithTranslation, useTranslation } from "next-i18next";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { PageMetaData } from "src/constant/meta";
import "src/locales/i18n";
import { i18nAppConfig } from "src/locales/i18n";
import { reduxStore } from "src/redux/redux";
import tamaguiConfig from "src/tamagui/tamagui.config";
import { Auth } from "src/view/common/Auth";
import { FirebaseProvider } from "src/view/common/FirebaseProvider";
import { Theme } from "src/view/common/Theme";
import { AppToastProvider } from "src/view/provider/AppToastProvider";
import { ErrorBoundary } from "src/view/provider/ErrorBoundary";
import { History } from "src/view/provider/History";
import { PortalProvider, TamaguiProvider } from "tamagui";

function App({ Component, pageProps }: AppProps) {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>{PageMetaData(t).top.title}</title>
                <meta
                    name="description"
                    content={PageMetaData(t).top.description}
                />
                <meta name="locale" content="ja" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,maximum-scale=1.0,minimum-scale=1"
                />
                <meta name="theme-color" content="#F7F5EE" />
                <link rel="manifest" href="/manifest.webmanifest" />
                <link
                    rel="apple-touch-icon"
                    href="/icons/icon-192x192.png"
                ></link>
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href="/favicon/favicon.svg"
                />
                <link rel="icon" type="image/png" href="/favicon/favicon.png" />
                {/* ogp */}
                <meta property="og:title" content={PageMetaData(t).top.title} />
                <meta property="og:site_name" content="komichi" />
                <meta
                    property="og:description"
                    content={PageMetaData(t).top.description}
                />
                <meta property="og:url" content="https://komichi.app/" />
                <meta
                    property="og:image"
                    content="https://komichi.app/ogp/ogp.png"
                />
                <meta property="og:type" content="website" />
            </Head>
            <Theme />
            {/* Google Analytics */}
            {process.env.APP_ENV === "production" && (
                <GoogleAnalytics
                    gaId={process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID}
                />
            )}
            <ChakraProvider>
                <Provider store={reduxStore}>
                    <ErrorBoundary>
                        <Auth />
                        <FirebaseProvider />
                        <History />
                        <TamaguiProvider
                            config={tamaguiConfig}
                            defaultTheme="light"
                            disableInjectCSS
                            disableRootThemeClass
                        >
                            <PortalProvider shouldAddRootHost>
                                <AppToastProvider>
                                    <Component {...pageProps} />
                                </AppToastProvider>
                            </PortalProvider>
                        </TamaguiProvider>
                    </ErrorBoundary>
                </Provider>
            </ChakraProvider>
        </>
    );
}

export default appWithTranslation(App, i18nAppConfig);
