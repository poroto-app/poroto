import { Place } from "src/domain/models/Place";
import { PlaceEntity } from "src/domain/models/PlaceEntity";
import { hasValue } from "src/domain/util/null";

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
        address: hasValue(entity.address) ? entity.address : null,
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
        likeCount: entity.likeCount,
    };
}
