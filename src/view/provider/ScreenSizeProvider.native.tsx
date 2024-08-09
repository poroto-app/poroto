import { ReactNode, useEffect } from "react";
import { LayoutChangeEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { setSafeArea, setScreenSize } from "src/redux/native";
import { useAppDispatch } from "src/redux/redux";
import { View } from "tamagui";

// Android で画面分割をしたときにも適切に画面サイズを取得するための Provider
// Dimensions API や useWindowDimensions では画面分割時に正しい値を取得できない
export function ScreenSizeProvider({ children }: { children?: ReactNode }) {
    const dispatch = useAppDispatch();
    const { top, right, bottom, left } = useSafeAreaInsets();

    const handleOnLayout = (e: LayoutChangeEvent) => {
        dispatch(
            setScreenSize({
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height,
            })
        );
    };

    useEffect(() => {
        dispatch(setSafeArea({ top, right, bottom, left }));
    }, [top, right, bottom, left]);

    return (
        <View width="100%" height="100%" onLayout={handleOnLayout}>
            {children}
        </View>
    );
}
