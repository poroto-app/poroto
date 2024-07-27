import { createInterFont } from "@tamagui/font-inter";
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'
import { createTamagui } from 'tamagui'

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
        hoverNone: { hover: 'none' },
        pointerCoarse: { pointer: 'coarse' },
    }
})

export type AppConfig = typeof tamaguiConfig

declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;