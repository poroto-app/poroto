import { GeoLocation } from "src/domain/models/GeoLocation";

export type Place = {
    name: string;
    imageUrls: string[];
    tags: string[];
    location: GeoLocation;
    estimatedStayDuration: number;
};
