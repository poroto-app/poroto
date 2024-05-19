import { PlaceEntity } from "src/domain/models/PlaceEntity";

export interface PlaceApi {
    fetchPlaceRecommendations(): Promise<PlaceRecommendationResponse>;
}

export type PlaceRecommendationResponse = {
    places: PlaceEntity[];
};
