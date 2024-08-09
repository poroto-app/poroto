import { PlanCreateInterestPage } from "src/view/interest/PlanCreateInterestPage";
import { View } from "tamagui";

export default function InterestPage() {
    return (
        <View w="100%" h="100%" backgroundColor="white">
            <PlanCreateInterestPage navBar={false} />
        </View>
    );
}
