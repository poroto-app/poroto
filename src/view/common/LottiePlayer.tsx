import { Box } from "@chakra-ui/react";
import { useLottie } from "lottie-react";
import { useEffect } from "react";
import { LottiePlayerProps } from "src/types/props";

export function LottiePlayer({
    animationData,
    loop = true,
    segments,
    transform,
}: LottiePlayerProps) {
    const {
        View: LottieView,
        play,
        playSegments,
    } = useLottie({
        animationData,
        loop,
        autoplay: false,
        style: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            transform,
        },
    });

    useEffect(() => {
        if (segments) playSegments([segments.start, segments.end], true);
        else play();
    }, []);

    return <Box>{LottieView}</Box>;
}
