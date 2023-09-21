import { GeoLocation } from "src/domain/models/GeoLocation";
import { GooglePlaceReview } from "src/domain/models/GooglePlaceReview";

export type Place = {
    id: string;
    name: string;
    imageUrls: string[];
    location: GeoLocation;
    estimatedStayDuration: number;
    googlePlaceReviews?: GooglePlaceReview[];
};
