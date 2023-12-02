import { Place } from "src/domain/models/Place";
import { PlaceEntity } from "src/domain/models/PlaceEntity";

export function createPlaceFromPlaceEntity(entity: PlaceEntity): Place {
    return {
        id: entity.id,
        googlePlaceId: entity.googlePlaceId,
        name: entity.name,
        images: entity.images.map((image) => ({
            // TODO: Google Mapから取得した画像か、porotoの画像かを判定する
            isGoogleImage: true,
            default: image.default,
            small: image.small ?? image.default,
            large: image.large ?? image.default,
        })),
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
