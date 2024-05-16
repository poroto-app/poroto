import { Place } from "src/domain/models/Place";
import { PlaceEntity } from "src/domain/models/PlaceEntity";

export function createPlaceFromPlaceEntity(entity: PlaceEntity): Place {
    return {
        id: entity.id,
        googlePlaceId: entity.googlePlaceId,
        name: entity.name,
        images: entity.images.map((image) => ({
            default: image.default,
            small: image.small ?? image.default,
            large: image.large ?? image.default,
            isGoogleImage: image.isGooglePhotos,
        })),
        location: entity.location,
        estimatedStayDuration: entity.estimatedStayDuration,
        categories: entity.categories.map((category) => ({
            id: category.id,
            displayName: category.displayName,
        })),
        priceRange: {
            min: entity.priceRange.priceRangeMin,
            max: entity.priceRange.priceRangeMax,
            googlePriceLevel: entity.priceRange.googlePriceLevel,
        },
        likeCount: entity.likeCount,
    };
}
