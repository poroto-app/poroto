import { Center, Icon, VStack } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { Plan } from "src/domain/models/Plan";
import { PlacePreview } from "src/view/plandetail/PlacePreview";

type Props = {
    plan: Plan;
    createdBasedOnCurrentLocation?: boolean;
    onClickAddPlace?: (props: { previousPlaceId: string }) => void;
    onClickShowRelatedPlaces?: (placeId: string) => void;
    onClickDeletePlace?: (placeId: string) => void;
};

export function PlanPlaceList({
    plan,
    createdBasedOnCurrentLocation,
    onClickAddPlace,
    onClickShowRelatedPlaces,
    onClickDeletePlace,
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
                />
            )}
            {plan.places.map((place, i) => (
                <VStack key={i} spacing="16px" w="100%">
                    <PlacePreview
                        name={place.name}
                        images={place.images}
                        googlePlaceReviews={place.googlePlaceReviews}
                        categories={place.categories}
                        priceRange={place.priceRange}
                        onClickShowRelatedPlaces={
                            onClickShowRelatedPlaces
                                ? () => onClickShowRelatedPlaces(place.id)
                                : undefined
                        }
                        onClickDeletePlace={
                            onClickDeletePlace
                                ? () => onClickDeletePlace(place.id)
                                : undefined
                        }
                    />
                    {onClickAddPlace && (
                        <Center
                            as="button"
                            color="#BD9F8E"
                            border="1.5px solid #BD9F8E"
                            borderRadius="20px"
                            w="100%"
                            py="4px"
                            onClick={() =>
                                onClickAddPlace({ previousPlaceId: place.id })
                            }
                        >
                            <Icon as={MdAdd} />
                        </Center>
                    )}
                </VStack>
            ))}
        </VStack>
    );
}
