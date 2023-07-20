import { Place } from "src/domain/models/Place";
import { Transition } from "src/domain/models/Transition";

export type Plan = {
    id: string;
    title: string;
    places: Place[];
    tags: PlanTag[];
    timeInMinutes: number;
    transitions: Transition[];
};

export type PlanTag = {
    content: string;
};
