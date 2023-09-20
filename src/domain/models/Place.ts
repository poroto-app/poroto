import { GeoLocation } from "src/domain/models/GeoLocation";

export type Place = {
    id: string;
    googlePlaceId: string | null;
    name: string;
    imageUrls: string[];
    tags: string[];
    location: GeoLocation;
    estimatedStayDuration: number;
};
