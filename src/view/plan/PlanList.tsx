import { Padding } from "src/constant/padding";
import { PlanListProps } from "src/types/props";
import { PlanListGridLayout } from "src/view/plan/PlanListGridLayout";
import { PlanListHorizontalLayout } from "src/view/plan/PlanListHorizontalLayout";
import { PlanListLoadingSpinner } from "src/view/plan/PlanListLoadingSpinner";
import { isWeb, YStack } from "tamagui";

export function PlanList(props: PlanListProps) {
    return (
        <YStack w="100%" gap={Padding.p8} alignItems="center">
            {props.children}
            <Layout {...props} />
        </YStack>
    );
}

const Layout = (props: PlanListProps) => {
    if (props.grid) {
        return (
            <YStack w="100%">
                <PlanListGridLayout {...props} />
                {props.isLoading && isWeb && (
                    <PlanListLoadingSpinner grid={true} />
                )}
            </YStack>
        );
    }

    return <PlanListHorizontalLayout {...props} />;
};
