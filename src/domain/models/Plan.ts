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
    priceRangeMin: number;
    priceRangeMax: number;
    googlePriceLevel: number;
};

export function getPlanPriceRange(places: Place[]): PriceRange {
    // const placesWithPrice = places.filter(place => place.priceRange !== null);

    let totalMinPrice = 0;
    let totalMaxPrice = 0;
    let totalGooglePriceLevel = 0;

    for (const place of places) {
        if (place.priceRange) {
            totalMinPrice += place.priceRange.priceRangeMin;
            totalMaxPrice += place.priceRange.priceRangeMax;
            totalGooglePriceLevel += place.priceRange.googlePriceLevel;
        }
    }

    const totalPriceRange: PriceRange = {
        priceRangeMin: totalMinPrice,
        priceRangeMax: totalMaxPrice,
        googlePriceLevel: totalGooglePriceLevel,
    };

    return totalPriceRange;
}
