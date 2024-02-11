import { SimpleGrid } from "@chakra-ui/react";
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
        <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={2}
            w="100%"
            alignSelf="center"
            overflowX="auto"
            flexWrap={"wrap"}
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
        </SimpleGrid>
    );
}
