import { Place } from "src/domain/models/Place";
import { Transition } from "src/domain/models/Transition";
import { User } from "src/domain/models/User";

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
