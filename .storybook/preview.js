import {ChakraProvider} from "@chakra-ui/react";
import {Theme} from "../src/view/common/Theme";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

const withChakra = (StoryFn) => {
    return (
        <ChakraProvider>
            <Theme/>
            <StoryFn/>
        </ChakraProvider>
    );
};

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

export const decorators = [withChakra];