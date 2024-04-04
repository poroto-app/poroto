import { Box } from "@chakra-ui/react";
import { useLottie } from "lottie-react";
import { AnimationSegment } from "lottie-web";
import { useEffect } from "react";

export function LottiePlayer(
    {
        animationData,
        loop = true,
        segments,
        style,
    }: {
        animationData: unknown;
        loop?: boolean;
        segments?: AnimationSegment;
        style?: React.CSSProperties;
    }
) {
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
            ...style,
        },
    });

    useEffect(() => {
        if (segments) playSegments(segments, true);
        else play();
    }, []);

    return <Box>{LottieView}</Box>;
}
