import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";
import animationDataCreating from "src/view/lottie/creating_map.json";
import animationDataFailed from "src/view/lottie/fail.json";
import { LottiePlayer } from "src/view/common/LottiePlayer";
import { RoundedButton } from "src/view/common/RoundedButton";

type Props = {
    onClose: () => void;
    failed: boolean;
};

export function GeneratingPlanDialog({ failed, onClose }: Props) {
    const handleOnClickOutside = () => {
        if (failed) {
            onClose();
        }
    }

    return (
        <FullscreenDialog onClickOutside={handleOnClickOutside} width="100%" height="500px" maxWidth="500px" maxHeight="100%">
            <Dialog>{failed ? <Failed onClose={onClose}/> : <Generating />}</Dialog>
        </FullscreenDialog>
    );
}

function Generating() {
    return (
        <VStack>
            <Box position="relative" h="100px" w="100%" my="32px">
                <LottiePlayer animationData={animationDataCreating} style={{transform: "scale3d(1.5, 1.5, 1)"}} />
            </Box>
            <Text fontSize="24px" fontWeight="bold">プランを作成しています</Text>
        </VStack>
    );
}

function Failed({onClose}: {onClose: () => void}) {
    return (
        <VStack spacing="16px">
            <VStack>
                <Box position="relative" h="250px" w="100%">
                    <LottiePlayer animationData={animationDataFailed} />
                </Box>
                <Text fontSize="24px" fontWeight="bold">プランの作成に失敗しました</Text>
            </VStack>
            <RoundedButton onClick={onClose}>
                閉じる
            </RoundedButton>
        </VStack>
    );
}

function Dialog({ children }: { children?: ReactNode }) {
    return (
        <Center w="100%" h="100%" py="32px" px="16px">
            <Center
                w="100%"
                h="100%"
                px="16px"
                py="32px"
                backgroundColor="#FFF8F3"
                borderRadius="30px"
            >
                {children}
            </Center>
        </Center>
    );
}
