import { HStack } from "@chakra-ui/react";
import { isPC } from "src/constant/userAgent";
import { PriceRange } from "src/domain/models/PriceRange";
import {
    PlanInfoTagBudget,
    PlanInfoTagDuration,
} from "src/view/plandetail/header/PlanInfoTag";

export function PlanInfoSection({
    durationInMinutes,
    priceRange,
}: {
    durationInMinutes: number;
    priceRange: PriceRange;
}) {
    return (
        <HStack
            spacing={2}
            w="100%"
            alignSelf="center"
            overflowX="auto"
            flexWrap={isPC ? "wrap" : "nowrap"}
            scrollSnapType="x mandatory"
            scrollPaddingLeft="16px"
        >
            <PlanInfoTagDuration durationInMinutes={durationInMinutes} />
            {(priceRange.min !== 0 || priceRange.max !== 0) && (
                <PlanInfoTagBudget
                    minBudget={priceRange.min}
                    maxBudget={priceRange.max}
                />
            )}
        </HStack>
    );
}
