import { HStack } from "@chakra-ui/react";
import { PriceRange } from "src/domain/models/PriceRange";
import {
    PlanSummaryBudget,
    PlanSummaryDuration,
} from "src/view/plan/PlanSummary";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";

type Props = {
    planDurationInMinutes: number;
    planRange: PriceRange;
};

export function PlanPageSectionSummary({
    planDurationInMinutes,
    planRange,
}: Props) {
    return (
        <PlanPageSection title="プランの情報">
            <HStack w="100%" overflowX="auto" pb={4}>
                <PlanSummaryDuration
                    durationInMinutes={planDurationInMinutes}
                />
                {(planRange.min !== 0 || planRange.max !== 0) && (
                    <PlanSummaryBudget
                        MinBudget={planRange.min}
                        MaxBudget={planRange.max}
                    />
                )}
            </HStack>
        </PlanPageSection>
    );
}
