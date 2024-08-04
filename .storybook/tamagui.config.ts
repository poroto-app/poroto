import { createInterFont } from "@tamagui/font-inter";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/themes";
import { tamaguiConfigAnimation } from "src/tamagui/animation";
import { createTamagui } from "tamagui";
import {createAnimations} from "@tamagui/animations-css";

const headingFont = createInterFont();
const bodyFont = createInterFont();

const tamaguiConfig = createTamagui({
    themes,
    tokens,
    shorthands,
    fonts: {
        heading: headingFont,
        body: bodyFont,
    },
    media: {
        xs: { maxWidth: 700 },
        gtXs: { minWidth: 700 + 1 },
        sm: { maxWidth: 860 },
        gtSm: { minWidth: 860 + 1 },
        md: { maxWidth: 980 },
        gtMd: { minWidth: 980 + 1 },
        lg: { maxWidth: 1120 },
        gtLg: { minWidth: 1120 + 1 },
        short: { maxHeight: 820 },
        tall: { minHeight: 820 },
        hoverNone: { hover: "none" },
        pointerCoarse: { pointer: "coarse" },
    },
    // https://tamagui.dev/docs/core/animations
    animations: createAnimations({
        fast: `ease-in-out 150ms`,
        medium: `ease-in-out 300ms`,
        slow: `ease-in-out 450ms`,
    })
});

export default tamaguiConfig;
