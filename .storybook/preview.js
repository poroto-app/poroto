import {ChakraProvider} from "@chakra-ui/react";
import {PortalProvider, TamaguiProvider} from "tamagui";
import {Theme} from "../src/view/common/Theme";
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {I18nextProvider} from "react-i18next";
import {useEffect} from "react";
import i18n from "./i18n";
import tamaguiConfig from "./tamagui.config";

const withChakra = (StoryFn) => {
    return (
        <ChakraProvider>
            <Theme/>
            <StoryFn/>
        </ChakraProvider>
    );
};

const withTamagui = (StoryFn) => {
    return (
        <TamaguiProvider
            config={tamaguiConfig}
            defaultTheme="light"
        >
            <PortalProvider>
                <StoryFn/>
            </PortalProvider>
        </TamaguiProvider>
    );
}

const withI18n = (StoryFn, context) => {
    const {locale} = context.globals;

    useEffect(() => {
        i18n.changeLanguage(locale);
    }, [locale]);

    return (
        <I18nextProvider i18n={i18n}>
            <StoryFn/>
        </I18nextProvider>
    );
}

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        matchers: {
            color: /(background|color)$/,
            date: /Date$/,
        },
    },
    viewport: {
        viewports: INITIAL_VIEWPORTS,
        defaultViewport: 'responsive',
    },
}

export const decorators = [
    withChakra,
    withTamagui,
    withI18n,
];