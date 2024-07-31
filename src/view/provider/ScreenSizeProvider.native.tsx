import { ReactNode } from "react";
import { LayoutChangeEvent } from "react-native";
import { setScreenWidth } from "src/redux/native";
import { useAppDispatch } from "src/redux/redux";
import { View } from "tamagui";

// Android で画面分割をしたときにも適切に画面サイズを取得するための Provider
// Dimensions API や useWindowDimensions では画面分割時に正しい値を取得できない
export function ScreenSizeProvider({ children }: { children?: ReactNode }) {
    const dispatch = useAppDispatch();

    const handleOnLayout = (e: LayoutChangeEvent) => {
        dispatch(setScreenWidth(e.nativeEvent.layout.width));
    };
    return (
        <View width="100%" height="100%" onLayout={handleOnLayout}>
            {children}
        </View>
    );
}
