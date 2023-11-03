import { HStack } from "@chakra-ui/react";
import {
    PlanSummaryBudget,
    PlanSummaryDuration,
} from "src/view/plan/PlanSummary";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";

type Props = {
    planDurationInMinutes: number;
    planMinBudget: number;
    planMaxBudget: number;
};

export function PlanPageSectionSummary({
    planDurationInMinutes,
    planMinBudget,
    planMaxBudget,
}: Props) {
    return (
        <PlanPageSection title="プランの情報">
            <HStack w="100%" overflowX="auto" pb={4}>
                <PlanSummaryDuration
                    durationInMinutes={planDurationInMinutes}
                />
                <PlanSummaryBudget
                    MinBudget={planMinBudget}
                    MaxBudget={planMaxBudget}
                />
            </HStack>
        </PlanPageSection>
    );
}
