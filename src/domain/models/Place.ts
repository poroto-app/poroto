import { GeoLocation } from "src/domain/models/GeoLocation";

export type Place = {
    id: string;
    name: string;
    imageUrls: string[];
    location: GeoLocation;
    estimatedStayDuration: number;
};
