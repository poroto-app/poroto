import { GooglePlaceReviewEntity } from "src/domain/models/GooglePlaceReviewEntity";

export type PlaceEntity = {
    id: string;
    googlePlaceId: string | null;
    name: string;
    images: {
        default: string;
        small: string | null;
        large: string | null;
    }[];
    location: {
        latitude: number;
        longitude: number;
    };
    estimatedStayDuration: number;
    googlePlaceReviews: GooglePlaceReviewEntity[] | null;
    categories: {
        id: string;
        displayName: string;
    }[];
    priceRange?: {
        priceRangeMin: number;
        priceRangeMax: number;
        googlePriceLevel: number;
    };
    like: boolean;
};
