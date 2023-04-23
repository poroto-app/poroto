import {Button, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack} from "@chakra-ui/react";
import {Colors} from "src/view/constants/color";
import {useState} from "react";

type Props = {
    onClickNext: (duration: number) => void,
    onClickIgnoreDuration: () => void,
}

export const PlanDurationSelector = ({onClickNext, onClickIgnoreDuration}: Props) => {
    const [duration, setDuration] = useState(10);

    return <VStack w="100%" h="100%">
        <VStack w="100%" spacing="32px" flex="1" justifyContent="center">
            <Text fontSize="1.75rem">{duration}分</Text>
            <Slider
                w="100%"
                min={10} max={60 * 5} value={duration} defaultValue={10} onChange={setDuration}
                step={10}
            >
                <SliderTrack>
                    <SliderFilledTrack/>
                </SliderTrack>
                <SliderThumb boxSize={6} border="1px solid rgba(0,0,0,.2)"/>
            </Slider>
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