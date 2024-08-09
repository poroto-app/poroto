import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";
import { LottiePlayer } from "src/view/common/LottiePlayer";
import { RoundedButton } from "src/view/common/RoundedButton";
import { RoundedDialog } from "src/view/common/RoundedDialog";
import animationDataCreating from "src/view/lottie/creating_map.json";
import animationDataFailed from "src/view/lottie/fail.json";

type Props = {
    onClose: () => void;
    failed: boolean;
    visible: boolean;
};

export function GeneratingPlanDialog({ visible, failed, onClose }: Props) {
    const handleOnClickOutside = () => {
        if (failed) {
            onClose();
        }
    };

    return (
        <FullscreenDialog
            visible={visible}
            onClickOutside={handleOnClickOutside}
            width="100%"
            height={500}
            maxWidth={500}
            maxHeight="100%"
            paddingX="16px"
            paddingY="32px"
        >
            <RoundedDialog h="100%">
                <Center w="100%" h="100%" px="16px" py="32px">
                    {failed ? <Failed onClose={onClose} /> : <Generating />}
                </Center>
            </RoundedDialog>
        </FullscreenDialog>
    );
}

function Generating() {
    const { t } = useAppTranslation();
    return (
        <VStack>
            <Box position="relative" h="100px" w="100%" my="32px">
                <LottiePlayer
                    animationData={animationDataCreating}
                    transform={"scale3d(1.5, 1.5, 1)"}
                />
            </Box>
            <Text fontSize="24px" fontWeight="bold">
                {t("plan:planCreatingTitle")}
            </Text>
        </VStack>
    );
}

function Failed({ onClose }: { onClose: () => void }) {
    const { t } = useAppTranslation();
    return (
        <VStack spacing="16px">
            <VStack>
                <Box position="relative" h="250px" w="100%">
                    <LottiePlayer
                        animationData={animationDataFailed}
                        loop={false}
                        segments={{
                            start: 0,
                            end: 193,
                        }}
                    />
                </Box>
                <Text fontSize="24px" fontWeight="bold">
                    {t("plan:planCreateFailedTitle")}
                </Text>
            </VStack>
            <RoundedButton onClick={onClose}>{t("common:close")}</RoundedButton>
        </VStack>
    );
}
