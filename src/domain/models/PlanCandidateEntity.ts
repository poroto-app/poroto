import { PlanEntity } from "src/domain/models/PlanEntity";

export type PlanCandidateEntity = {
    id: string;
    plans: PlanEntity[];
    likedPlaceIds: string[];
    createdBasedONCurrentLocation: boolean;
};
