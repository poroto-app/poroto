import { PlaceEntity } from "src/domain/models/PlaceEntity";
import { UserEntity } from "src/domain/user/UserApi";

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
    priceRange?: {
        priceRangeMin: number;
        priceRangeMax: number;
        googlePriceLevel: number;
    };
    author: UserEntity | null;
};
