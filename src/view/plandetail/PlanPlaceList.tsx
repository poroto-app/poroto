import { VStack } from "@chakra-ui/react";
import { Plan } from "src/domain/models/Plan";
import { PlacePreview } from "src/view/plandetail/PlacePreview";

type Props = {
    plan: Plan;
    createdBasedOnCurrentLocation?: boolean;
    onClickShowRelatedPlaces?: (placeId: string) => void;
};

export function PlanPlaceList({
    plan,
    createdBasedOnCurrentLocation,
    onClickShowRelatedPlaces,
}: Props) {
    return (
        <VStack spacing="16px" w="100%">
            {createdBasedOnCurrentLocation && (
                <PlacePreview
                    name="現在地"
                    images={[]}
                    categories={[]}
                    googlePlaceReviews={[]}
                    priceRange={null}
                    estimatedStayDuration={0}
                />
            )}
            {plan.places.map((place, i) => (
                <PlacePreview
                    key={i}
                    name={place.name}
                    images={place.images}
                    googlePlaceReviews={place.googlePlaceReviews}
                    categories={place.categories}
                    priceRange={place.priceRange}
                    estimatedStayDuration={place.estimatedStayDuration}
                    onClickShowRelatedPlaces={
                        onClickShowRelatedPlaces
                            ? () => onClickShowRelatedPlaces(place.id)
                            : undefined
                    }
                />
            ))}
        </VStack>
    );
}
