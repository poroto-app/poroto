import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Slot } from "expo-router";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import tamaguiConfig from "tamagui.config";

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
            <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <SafeAreaView>
                    <Slot />
                </SafeAreaView>
            </ThemeProvider>
        </TamaguiProvider>
    );
}
