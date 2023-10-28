import { PlaceEntity } from "src/domain/models/PlaceEntity";

export type PlanEntity = {
    id: string;
    title: string;
    places: PlaceEntity[];
    timeInMinutes: number;
    transitions: {
        fromPlaceId?: string;
        toPlaceId: string;
        durationInMinutes: number;
    }[];
};
