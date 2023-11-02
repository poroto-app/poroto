import { LocationCategory } from "src/domain/models/LocationCategory";
import { Place } from "src/domain/models/Place";

export type LocationCategoryWithPlace = {
    places: Place[];
} & LocationCategory;