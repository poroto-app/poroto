import {ChakraProvider} from "@chakra-ui/react";
import {Theme} from "../src/view/common/Theme";

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
}

export const decorators = [withChakra];