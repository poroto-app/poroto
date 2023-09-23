import { GeoLocation } from "src/domain/models/GeoLocation";
import { GooglePlaceReview } from "src/domain/models/GooglePlaceReview";
import { Image } from "src/domain/models/Image";

export type Place = {
    id: string;
    googlePlaceId: string | null;
    name: string;
    imageUrls: string[];
    images: Image[];
    location: GeoLocation;
    estimatedStayDuration: number;
    googlePlaceReviews?: GooglePlaceReview[];
};
