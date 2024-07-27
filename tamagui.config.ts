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
})

export type AppConfig = typeof tamaguiConfig

declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;