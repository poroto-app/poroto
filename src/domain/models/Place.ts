import { GeoLocation } from "src/domain/models/GeoLocation";
import { Image } from "src/domain/models/Image";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { PriceRange } from "./PriceRange";

export type Place = {
    id: string;
    googlePlaceId: string | null;
    name: string;
    images: Image[];
    address: string | null;
    location: GeoLocation;
    estimatedStayDuration: number;
    categories: PlaceCategory[];
    priceRange?: PriceRange | null;
    likeCount: number;
};
