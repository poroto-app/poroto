import { HStack } from "@chakra-ui/react";
import {
    PlanSummaryBudget,
    PlanSummaryDuration,
} from "src/view/plan/PlanSummary";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { PriceRange } from "src/domain/models/PriceRange";


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
                <PlanSummaryBudget
                    MinBudget={planRange.min}
                    MaxBudget={planRange.max}
                />
            </HStack>
        </PlanPageSection>
    );
}
