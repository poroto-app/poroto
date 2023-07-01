import { HStack } from "@chakra-ui/react";
import { PlanSummaryDuration } from "src/view/plan/PlanSummary";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";

type Props = {
    planDurationInMinutes: number;
};

export function PlanPageSectionSummary({ planDurationInMinutes }: Props) {
    return (
        <PlanPageSection title="プランの情報">
            <HStack w="100%" overflowX="auto" pb={4}>
                <PlanSummaryDuration
                    durationInMinutes={planDurationInMinutes}
                />
            </HStack>
        </PlanPageSection>
    );
}
