import {Box, Button, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack} from "@chakra-ui/react";
import {Colors} from "src/view/constants/color";
import {useEffect, useState} from "react";
import {useLottie} from "lottie-react";
import animationData from "src/view/lottie/day-and-night-transition-scene.json";

type Props = {
    onClickNext: (duration: number) => void,
    onClickIgnoreDuration: () => void,
}

export const PlanDurationSelector = ({onClickNext, onClickIgnoreDuration}: Props) => {
    const minDuration = 10;
    const maxDuration = 60 * 5;
    const [duration, setDuration] = useState(10);

    const hour = Math.floor(duration / 60);
    const minute = duration - hour * 60;
    const hourStr = hour > 0 ? `${hour}時間` : "";
    const minuteStr = minute === 0 ? "" : `${minute.toString().padStart(2, "0")}分`;

    const {View: LottieView, goToAndStop} = useLottie({
        animationData,
        autoplay: false,
    });

    useEffect(() => {
        const lastFrame = 470;
        const percentage = (duration - minDuration) / (maxDuration - minDuration);
        console.log(percentage, percentage);
        goToAndStop(Math.floor(percentage * lastFrame), true);
    }, [duration]);

    return <VStack w="100%" h="100%">
        <VStack w="100%" spacing="48px" flex="1" justifyContent="center">
            <Text fontSize="2rem">{hourStr + minuteStr}</Text>
            <Box w="100%" borderRadius="10px" overflow="hidden">
                {LottieView}
            </Box>
            <Box w="100%" px="16px">
                <Slider
                    w="100%"
                    min={minDuration} max={maxDuration} value={duration} defaultValue={minDuration}
                    onChange={setDuration}
                    step={10}
                >
                    <SliderTrack>
                        <SliderFilledTrack/>
                    </SliderTrack>
                    <SliderThumb boxSize={6} border="1px solid rgba(0,0,0,.2)"/>
                </Slider>
            </Box>
        </VStack>
        <VStack w="100%">
            <Button
                backgroundColor={Colors.green} color="white" w="100%"
                onClick={() => onClickNext(duration)}
            >次へ</Button>
            <Button
                color={Colors.green} variant="ghost" w="100%"
                onClick={onClickIgnoreDuration}
            >時間は気にしない</Button>
        </VStack>
    </VStack>
}