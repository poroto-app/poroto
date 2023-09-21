import { Divider, VStack } from "@chakra-ui/react";
import { Plan } from "src/domain/models/Plan";
import { PlacePreview } from "src/view/plan/PlacePreview";

type Props = {
    plan: Plan;
    createdBasedOnCurrentLocation?: boolean;
};

export function PlanPlaceList({ plan, createdBasedOnCurrentLocation }: Props) {
    return (
        <VStack spacing={4} w="100%" divider={<Divider />}>
            {createdBasedOnCurrentLocation && (
                <PlacePreview name="現在地" imageUrls={[]} />
            )}
            {plan.places.map((place, i) => (
                <PlacePreview
                    key={i}
                    name={place.name}
                    imageUrls={place.imageUrls}
                    googlePlaceReviews={place.googlePlaceReviews}
                />
            ))}
        </VStack>
    );
}
