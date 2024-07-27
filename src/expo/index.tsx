import { CreatePlanSection } from "src/view/top/CreatePlanSection";
import { View, YStack } from "tamagui";

export default function HomeScreen() {
    return (
        <YStack h="100%" w="100%">
            <CreatePlanSection />
            <View w="100%" flex={1} backgroundColor="gray" />
        </YStack>
    );
}
