import { Place } from "src/domain/models/Place";
import { Transition } from "src/domain/models/Transition";
import { User } from "src/domain/models/User";

export type Plan = {
    id: string;
    title: string;
    places: Place[];
    tags: PlanTag[];
    timeInMinutes: number;
    transitions: Transition[];
    author: User | null;
};

export type PlanTag = {
    content: string;
};
