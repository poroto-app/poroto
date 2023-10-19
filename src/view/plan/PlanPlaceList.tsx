import { VStack } from "@chakra-ui/react";
import { Plan } from "src/domain/models/Plan";
import { PlacePreview } from "src/view/plan/PlacePreview";

type Props = {
    plan: Plan;
    createdBasedOnCurrentLocation?: boolean;
};

export function PlanPlaceList({ plan, createdBasedOnCurrentLocation }: Props) {
    return (
        <VStack spacing="16px" w="100%">
            {createdBasedOnCurrentLocation && (
                <PlacePreview name="現在地" images={[]} categories={[]} />
            )}
            {plan.places.map((place, i) => (
                <PlacePreview
                    key={i}
                    name={place.name}
                    images={place.images}
                    googlePlaceReviews={place.googlePlaceReviews}
                    categories={place.categories}
                />
            ))}
        </VStack>
    );
}
