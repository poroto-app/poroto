import { Place } from "src/domain/models/Place";
import { PlaceCategory } from "src/domain/models/PlaceCategory";

export type PlacesWithCategory = {
    category: PlaceCategory;
    places: Place[];
};
