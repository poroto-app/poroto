import { HStack } from "@chakra-ui/react";
import { PlanPageSection } from "src/view/plan/PlanPageSection";
import { PlanSummaryDuration } from "src/view/plan/PlanSummary";

type Props = {
    planDurationInMinutes: number;
};

export function PlanPageSectionSummary({ planDurationInMinutes }: Props) {
    return (
        <PlanPageSection title="プランの情報">
            <HStack w="100%" overflowX="scroll" pb={4}>
                <PlanSummaryDuration
                    durationInMinutes={planDurationInMinutes}
                />
            </HStack>
        </PlanPageSection>
    );
}
