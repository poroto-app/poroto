import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { LottiePlayerProps } from "src/types/props";

export function LottiePlayer({
    animationData,
    loop = true,
    segments,
    transform,
}: LottiePlayerProps) {
    const lottieViewRef = useRef<LottieView>();

    useEffect(() => {
        if (segments) lottieViewRef.current.play(segments.start, segments.end);
        else lottieViewRef.current.play();
    }, []);

    return (
        <LottieView
            ref={lottieViewRef}
            autoPlay={false}
            loop={loop}
            source={animationData}
            style={{
                transform,
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            }}
        />
    );
}
