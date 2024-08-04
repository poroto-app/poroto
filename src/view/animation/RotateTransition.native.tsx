import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { RotateTransitionProps } from "src/types/props";

export const RotateTransition = ({
    children,
    duration = 1500,
}: RotateTransitionProps) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: duration,
                easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
                useNativeDriver: true,
            })
        ).start();

        return () => {
            rotateAnim.stopAnimation();
        };
    }, [rotateAnim, duration]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <Animated.View style={{ transform: [{ rotate }] }}>
            {children}
        </Animated.View>
    );
};
