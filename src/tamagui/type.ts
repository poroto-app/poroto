import tamaguiConfig from "src/tamagui/tamagui.config";

export type AppConfig = typeof tamaguiConfig;

declare module "tamagui" {
    interface TamaguiCustomConfig extends AppConfig {}
}
