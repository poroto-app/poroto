import { Place } from "src/domain/models/Place";
import { Transition } from "src/domain/models/Transition";
import { User } from "src/domain/models/User";
import { PriceRange } from "./PriceRange";

export type Plan = {
    id: string;
    title: string;
    places: Place[];
    timeInMinutes: number;
    transitions: Transition[];
    author: User | null;
};

export function getPlanPriceRange(places: Place[]): PriceRange {
    let totalMinPrice = 0;
    let totalMaxPrice = 0;

    for (const place of places) {
        if (place.priceRange) {
            totalMinPrice += place.priceRange.min;
            totalMaxPrice += place.priceRange.max;
        }
    }

    const totalPriceRange: PriceRange = {
        min: totalMinPrice,
        max: totalMaxPrice,
        googlePriceLevel: 0,
    };

    return totalPriceRange;
}
