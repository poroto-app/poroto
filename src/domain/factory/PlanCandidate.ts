import { createPlanFromPlanEntity } from "src/domain/factory/Plan";
import { PlanCandidate } from "src/domain/models/PlanCandidate";
import { PlanCandidateEntity } from "src/domain/models/PlanCandidateEntity";
import { User } from "src/domain/models/User";

export function createPlanCandidateFromPlanCandidateEntity(
    entity: PlanCandidateEntity,
    author: User | null
): PlanCandidate {
    return {
        id: entity.id,
        plans: entity.plans.map((plan) =>
            createPlanFromPlanEntity(plan, author)
        ),
        likedPlaceIds: entity.likedPlaceIds,
        createdBasedONCurrentLocation: entity.createdBasedONCurrentLocation,
    };
}
