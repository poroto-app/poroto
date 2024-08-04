import { Padding } from "src/constant/padding";
import { FadeInFadeOutTransition } from "src/view/animation/FadeinFadeoutTransition";
import { RotateTransition } from "src/view/animation/RotateTransition";
import MapIcon from "src/view/assets/svg/map_gradation.svg";
import { Dialog, Text, XStack, YStack } from "tamagui";

type Props = {
    title: string;
};

export const LoadingModal = ({ title }: Props) => {
    return (
        <Dialog open={true} modal>
            <Dialog.Portal>
                <Dialog.Content
                    alignItems="center"
                    justifyContent="center"
                    w="100%"
                    h="100%"
                    flex={1}
                    elevate={false}
                >
                    <YStack gap={Padding.p64} alignItems="center">
                        <XStack w={100} h={100}>
                            <RotateTransition>
                                <FadeInFadeOutTransition>
                                    <MapIcon
                                        viewBox="0 0 80 85"
                                        width={100}
                                        height={100}
                                    />
                                </FadeInFadeOutTransition>
                            </RotateTransition>
                        </XStack>
                        <Text
                            px={Padding.p16}
                            maxWidth="100%"
                            fontSize={20}
                            color="#4E6382"
                        >
                            {title}
                        </Text>
                    </YStack>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
};
