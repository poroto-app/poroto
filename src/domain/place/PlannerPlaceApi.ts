import { PlaceEntity } from "src/domain/models/PlaceEntity";

export interface PlannerPlaceApi {
    fetchLikePlaces(
        request: FetchLikePlacesRequest
    ): Promise<FetchLikePlacesResponse>;
}

export interface FetchLikePlacesRequest {
    userId: string;
    firebaseIdToken: string;
}

export interface FetchLikePlacesResponse {
    places: PlaceEntity[];
}
