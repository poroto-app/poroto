import { createPlaceFromPlaceEntity } from "src/domain/factory/Place";
import { Plan } from "src/domain/models/Plan";
import { PlanEntity } from "src/domain/models/PlanEntity";

export function createPlanFromPlanEntity(entity: PlanEntity): Plan {
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
        author:
            entity.author === null
                ? null
                : {
                      id: entity.author.id,
                      name: entity.author.name,
                      avatarImage: entity.author.photoUrl,
                  },
    };
}
