import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { FadeInFadeOutTransitionProps } from "src/types/props";

export function FadeInFadeOutTransition({
    duration = 750,
    children,
}: FadeInFadeOutTransitionProps) {
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fadeIn = Animated.timing(animation, {
            toValue: 1,
            duration: duration / 2,
            useNativeDriver: true,
        });

        const fadeOut = Animated.timing(animation, {
            toValue: 0,
            duration: duration / 2,
            useNativeDriver: true,
        });

        Animated.loop(Animated.sequence([fadeIn, fadeOut])).start();

        return () => {
            // コンポーネントのアンマウント時にアニメーションを停止
            animation.stopAnimation();
        };
    }, [animation, duration]);

    return (
        <Animated.View style={{ opacity: animation }}>{children}</Animated.View>
    );
}
