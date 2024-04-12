import {
    Box,
    Button,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useLottie } from "lottie-react";
import { useEffect, useState } from "react";
import { MdGraphicEq } from "react-icons/md";
import { DateHelper } from "src/domain/util/date";
import { RoundedButton } from "src/view/common/RoundedButton";
import { Colors } from "src/view/constants/color";
import animationData from "src/view/lottie/day-and-night-transition-scene.json";

type Props = {
    onClickNext: (duration: number) => void;
    onClickIgnoreDuration: () => void;
};

export const PlanDurationSelector = ({
    onClickNext,
    onClickIgnoreDuration,
}: Props) => {
    const minDuration = 0;
    const maxDuration = 60 * 5;
    const [, setFlame] = useState(10);
    const [duration, setDuration] = useState<number>(120);

    const handleOnClickNext = () => {
        if (duration === 0) {
            onClickNext(null);
        } else {
            onClickNext(duration);
        }
    };

    const { View: LottieView, goToAndStop } = useLottie({
        animationData,
        autoplay: false,
        style: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
    });

    useEffect(() => {
        const lastFrame = 300;
        const currentDuration = duration ?? minDuration;
        const percentage =
            (currentDuration - minDuration) / (maxDuration - minDuration);
        const targetFlame = Math.floor(percentage * lastFrame);

        const idInterval = setInterval(
            () => {
                setFlame((prevFlame) => {
                    // 速度を最終的な値との差分に応じて調整する
                    const speedToTarget =
                        Math.abs(targetFlame - prevFlame) / 20;
                    const speed = Math.max(speedToTarget, 3);

                    // 目標フレームに向かって進む
                    const direction = Math.sign(targetFlame - prevFlame);
                    const flame = prevFlame + speed * direction;
                    goToAndStop(flame, true);

                    // 目標フレームに近づいたら終了
                    if (Math.abs(flame - targetFlame) < 3) {
                        clearInterval(idInterval);
                    }

                    return flame;
                });
            },
            (1 / 24) * 1000
        );

        return () => {
            clearInterval(idInterval);
        };
    }, [duration]);

    return (
        <VStack w="100%" h="100%">
            <VStack w="100%" spacing="48px" flex="1" justifyContent="center">
                <Text fontSize="2rem">
                    {duration == 0
                        ? "時間は気にしない"
                        : DateHelper.formatHHMM(duration)}
                </Text>
                <Box
                    w="100%"
                    borderRadius="10px"
                    overflow="hidden"
                    flex="1"
                    position="relative"
                >
                    {LottieView}
                </Box>
                <Box w="100%" px="16px">
                    <Slider
                        w="100%"
                        min={minDuration}
                        max={maxDuration}
                        value={duration}
                        defaultValue={60}
                        onChange={setDuration}
                        step={60}
                    >
                        <SliderTrack>
                            <SliderFilledTrack bg={Colors.primary["400"]} />
                        </SliderTrack>
                        <SliderThumb
                            boxSize={6}
                            border="1px solid rgba(0,0,0,.2)"
                        >
                            <Box
                                color={Colors.primary["500"]}
                                as={MdGraphicEq}
                            />
                        </SliderThumb>
                    </Slider>
                </Box>
            </VStack>
            <VStack w="100%">
                <RoundedButton onClick={handleOnClickNext}>次へ</RoundedButton>
                <Button
                    color={Colors.primary["400"]}
                    variant="ghost"
                    w="100%"
                    onClick={onClickIgnoreDuration}
                >
                    時間は気にしない
                </Button>
            </VStack>
        </VStack>
    );
};
