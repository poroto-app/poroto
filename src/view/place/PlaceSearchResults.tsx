import { Padding } from "src/constant/padding";
import { PlaceSearchResult } from "src/domain/models/PlaceSearchResult";
import { Text, YStack } from "tamagui";

type Props = {
    places: PlaceSearchResult[];
    onClickPlace: (place: PlaceSearchResult) => void;
};

export function PlaceSearchResults({ places, onClickPlace }: Props) {
    return (
        <YStack w="100%">
            {places.map((place, i) => (
                <YStack
                    key={i}
                    w="100%"
                    py={Padding.p16}
                    px={Padding.p16}
                    borderBottomWidth={1}
                    borderColor="rgba(0, 0, 0, 0.15)"
                    onPress={() => onClickPlace(place)}
                >
                    <Text>{place.name}</Text>
                    <Text fontSize={13} opacity={0.7}>
                        {place.address}
                    </Text>
                </YStack>
            ))}
        </YStack>
    );
}
