import { Place } from "src/domain/models/Place";
import { PlaceEntity } from "src/domain/models/PlaceEntity";

export function createPlaceFromPlaceEntity(entity: PlaceEntity): Place {
    return {
        id: entity.id,
        googlePlaceId: entity.googlePlaceId,
        name: entity.name,
        images: entity.images,
        location: entity.location,
        estimatedStayDuration: entity.estimatedStayDuration,
        googlePlaceReviews:
            entity.googlePlaceReviews?.map((review) => ({
                rating: review.rating,
                text: review.text,
                authorName: review.authorName,
                authorUrl: review.authorUrl,
                authorPhotoUrl: review.authorPhotoUrl,
                timeInMilliSec: review.time,
            })) ?? null,
        categories: entity.categories.map((category) => ({
            id: category.id,
            displayName: category.displayName,
        })),
        priceRange: {
            min: entity.priceRange.priceRangeMin,
            max: entity.priceRange.priceRangeMax,
            googlePriceLevel: entity.priceRange.googlePriceLevel,
        },
    };
}
