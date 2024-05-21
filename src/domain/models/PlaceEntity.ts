export type PlaceEntity = {
    id: string;
    googlePlaceId: string | null;
    name: string;
    images: {
        default: string;
        small: string | null;
        large: string | null;
        isGooglePhotos: boolean;
    }[];
    address: string | null;
    location: {
        latitude: number;
        longitude: number;
    };
    estimatedStayDuration: number;
    categories: {
        id: string;
        displayName: string;
    }[];
    priceRange?: {
        priceRangeMin: number;
        priceRangeMax: number;
        googlePriceLevel: number;
    };
    likeCount: number;
};
