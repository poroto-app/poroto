import * as NextImage from "next/image";
import {ChakraProvider} from "@chakra-ui/react";
import {Theme} from "../src/view/common/Theme";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
    configurable: true,
    value: (props) => <OriginalNextImage {...props} unoptimized/>,
});

const withChakra = (StoryFn) => {
    return (
        <ChakraProvider>
            <Theme/>
            <div id="story-wrapper" style={{height: "100vh", display: "flex"}}>
                <StoryFn/>
            </div>
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