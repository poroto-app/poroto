import { Divider, VStack } from "@chakra-ui/react";
import { PlacePreview } from "src/view/plan/PlacePreview";
import { Plan } from "src/domain/models/Plan";

type Props = {
    plan: Plan;
    createdBasedOnCurrentLocation?: boolean;
};

export function PlanPlaceList({ plan, createdBasedOnCurrentLocation }: Props) {
    return (
        <VStack spacing={4} w="100%" divider={<Divider />} py="16px">
            {createdBasedOnCurrentLocation && (
                <PlacePreview name="現在地" imageUrls={[]} tags={[]} />
            )}
            {plan.places.map((place, i) => (
                <PlacePreview
                    key={i}
                    name={place.name}
                    imageUrls={place.imageUrls}
                    tags={place.tags}
                />
            ))}
        </VStack>
    );
}
