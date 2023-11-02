import { GeoLocation } from "src/domain/models/GeoLocation";
import { GooglePlaceReview } from "src/domain/models/GooglePlaceReview";
import { Image } from "src/domain/models/Image";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { PriceRange } from "src/domain/models/PriceRange";

export type Place = {
    id: string;
    googlePlaceId: string | null;
    name: string;
    images: Image[];
    location: GeoLocation;
    estimatedStayDuration: number;
    googlePlaceReviews?: GooglePlaceReview[];
    categories: PlaceCategory[];
    priceRange: PriceRange | null;
};
