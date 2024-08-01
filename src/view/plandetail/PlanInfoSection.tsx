import { Padding } from "src/constant/padding";
import { PriceRange } from "src/domain/models/PriceRange";
import {
    PlanInfoTagBudget,
    PlanInfoTagDuration,
} from "src/view/plandetail/header/PlanInfoTag";
import { YStack } from "tamagui";

export function PlanInfoSection({
    durationInMinutes,
    priceRange,
}: {
    durationInMinutes: number;
    priceRange: PriceRange;
}) {
    return (
        <YStack gap={Padding.p4} w="100%" alignSelf="center">
            <PlanInfoTagDuration durationInMinutes={durationInMinutes} />
            {(priceRange.min !== 0 || priceRange.max !== 0) && (
                <PlanInfoTagBudget
                    minBudget={priceRange.min}
                    maxBudget={priceRange.max}
                />
            )}
        </YStack>
    );
}
