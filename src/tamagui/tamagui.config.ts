import { config as configBase } from "@tamagui/config/v3";
import { createTamagui, CreateTamaguiProps } from "tamagui";

const tamaguiProps: CreateTamaguiProps = {
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
};

const tamaguiConfig = createTamagui({
    ...configBase,
    ...tamaguiProps,
});

export default tamaguiConfig;
