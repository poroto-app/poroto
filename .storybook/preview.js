import * as NextImage from "next/image";
import {ChakraProvider} from "@chakra-ui/react";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
    configurable: true,
    value: (props) => <OriginalNextImage {...props} unoptimized/>,
});

const withChakra = (StoryFn) => {
    return (
        <ChakraProvider>
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
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}

export const decorators = [withChakra];