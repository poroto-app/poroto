import tamaguiConfig from "src/tamagui/tamagui.config";

export type AppConfig = typeof tamaguiConfig;

declare module "tamagui" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface TamaguiCustomConfig extends AppConfig {}
}
