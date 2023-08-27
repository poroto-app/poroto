import { Box } from "@chakra-ui/react";
import { useLottie } from "lottie-react";
import { useEffect } from "react";

export function LottiePlayer({
    animationData,
    loop = true,
    style,
}: {
    animationData: unknown;
    loop?: boolean;
    style?: React.CSSProperties;
}) {
    const { View: LottieView, play } = useLottie({
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
        play();
    }, []);

    return <Box>{LottieView}</Box>;
}
