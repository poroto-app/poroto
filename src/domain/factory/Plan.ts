import { createPlaceFromPlaceEntity } from "src/domain/factory/Place";
import { Plan } from "src/domain/models/Plan";
import { PlanEntity } from "src/domain/models/PlanEntity";
import { User } from "src/domain/models/User";

export function createPlanFromPlanEntity(
    entity: PlanEntity,
    author: User | null
): Plan {
    return {
        id: entity.id,
        title: entity.title,
        places: entity.places.map((place) => createPlaceFromPlaceEntity(place)),
        timeInMinutes: entity.timeInMinutes,
        transitions: entity.transitions.map((transition) => ({
            fromPlaceId: transition.fromPlaceId,
            toPlaceId: transition.toPlaceId,
            durationInMinutes: transition.durationInMinutes,
        })),
        author,
    };
}
