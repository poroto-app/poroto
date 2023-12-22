import { Plan } from "src/domain/models/Plan";

export type PlanCandidate = {
    id: string;
    plans: Plan[];
    likedPlaceIds: string[];
    createdBasedONCurrentLocation: boolean;
};
