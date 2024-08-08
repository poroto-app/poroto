import { XStack } from "tamagui";

export function StoryImagePreviewTapPagerOverlay({
    onClickPrev,
    onClickNext,
}: {
    onClickPrev?: () => void;
    onClickNext?: () => void;
}) {
    return (
        <XStack position="absolute" top={0} right={0} bottom={0} left={0}>
            <XStack flex={1} h="100%" onPress={onClickPrev} />
            <XStack flex={1} h="100%" onPress={onClickNext} />
        </XStack>
    );
}
